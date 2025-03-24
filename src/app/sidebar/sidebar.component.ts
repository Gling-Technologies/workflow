import { Component, signal } from '@angular/core';
import { MaterialModule } from '../material.module';
import { SidebarCategoriesComponent } from '../sidebar-categories/sidebar-categories.component';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarCategoriesComponent, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
