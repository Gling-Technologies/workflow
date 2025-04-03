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

export class DropboxComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  
  private dialog = inject(MatDialog)
  private workflowService = inject(WorkflowService)

  droppedItems: any = []
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
        id: `node-${this.droppedItems.length + 1}`,
        name: this.getFormattedOperator(newItem),
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

  constructor() {
    this.initOrganizationChart();
  }

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
        height: '100%',
        inverted: true,
        backgroundColor: ""
      },
      title: {
        text: ""
      },
      series: [{
        type: 'organization',
        name: 'Workflow Chart',
        keys: ['from', 'to'],
        cursor: "pointer",
        link: {
          lineWidth: 3,
        },
        data: this.droppedItems
          .filter((node: any) => node.parentId) // Only add connections
          .map((node: any) => [node.parentId, node.id]), // Create links
        nodes: this.droppedItems.map((node: any) => ({ 
          id: node.id,
          name: node.name,
          events: {
            click: () => {
              const currentTime = new Date().getTime();
              if (currentTime - this.lastClickTime < this.doubleClickThreshold) {
                this.openModal(node);
              }
              this.lastClickTime = currentTime;
            }          }
        })),

        colorByPoint: true,
        borderColor: '#000000',
      }],
    };
  }
  

}
