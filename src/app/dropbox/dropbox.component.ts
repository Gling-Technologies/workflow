import { Component, inject, Input, OnInit } from '@angular/core';
import { DragDropModule, CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { WorkflowService } from '../workflow.service';
import { MymodalComponent } from '../mymodal/mymodal.component';

@Component({
  selector: 'app-dropbox',
  imports: [DragDropModule],
  templateUrl: './dropbox.component.html',
  styleUrl: './dropbox.component.css'
})

export class DropboxComponent {
  private dialog = inject(MatDialog)
  private workflowService = inject(WorkflowService)

  droppedItems: any = []
  comp: string = '';

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

  removeItem(index: number){
    this.droppedItems.splice(index, 1);
    // this.dropedItem = [...this.dropedItem]; it forces Angular to detect changes by creating a new reference to the array.
    // when using functions like filter(), it returns a entierly new array which force angular change detection so there is no use of this.dropedItem = [...this.dropedItem]; 
    // Normally, Angular's change detection doesn't detect in-place mutations (using .splice(), .push(), .pop()), but in your case: The component si inside a cdkDropList, which triggers change detection automatically.
  }

  getFormattedOperator(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }

  openModal(dropItem: any): void {
    this.comp = 'operator'
    this.dialog.open(MymodalComponent, {
      width: "800px", 
      maxWidth: '90vw',  
      data: { dropItem },
    });
  }
}
