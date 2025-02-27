import { Component, inject, signal } from '@angular/core';
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
  private workflowService = inject(WorkflowService)

  readonly panelOpenState = signal(false);
  badgeVisible = false;
  badgeVisibility: { [key: string]: boolean } = {};

  categories: { [key: string]: string[] }  = {}

  get keys() {
    return Object.keys(this.categories);
  }

  constructor() {
    this.categories = this.workflowService.getCategories()

    Object.keys(this.categories).forEach(key => {
      this.categories[key].forEach(operator => {
        this.badgeVisibility[operator] = true; // Initially hidden
      });
    });
  }

  toggleBadgeVisibility(operator: string, hidden: boolean) {
    this.badgeVisibility[operator] = hidden;
  }

  getFormattedOperator(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }
}
