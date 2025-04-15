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
      parentId: null
    },
    // {
    //   id: 'node-1',
    //   name: 'Entry point',
    //   parentId: 'node-0'
    // },
    // {
    //   id: 'node-2',
    //   name: 'Entry point',
    //   parentId: 'node-0'
    // },
    // {
    //   id: 'node-3',
    //   name: 'Entry point',
    //   parentId:  ['node-1', 'node-2'],
    // },

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

      const newNodeId = `node-${this.droppedItems.length}`;
      const newNode = { 
        id: `node-${this.droppedItems.length}`,
        name: newItem,
        parentId: parentId, 
      };
 
      const len = this.droppedItems.length;
      if (len >= 2) {
            const prevNode1 = this.droppedItems[len - 1];
            const prevNode2 = this.droppedItems[len - 2];
      
            if (prevNode1.parentId && prevNode2.parentId) {
              if (prevNode1.parentId === prevNode2.parentId) {
                newNode.parentId = [prevNode1.id, prevNode2.id];
              } else {
                newNode.parentId = prevNode1.id;
              }
            } else {
              newNode.parentId = prevNode1.id;
            }
      }else if (len === 1) {
        newNode.parentId = this.droppedItems[0].id;
      }
      this.droppedItems.push(newNode);

      if (newItem === 'condition') {
        // this.droppedItems.push(newNode);

        const child1Id = `node-${this.droppedItems.length}`;
        const child2Id = `node-${this.droppedItems.length + 1}`;
  
        const child1 = {
          id: child1Id,
          name: 'True',
          parentId: newNodeId,
          type: 'conditionChild',
        };
  
        const child2 = {
          id: child2Id,
          name: 'False',
          parentId: newNodeId,
          type: 'conditionChild',
        };
        this.droppedItems.push(child1, child2);
      }

      console.log(this.droppedItems);
      this.initOrganizationChart();

    }
  }

  removeItem(index: number){
    this.droppedItems.splice(index, 1);
  }

  getFormattedOperator(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }

  openModal(dropItem: any, nodeId: string): any{
    const item = this.droppedItems.find((item: any) => item.id === nodeId);
    const nodeName = item.name;
    if (!item) return;

    this.comp = 'operator'
    const dialogRef = this.dialog.open(MymodalComponent, {
      width: "800px", 
      maxWidth: '90vw',  
      data: { dropItem },
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (!data) return;
      console.log(data);
      if (data.conditionName) {
        // console.log('Selected Connection Name:', conditionName);
        this.updateItemName(nodeId, data.conditionName);
        if (nodeName === 'condition') {
          this.updateSubNodeName(nodeId, data)
        }
      }
    })
  }

  updateItemName(id: string, newName: string): void {
    const item = this.droppedItems.find((item: any) => item.id === id);
    if (item) {
      item.name = newName;
      this.initOrganizationChart();    
    }
  }

  updateSubNodeName(nodeId: string, data: any){
    const trueNodeId = nodeId.replace(/\d+$/, match => `${+match + 1}`);
    const falseNodeId = nodeId.replace(/\d+$/, match => `${+match + 2}`);
    // console.log(trueNodeId, falseNodeId);
    this.updateItemName(trueNodeId, data.run)
    this.updateItemName(falseNodeId, data.fallback? data.fallback : 'no fallback')
  }
  
  initOrganizationChart() {
    this.chartOptions = {
      chart: {
        type: 'organization',
        inverted: true,
        backgroundColor: "",
        width: 800,
        height: this.updateChartHeight(),
        // marginRight: 500,
      },
      title: {
        text: ""
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        organization: {
          borderRadius: 5,
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
          lineWidth: 3,
          color: '#000',
          
        },
        data: this.droppedItems
        .filter((node: any) => node.parentId && node.id !== 'node-0')
        .flatMap((node: any) =>
          Array.isArray(node.parentId)
            ? node.parentId.map((pid: string) => [pid, node.id])
            : [[node.parentId, node.id]]
        ),

        nodes: this.droppedItems
          .map((node: any) => ({ 
            id: node.id,
            name: this.getFormattedOperator(node.name),
            color:  '#885d99',
            width: 200,
            events: {
              click: () => {
                if (node.name === 'Entry point' || node.type === 'conditionChild') {
                  return;
                }
                const currentTime = new Date().getTime();
                if (currentTime - this.lastClickTime < this.doubleClickThreshold) {
                  console.log(node); 
                  this.openModal(node.name, node.id);
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
    const baseHeight = 200; 
    const additionalHeight = 70; 
    const newHeight = baseHeight + (this.droppedItems.length - 2) * additionalHeight;
    return newHeight;
   
  }
}
