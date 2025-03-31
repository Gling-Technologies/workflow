declare const require: any;

import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, copyArrayItem, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

import  * as HighchartsGantt from 'highcharts/highcharts-gantt';

import GanttModule from 'highcharts/modules/gantt';


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
  
}