import { Component, inject, Input, OnInit } from '@angular/core';
import { DragDropModule, CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { WorkflowService } from '../workflow.service';
import { MymodalComponent } from '../mymodal/mymodal.component';

import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from "highcharts";
import "highcharts/modules/sankey";
import "highcharts/modules/organization";
import "highcharts/modules/networkgraph";
import "highcharts/modules/treemap";
import "highcharts/modules/treegraph";

@Component({
  selector: 'app-dropbox',
  imports: [DragDropModule, HighchartsChartModule],
  templateUrl: './dropbox.component.html',
  styleUrl: './dropbox.component.css'
})

export class DropboxComponent{
  Highcharts: typeof Highcharts = Highcharts;
  chart: Highcharts.Chart | undefined;
  chartOptions: Highcharts.Options = {};
  
  private dialog = inject(MatDialog)
  private workflowService = inject(WorkflowService)

  droppedItems: any = [
    {
      id: 'node-0',
      name: 'Entry point',
      parentId: null, 
    }
  ];

  ngOnInit() {
    this.initOrganizationChart();
  }

  comp: string = '';

  lastClickTime = 0;
  doubleClickThreshold = 300; 

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } 
    else {
      const newItem = event.previousContainer.data[event.previousIndex];
      const parentId = this.droppedItems.length > 0 ? this.droppedItems[this.droppedItems.length - 1].id : null;
      const newNode = { 
        id: `node-${this.droppedItems.length}`,
        name: newItem,
        parentId: parentId, 
      };
  
      this.droppedItems.push(newNode);
      this.initOrganizationChart();
    }
  }

  removeItem(index: number){
    this.droppedItems.splice(index, 1);
  }

  getFormattedOperator(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }

  openModal(dropItem: any): any{
    this.comp = 'operator'
    this.dialog.open(MymodalComponent, {
      width: "800px", 
      maxWidth: '90vw',  
      data: { dropItem },
    });
  }

//  constructor() {
//     this.initOrganizationChart();
//   } 

  // initChart() {
    // Initialize the chart with the desired type
    // this.initOrganizationChart();
    // this.initNetworkGraph();
    // this.initTreeGraph();
  // }

  
  initOrganizationChart() {
    this.chartOptions = {
      chart: {
        type: 'organization',
        inverted: true,
        backgroundColor: "",
        width: 700,
        height: this.updateChartHeight(),
        marginRight: 500,
      },
      title: {
        text: ""
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        organization: {
          borderRadius: 15,
        },
        series: {
            states: {
                inactive: {
                    opacity: 1
                }
            }
        }
    },
      series: [{
        type: 'organization',       
        name: 'Workflow Chart',
        keys: ['from', 'to'],
        cursor: "pointer",
        // linkLength: 100,
        nodePadding: 20,
        link: {
          lineWidth: 5,
        },
        data: this.droppedItems
          .filter((node: any) => node.parentId && node.id !== 'node-0') // Only add connections
          .map((node: any) => [node.parentId, node.id]), // Create links
        nodes: this.droppedItems
          .map((node: any) => ({ 
            id: node.id,
            name: this.getFormattedOperator(node.name),
            color:  '#885d99',
            width: 200,
            events: {
              click: () => {
                if (node.name === 'Entry point') {
                  return;
                }
                const currentTime = new Date().getTime();
                if (currentTime - this.lastClickTime < this.doubleClickThreshold) {
                  console.log(node); 
                  this.openModal(node.name);
                }
                this.lastClickTime = currentTime;
              },
              
            },
            dataLabels: {
              useHTML: true,
              style: {
                width: '100px',
                height: "20px",
              }
            },
        })),

        colorByPoint: true,
        borderColor: '#000000',
      }],
    };

  }
  
  updateChartHeight() {
    const containerWidth = 700;
    const baseHeight = containerWidth * 0.25; // 25% of container width
    if (this.droppedItems.length===2) {
      return baseHeight;
    } 
    const additionalHeight = containerWidth * 0.10; 
    const newHeight = baseHeight + (this.droppedItems.length - 1) * additionalHeight;
    return newHeight;
   
  }
}
