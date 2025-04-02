
import { Component } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from "highcharts";
import "highcharts/modules/sankey";
import "highcharts/modules/organization";
import "highcharts/modules/networkgraph";
import "highcharts/modules/treemap";
import "highcharts/modules/treegraph";

@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.css'
})

export class DiagramComponent {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};


  constructor() {
    this.initChart();
  }

  initChart() {
    // Initialize the chart with the desired type
    this.initOrganizationChart();
    // this.initNetworkGraph();
    // this.initTreeGraph();
  }

  initOrganizationChart() {
    this.chartOptions = {
      chart: {
        height: 1000,
        inverted: true,
        // margin: [150, 0, 150, 0],
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
            /* @ts-ignore */
            ["Shareholders", "Board"],  // @ts-ignore
            ["Board", "CEO"],   // @ts-ignore
            ["CEO", "CTO"],   // @ts-ignore
            ["CEO", "CPO"],   // @ts-ignore
            ["CEO", "CSO"],   // @ts-ignore
            ["CEO", "CMO"],   // @ts-ignore
            ["CEO", "HR"],   // @ts-ignore
            ["CTO", "Product"],   // @ts-ignore
            ["CTO", "Web"],   // @ts-ignore
            ["CSO", "Sales"],   // @ts-ignore
            ["CMO", "Market"]   // @ts-ignore
          ],
          levels: [
            {
              level: 0,
              color: "silver",
              dataLabels: {
                color: "black"
              },
              // height: 25
            },
            {
              level: 1,
              color: "silver",
              dataLabels: {
                color: "black"
              },
              // height: 25
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
              // offset: "75%"
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
      // exporting: {
      //   allowHTML: true,
      //   sourceWidth: 800,
      //   sourceHeight: 600
      // }
    };
  }

  initNetworkGraph(){
    this.chartOptions = {
      chart: {
        type: 'networkgraph',
        backgroundColor: '#ffffff', // White background

      },
      title: {
        text: 'Dynamic Node Connection'
      },
      plotOptions: {
        networkgraph: {
          keys: ['from', 'to'],
          layoutAlgorithm: {
            enableSimulation: true
          },
          link: {
            width: 2, // Adjust the thickness of the link
            color: '#ff0000',
          }
        }
      },
      series: [
        {
          type: 'networkgraph',
          dataLabels: {
            enabled: true,
            linkFormat: ''
          },
          nodes: [],
          data: [
            ['Proto Indo-European', 'Balto-Slavic'],
            ['Proto Indo-European', 'Germanic'],
            ['Proto Indo-European', 'Celtic'],
            ['Proto Indo-European', 'Italic'],
            ['Proto Indo-European', 'Hellenic'],
            ['Proto Indo-European', 'Anatolian'],
            ['Proto Indo-European', 'Indo-Iranian'],
            ['Proto Indo-European', 'Tocharian'],
            ['Indo-Iranian', 'Dardic'],
            ['Indo-Iranian', 'Indic'],
            ['Indo-Iranian', 'Iranian'],
            ['Iranian', 'Old Persian'],
            ['Old Persian', 'Middle Persian'],
            ['Indic', 'Sanskrit'],
            ['Italic', 'Osco-Umbrian'],
            ['Italic', 'Latino-Faliscan'],
            ['Latino-Faliscan', 'Latin'],
            ['Celtic', 'Brythonic'],
            ['Celtic', 'Goidelic'],
            ['Germanic', 'North Germanic'],
            ['Germanic', 'West Germanic'],
            ['Germanic', 'East Germanic'],
            ['North Germanic', 'Old Norse'],
            ['North Germanic', 'Old Swedish'],
            ['North Germanic', 'Old Danish'],
            ['West Germanic', 'Old English'],
            ['West Germanic', 'Old Frisian'],
            ['West Germanic', 'Old Dutch'],
            ['West Germanic', 'Old Low German'],
            ['West Germanic', 'Old High German'],
            ['Old Norse', 'Old Icelandic'],
            ['Old Norse', 'Old Norwegian'],
            ['Old Norwegian', 'Middle Norwegian'],
            ['Old Swedish', 'Middle Swedish'],
            ['Old Danish', 'Middle Danish'],
            ['Old English', 'Middle English'],
            ['Old Dutch', 'Middle Dutch'],
            ['Old Low German', 'Middle Low German'],
            ['Old High German', 'Middle High German'],
            ['Balto-Slavic', 'Baltic'],
            ['Balto-Slavic', 'Slavic'],
            ['Slavic', 'East Slavic'],
            ['Slavic', 'West Slavic'],
            ['Slavic', 'South Slavic'],
          ]
        }
      ]
    };
  }

  initTreeGraph() {
    this.chartOptions = {
      chart: {
        inverted: true,
      },
      title: {
          text: 'Treegraph with box layout'
      },
      series: [
          {
              type: 'treegraph',
              data: [
                {
                    id: '0.0',
                    parent: '',
                    name: 'The World'
                },
                {
                    id: '1.3',
                    parent: '0.0',
                    name: 'Asia'
                },
                {
                    id: '1.1',
                    parent: '0.0',
                    name: 'Africa'
                },
                {
                    id: '1.2',
                    parent: '0.0',
                    name: 'America'
                },
                {
                    id: '1.4',
                    parent: '0.0',
                    name: 'Europe'
                },
                {
                    id: '1.5',
                    parent: '0.0',
                    name: 'Oceanic'
                },
            
                /* Africa */
                {
                    id: '2.1',
                    parent: '1.1',
                    name: 'Eastern Africa'
                },
            
                {
                    id: '2.5',
                    parent: '1.1',
                    name: 'Western Africa'
                },
            
                {
                    id: '2.3',
                    parent: '1.1',
                    name: 'North Africa'
                },
            
                {
                    id: '2.2',
                    parent: '1.1',
                    name: 'Central Africa'
                },
            
                {
                    id: '2.4',
                    parent: '1.1',
                    name: 'South America'
                },
            
                /* America */
                {
                    id: '2.9',
                    parent: '1.2',
                    name: 'South America'
                },
            
                {
                    id: '2.8',
                    parent: '1.2',
                    name: 'Northern America'
                },
            
                {
                    id: '2.7',
                    parent: '1.2',
                    name: 'Central America'
                },
            
                {
                    id: '2.6',
                    parent: '1.2',
                    name: 'Caribbean'
                },
            
                /* Asia */
                {
                    id: '2.13',
                    parent: '1.3',
                    name: 'Southern Asia'
                },
            
                {
                    id: '2.11',
                    parent: '1.3',
                    name: 'Eastern Asia'
                },
            
                {
                    id: '2.12',
                    parent: '1.3',
                    name: 'South-Eastern Asia'
                },
            
                {
                    id: '2.14',
                    parent: '1.3',
                    name: 'Western Asia'
                },
            
                {
                    id: '2.10',
                    parent: '1.3',
                    name: 'Central Asia'
                },
            
                /* Europe */
                {
                    id: '2.15',
                    parent: '1.4',
                    name: 'Eastern Europe'
                },
            
                {
                    id: '2.16',
                    parent: '1.4',
                    name: 'Northern Europe'
                },
            
                {
                    id: '2.17',
                    parent: '1.4',
                    name: 'Southern Europe'
                },
            
                {
                    id: '2.18',
                    parent: '1.4',
                    name: 'Western Europe'
                },
                /* Oceania */
                {
                    id: '2.19',
                    parent: '1.5',
                    name: 'Australia and New Zealand'
                },
            
                {
                    id: '2.20',
                    parent: '1.5',
                    name: 'Melanesia'
                },
            
                {
                    id: '2.21',
                    parent: '1.5',
                    name: 'Micronesia'
                },
            
                {
                    id: '2.22',
                    parent: '1.5',
                    name: 'Polynesia'
                }
              ],
              tooltip: {
                  pointFormat: '{point.name}'
              },
              marker: {
                  symbol: 'rect',
                  // @ts-ignore
                  width: '50',
                  height: 150,
              },
              // borderRadius: 10,
              dataLabels: {
                  // @ts-ignore
                  pointFormat: '{point.name}',
                  style: {
                      whiteSpace: 'nowrap'
                  }
              },
              levels: [
                  {
                      level: 1,
                      // @ts-ignore
                      levelIsConstant: false
                  },
                  {
                      level: 2,
                      // @ts-ignore
                      colorByPoint: true
                  },
                  {
                      level: 3,
                      colorVariation: {
                          key: 'brightness',
                          to: -0.5
                      }
                  },
                  {
                      level: 4,
                      colorVariation: {
                          key: 'brightness',
                          to: 0.5
                      }
                  }
              ]
          }
      ]
  };
  }
}
