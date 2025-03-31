import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridsComponent } from "./grids/grids.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DragComponent } from "./drag/drag.component";
import { DraggingComponent } from "./dragging/dragging.component";

@Component({
  selector: 'app-root',
  imports: [ DraggingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'work_flow';
}
