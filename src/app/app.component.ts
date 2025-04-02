import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridsComponent } from "./grids/grids.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DragComponent } from "./drag/drag.component";
import { DiagramComponent } from "./diagram/diagram.component";

@Component({
  selector: 'app-root',
  imports: [GridsComponent, DiagramComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'work_flow';
}
