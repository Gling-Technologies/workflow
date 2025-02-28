import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-sidebar-categories',
  imports: [MaterialModule, DragDropModule],
  templateUrl: './sidebar-categories.component.html',
  styleUrl: './sidebar-categories.component.css'
})
export class SidebarCategoriesComponent implements OnInit{
  @Input() position: 'left' | 'right' = 'left'; 
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

  toggleBadgeVisibility(operator: string, hidden: boolean) {
    this.badgeVisibility[operator] = hidden;
  }

  getFormattedOperator(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }

  getNames(key: 'steps' | 'flows'): string[] {
    return this.workflowService.getName(key);
  }
}
