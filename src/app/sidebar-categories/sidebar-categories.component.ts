import { Component, inject, Input, OnInit, Optional, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MaterialModule } from '../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkflowService } from '../workflow.service';
import { EditmodalComponent } from '../editmodal/editmodal.component';
import { AddmodalComponent } from '../addmodal/addmodal.component';

@Component({
  selector: 'app-sidebar-categories',
  imports: [MaterialModule, DragDropModule],
  templateUrl: './sidebar-categories.component.html',
  styleUrl: './sidebar-categories.component.css'
})
export class SidebarCategoriesComponent implements OnInit{
  @Input() position: 'left' | 'right' = 'left'; 
  public dialog = inject(MatDialog); 
  private workflowService = inject(WorkflowService)
  readonly panelOpenState = signal(false);
  badgeVisible = false;
  badgeVisibility: { [key: string]: boolean } = {};

  leftCategories: { [key: string]: string[] }  = {}
  rightCategories: { [key: string]: string[] } = {'steps':[], 'flows':[]}
  stepData: any 
  flowData: any

  ngOnInit(): void {
    this.stepData = this.workflowService.getKeyAndNext('steps'); 
    this.flowData = this.workflowService.getKeyAndNext('flows'); 
  }

  constructor() {
    this.leftCategories = this.workflowService.getCategories()

    Object.keys(this.leftCategories).forEach(key => {
      this.leftCategories[key].forEach(operator => {
        this.badgeVisibility[operator] = true; // Initially hidden
      });
    });
  }

  getCategoryKeys(obj: { [key: string]: string[] }): string[] {
    return Object.keys(obj);
  } 

  // toggleBadgeVisibility(operator: string, hidden: boolean) {
  //   this.badgeVisibility[operator] = hidden;
  // }

  getFormattedOperator(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }

  // getNames(key: 'steps' | 'flows'): string[] {
  //   return this.workflowService.getName(key);
  // }

  deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  openEditModal(variable: any, varName?: string): void {
    const variableCopy = this.deepCopy(variable);
    const dialogRef = this.dialog.open(EditmodalComponent, {
      width: '450px',  
      maxWidth: '90vw', 
      data: { variable: variableCopy, vari: varName }, 
    });

    dialogRef.afterClosed().subscribe(updatedData => {
      if (updatedData) {
        if (varName === 'step') {
          const index = this.stepData.findIndex((item: any) => item.key === variable.key);
          if (index !== -1) {
            this.stepData[index] = updatedData;
          }
        }
        else if (varName === 'flow') {
          const index = this.flowData.findIndex((item: any) => item.key === variable.key);
          if (index !== -1) {
            this.flowData[index] = updatedData;
          }
        }
        console.log("Updated Data:", updatedData);
      }else {
        console.log("Changes were discarded.");
      }
    });
  }

  openAddModal(data?: string): void {
    const dialogRef = this.dialog.open(AddmodalComponent, {
      width: '450px',  
      maxWidth: '90vw', 
      data: data, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {  
        if (data === 'Step') {
          this.stepData.push(result); 
        }else{
          this.flowData.push(result);
        }
      }
    });
  }
}
