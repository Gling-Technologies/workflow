import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-grid-system',
  templateUrl: './grid-system.component.html',
  styleUrls: ['./grid-system.component.css'],
  imports: [SidebarComponent, DragDropModule]
})
export class GridSystemComponent implements OnInit {
  @Input() outerGridSize: number = 20;
  @Input() innerGridSize: number = 4;
  @Input() cellSize: number = 10;
  @Input() selectedColor: string = '#8f8e8e';

  items: number[] = [];
  innerGridItems: number[] = [];
  dropedItem: any = []

  ngOnInit() {
    this.generateGrid();
    this.generateInnerGridItems();
  }

  generateGrid() {
    const totalBlocks = this.outerGridSize * this.outerGridSize;
    this.items = Array.from({ length: totalBlocks }, (_, i) => i + 1);
  }

  generateInnerGridItems() {
    const totalInnerItems = this.innerGridSize * this.innerGridSize;
    this.innerGridItems = Array.from({ length: totalInnerItems }, (_, i) => i + 1);
  }
}
