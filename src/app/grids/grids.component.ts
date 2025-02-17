import { Component } from '@angular/core';
import { ControlPanelComponent } from "../control-panel/control-panel.component";
import { GridSystemComponent } from "../grid-system/grid-system.component";

@Component({
  selector: 'app-grids',
  imports: [ControlPanelComponent, GridSystemComponent],
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.css']
})

export class GridsComponent {
  outerGridSize = 20;
  innerGridSize = 4;
  cellSize = 10;
  selectedColor = '#8f8e8e';

  updateCellSize(newSize: number) {
    this.cellSize = newSize;
  }

  updateGridColor(newColor: string) {
    this.selectedColor = newColor;
  }
}
