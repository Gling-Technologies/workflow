declare const require: any;

import { Component } from '@angular/core';
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
  // chartOptions: Highcharts.Options = {};
  chartOptions: any = {
    chart: {
      height: 600,
      inverted: true
    },

    title: {
      text: "Highcharts Org Chart"
    },

    series: [
      {
        type: "organization",
        name: "Highsoft",
        keys: ["from", "to"],
        data: [
          ["Shareholders", "Board"],
          ["Board", "CEO"],
          ["CEO", "CTO"],
          ["CEO", "CPO"],
          ["CEO", "CSO"],
          ["CEO", "CMO"],
          ["CEO", "HR"],
          ["CTO", "Product"],
          ["CTO", "Web"],
          ["CSO", "Sales"],
          ["CMO", "Market"]
        ],
        levels: [
          {
            level: 0,
            color: "silver",
            dataLabels: {
              color: "black"
            },
            height: 25
          },
          {
            level: 1,
            color: "silver",
            dataLabels: {
              color: "black"
            },
            height: 25
          },
          {
            level: 2,
            color: "#980104"
          },
          {
            level: 4,
            color: "#359154"
          }
        ],
        nodes: [
          {
            id: "Shareholders"
          },
          {
            id: "Board"
          },
          {
            id: "CEO",
            title: "CEO",
            name: "Grethe Hjetland",
            image:
              "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132317/Grethe.jpg"
          },
          {
            id: "HR",
            title: "HR/CFO",
            name: "Anne Jorunn Fjærestad",
            color: "#007ad0",
            image:
              "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132314/AnneJorunn.jpg",
            column: 3,
            offset: "75%"
          },
          {
            id: "CTO",
            title: "CTO",
            name: "Christer Vasseng",
            column: 4,
            image:
              "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12140620/Christer.jpg",
            layout: "hanging"
          },
          {
            id: "CPO",
            title: "CPO",
            name: "Torstein Hønsi",
            column: 4,
            image:
              "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12131849/Torstein1.jpg"
          },
          {
            id: "CSO",
            title: "CSO",
            name: "Anita Nesse",
            column: 4,
            image:
              "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/12132313/Anita.jpg",
            layout: "hanging"
          },
          {
            id: "CMO",
            title: "CMO",
            name: "Vidar Brekke",
            column: 4,
            image:
              "https://wp-assets.highcharts.com/www-highcharts-com/blog/wp-content/uploads/2018/11/13105551/Vidar.jpg",
            layout: "hanging"
          },
          {
            id: "Product",
            name: "Product developers"
          },
          {
            id: "Web",
            name: "Web devs, sys admin"
          },
          {
            id: "Sales",
            name: "Sales team"
          },
          {
            id: "Market",
            name: "Marketing team"
          }
        ],
        colorByPoint: false,
        color: "#007ad0",
        dataLabels: {
          color: "white"
        },
        borderColor: "white",
        nodeWidth: 65
      }
    ],
    tooltip: {
      outside: true
    },
    exporting: {
      allowHTML: true,
      sourceWidth: 800,
      sourceHeight: 600
    }
  }

  
  sourceItems = ['Item A', 'Item B', 'Item C', 'Item D']; // Items to drag
  droppedItems: DroppedItem[] = [];
  links: [string, string][] = [];

  constructor() {
    // this.initChart();
  }

  /** Initialize Highcharts */
  initChart() {
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
  onDrop(event: any) {
    if (event.previousContainer !== event.container) {
      // Move item to dropped list
      const droppedItemName = event.previousContainer.data[event.previousIndex];
      const newItem: DroppedItem = { id: `node${this.droppedItems.length + 1}`, name: droppedItemName };

      this.droppedItems.push(newItem);
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // If it's not the first item, connect it to the previous one
      if (this.droppedItems.length > 1) {
        const prevItem = this.droppedItems[this.droppedItems.length - 2];
        this.links.push([prevItem.id, newItem.id]);
      }

      // this.updateChart();

         
          
    }
  }

  /** Update Highcharts Graph */
  updateChart() {
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          type: 'networkgraph',
          dataLabels: {
            enabled: true,
            linkFormat: ''
          },
          nodes: this.droppedItems.map(item => ({
            id: item.id,
            name: item.name
          })),
          data: this.links
        }
      ]
    };
  }
}
