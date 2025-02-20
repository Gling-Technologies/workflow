import { Component, signal } from '@angular/core';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-sidebar-categories',
  imports: [MaterialModule],
  templateUrl: './sidebar-categories.component.html',
  styleUrl: './sidebar-categories.component.css'
})
export class SidebarCategoriesComponent {
  readonly panelOpenState = signal(false);
  badgeVisible = false;
  badgeVisibility: { [key: string]: boolean } = {};

  categories: { [key: string]: string[] }  = {
    "Control Operators": ["condition", "for_each", "run_until", "scope", "switch", "terminate"], 
    "Variables Operators": ["append_to_array", "append_to_string", "merge_array", "decrement", "increment","initializer", "set_var", "filter", "deduplicate"], 
    "Web Operators": ["existence", "click", "write", "select", "hover", "extract_data", "css_property", "visibility", "snippet", "wait_until"], 
    "Browser Operators": ["window_resize", "load", "refresh_tab", "wait_for_download"], 
    "System Operators": ["wait", "run", "delete_file", "move_file"]
  }

  get keys() {
    return Object.keys(this.categories);
  }

  constructor() {
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
    return operator ? operator.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : '';
  }
}
