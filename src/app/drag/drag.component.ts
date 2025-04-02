declare const require: any;

import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, copyArrayItem, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from "highcharts";
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsOrganization from "highcharts/modules/organization";

// declare var require: any;
// let sankey = require("highcharts/modules/sankey");
// let organization = require("highcharts/modules/organization");

HighchartsSankey(Highcharts);
HighchartsOrganization(Highcharts);

interface DroppedItem {
  id: string;
  name: string;
}

@Component({
  selector: 'app-drag',
  imports: [DragDropModule, HighchartsChartModule],
  templateUrl: './drag.component.html',
  styleUrl: './drag.component.css'
})

export class DragComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Gantt Chart with Progress Indicators',
    },
    xAxis: {
      min: Date.UTC(2022, 0, 1),
      max: Date.UTC(2022, 11, 31),
    },
    
    series: [
      {
        type: 'gantt',
        name: 'Project 1',
        data: [
          {
            name: 'Start prototype',
            start: Date.UTC(2022, 0, 1),
            end: Date.UTC(2022, 0, 5),
            completed: 0.25,
          },
          {
            name: 'Test prototype',
            start: Date.UTC(2022, 0, 6),
            end: Date.UTC(2022, 0, 9),
          },
          {
            name: 'Develop',
            start: Date.UTC(2022, 0, 10),
            end: Date.UTC(2022, 0, 15),
            completed: {
              amount: 0.12,
              fill: '#fa0',
            },
          },
          {
            name: 'Run acceptance tests',
            start: Date.UTC(2022, 0, 16),
            end: Date.UTC(2022, 0, 19),
          },
        ],
      },
    ],
  };
  
  sourceItems = ['Item A', 'Item B', 'Item C', 'Item D']; // Items to drag
  droppedItems: DroppedItem[] = [];
  links: [string, string][] = [];

  constructor() {
    // this.initChart();
  // initChart() {
    // this.chartOptions = {
    //   chart: {
    //     type: 'networkgraph',
    //     backgroundColor: '#ffffff', // White background

    //   },
    //   title: {
    //     text: 'Dynamic Node Connection'
    //   },
    //   plotOptions: {
    //     networkgraph: {
    //       keys: ['from', 'to'],
    //       layoutAlgorithm: {
    //         enableSimulation: true
    //       },
    //       link: {
    //         width: 2, // Adjust the thickness of the link
    //         color: '#ff0000',
    //       }
    //     }
    //   },
    //   series: [
    //     {
    //       type: 'networkgraph',
    //       dataLabels: {
    //         enabled: true,
    //         linkFormat: ''
    //       },
    //       nodes: [],
    //       data: []
    //     }
    //   ]
    // };

    // this.chartOptions = {
    //   title: {
    //     text: 'Gantt Chart with Progress Indicators',
    //   },
    //   xAxis: {
    //     min: Date.UTC(2014, 10, 17),
    //     max: Date.UTC(2014, 10, 30),
    //   },
    //   series: [
    //     {
    //       type: 'gantt',
    //       name: 'Project 1',
    //       data: [
    //         {
    //           name: 'Start prototype',
    //           start: Date.UTC(2014, 10, 18),
    //           end: Date.UTC(2014, 10, 25),
    //           completed: 0.25,
    //         },
    //         {
    //           name: 'Test prototype',
    //           start: Date.UTC(2014, 10, 27),
    //           end: Date.UTC(2014, 10, 29),
    //         },
    //         {
    //           name: 'Develop',
    //           start: Date.UTC(2014, 10, 20),
    //           end: Date.UTC(2014, 10, 25),
    //           completed: {
    //             amount: 0.12,
    //             fill: '#fa0',
    //           },
    //         },
    //         {
    //           name: 'Run acceptance tests',
    //           start: Date.UTC(2014, 10, 23),
    //           end: Date.UTC(2014, 10, 26),
    //         },
    //       ],
    //     },
    //   ],
    // };
  }

  /** Handle Drop Event */
  // onDrop(event: any) {
  //   if (event.previousContainer !== event.container) {
  //     // Move item to dropped list
  //     const droppedItemName = event.previousContainer.data[event.previousIndex];
  //     const newItem: DroppedItem = { id: `node${this.droppedItems.length + 1}`, name: droppedItemName };

  //     this.droppedItems.push(newItem);
  //     copyArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );

  //     // If it's not the first item, connect it to the previous one
  //     if (this.droppedItems.length > 1) {
  //       const prevItem = this.droppedItems[this.droppedItems.length - 2];
  //       this.links.push([prevItem.id, newItem.id]);
  //     }

  //     // this.updateChart();
  //   }
  // }

  onDrop(event: any){}

  /** Update Highcharts Graph */
  // updateChart() {
  //   this.chartOptions = {
  //     ...this.chartOptions,
  //     series: [
  //       {
  //         type: 'networkgraph',
  //         dataLabels: {
  //           enabled: true,
  //           linkFormat: ''
  //         },
  //         nodes: this.droppedItems.map(item => ({
  //           id: item.id,
  //           name: item.name
  //         })),
  //         data: this.links
  //       }
  //     ]
  //   };
  // }
}
