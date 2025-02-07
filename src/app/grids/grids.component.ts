import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.css'],
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule]
})

export class GridsComponent {
  outerGridSize: number = 20; // Fixed outer grid size (20x20)
  innerGridSize: number = 4;  // Fixed inner grid size (4x4)
  cellSize: number = 13; // Default size of inner grid cells in pixels
  items: number[] = [];
  innerGridItems: number[] = [];

  colors: { name: string, code: string }[] = [
    { name: 'Gray', code: '#8f8e8e' },
    { name: 'Charcoal Gray', code: '#5a5959' },
    { name: 'Coral Red', code: '#fa5a5a' },
    { name: 'Lime Green', code: '#43f870' },
    { name: 'Electric Blue', code: '#5e5bf7' },
    { name: 'Hot Pink', code: '#f75b8f' }
  ];
  selectedColor: string = this.colors[0].code; 

  constructor() {
    this.generateGrid();
    this.generateInnerGridItems();
  }

  // Generate grid based on user input
  generateGrid() {
    const totalBlocks = this.outerGridSize * this.outerGridSize;
    this.items = Array.from({ length: totalBlocks }, (_, i) => i + 1);
  }

  // Update grid when user changes the input
  updateCellSize(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const size = parseInt(input, 10);
    if (size && size > 0) {
      this.cellSize = size;
    }
  }

  generateInnerGridItems() {
    const totalInnerItems = this.innerGridSize * this.innerGridSize;
    this.innerGridItems = Array.from({ length: totalInnerItems }, (_, i) => i + 1);
  }

  updateGridColor(color: string) {
    this.selectedColor = color;
  }
}