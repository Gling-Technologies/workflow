import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';

@Component({
  selector: 'app-dragging',
  imports: [],
  templateUrl: './dragging.component.html',
  styleUrl: './dragging.component.css'
})
export class DraggingComponent implements OnInit,AfterViewInit {
  @ViewChild('divRef', { static: false }) divReference!: ElementRef;
  constructor() { }
  ngAfterViewInit() {
    this.highchartclick();
 }
  ngOnInit(): void {}

  highchartclick() {
    Highcharts.ganttChart(this.divReference.nativeElement as HTMLElement, {
      title: {
        text: 'Simple Gantt Chart'
      },
      chart: { renderTo: this.divReference.nativeElement as HTMLElement },
      series: [
        {
          name: 'Project 1',
          type: 'gantt',
          data: [
            {
              id: 's',
              name: 'Start prototype',
              start: Date.UTC(2014, 10, 20),
              end: Date.UTC(2014, 10, 20)
            }, {
              id: 'b',
              name: 'Develop',
              start: Date.UTC(2014, 10, 20),
              end: Date.UTC(2014, 10, 25),
              dependency: 's'
            }, {
              id: 'a',
              name: 'Run acceptance tests',
              start: Date.UTC(2014, 10, 23),
              end: Date.UTC(2014, 10, 26),
              dependency: 'b'
            }, {
              name: 'Test prototype',
              start: Date.UTC(2014, 10, 24),
              end: Date.UTC(2014, 10, 29),
              dependency: 'a'
            }
          ]
        }]
    });
  }
}
