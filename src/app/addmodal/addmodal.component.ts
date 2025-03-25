import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-addmodal',
  imports: [MaterialModule, FormsModule],
  templateUrl: './addmodal.component.html',
  styleUrl: './addmodal.component.css'
})
export class AddmodalComponent {
  private _snackBar = inject(MatSnackBar);
  private workflowService = inject(WorkflowService);
  
  name: string = '';
  key: string = '';
  next: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  close(): void {
    this.dialogRef.close(null);
  }

  save(): void {
    if (!this.name || !this.key){
      this._snackBar.open("Enter all the field", "close", { duration: 3000 });
      return;
    }  

    this._snackBar.open("Data Saved", "close", { duration: 3000 });
    const newStep = { name: this.name, key: this.key, next: this.next || null };
    this.dialogRef.close(newStep); 
  }

  getFormattedName(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }

  getAllKeys(operator: 'steps' | 'flows'){
    return this.workflowService.getKey(operator);
  }
}
