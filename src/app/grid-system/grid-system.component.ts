import { Component, inject, Input, OnInit } from '@angular/core';
import { DragDropModule, CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { SidebarComponent } from "../sidebar/sidebar.component";
import { MymodalComponent } from '../mymodal/mymodal.component';

@Component({
  selector: 'app-grid-system',
  templateUrl: './grid-system.component.html',
  styleUrls: ['./grid-system.component.css'],
  imports: [SidebarComponent, DragDropModule]
})
export class GridSystemComponent implements OnInit {
  private dialog = inject(MatDialog)

  @Input() outerGridSize: number = 20;
  @Input() innerGridSize: number = 4;
  @Input() cellSize: number = 10;
  @Input() selectedColor: string = '#8f8e8e';

  items: number[] = [];
  innerGridItems: number[] = [];
  droppedItem: any = []

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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // REPETETIVE CODE
  getFormattedOperator(operator: string): string {
    return operator ? operator.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : '';
  }

  openModal(item: any): void {
    this.dialog.open(MymodalComponent, {
      width: '800px',  
      maxWidth: '90vw',  
      data: { item },
    });
  }

  removeItem(index: number){
    this.droppedItem.splice(index, 1);
    // this.dropedItem = [...this.dropedItem]; it forces Angular to detect changes by creating a new reference to the array.
    // when using functions like filter(), it returns a entierly new array which force angular change detection so there is no use of this.dropedItem = [...this.dropedItem]; 
    // Normally, Angular's change detection doesn't detect in-place mutations (using .splice(), .push(), .pop()), but in your case: The component si inside a cdkDropList, which triggers change detection automatically.
  }
}
