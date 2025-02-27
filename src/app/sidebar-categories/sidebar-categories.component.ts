import { Component, inject, Input, signal } from '@angular/core';
import { MaterialModule } from '../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-sidebar-categories',
  imports: [MaterialModule, DragDropModule],
  templateUrl: './sidebar-categories.component.html',
  styleUrl: './sidebar-categories.component.css'
})
export class SidebarCategoriesComponent {
  @Input() position: 'left' | 'right' = 'left'; 
  private workflowService = inject(WorkflowService)

  readonly panelOpenState = signal(false);
  badgeVisible = false;
  badgeVisibility: { [key: string]: boolean } = {};

  leftCategories: { [key: string]: string[] }  = {}
  rightCategories: { [key: string]: string[] } = {'STEPS':[], 'FLOWS':[]}

  stepNames = this.workflowService.getName('steps');
  stepNext = this.workflowService.getNext('steps'); 

  flowNames = this.workflowService.getName('flows');
  flowNext = this.workflowService.getNext('flows'); 

  constructor() {
    this.leftCategories = this.workflowService.getCategories()

    Object.keys(this.leftCategories).forEach(key => {
      this.leftCategories[key].forEach(operator => {
        this.badgeVisibility[operator] = true; // Initially hidden
      });
    });
  }

  getKeys(obj: { [key: string]: string[] }): string[] {
    return Object.keys(obj);
  } 

  toggleBadgeVisibility(operator: string, hidden: boolean) {
    this.badgeVisibility[operator] = hidden;
  }

  getFormattedOperator(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }
}
