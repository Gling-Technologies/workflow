import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WorkflowService } from '../workflow.service';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-editmodal',
  imports: [MaterialModule, FormsModule],
  templateUrl: './editmodal.component.html',
  styleUrl: './editmodal.component.css' 
})
export class EditmodalComponent {
  private workflowService = inject(WorkflowService);
  private _snackBar = inject(MatSnackBar);

  constructor(
    public dialogRef: MatDialogRef<EditmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save(): void {
    if (!this.data.variable.name || !this.data.variable.key) {
      this._snackBar.open("Enter all fields", "Close", { duration: 3000 });
      return;
    }
  
    this.dialogRef.close(this.data.variable);
  }

  close(): void {
    this.dialogRef.close();
  }

  getFormattedName(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }

  getAllKeys(operator: 'steps' | 'flows'){
    return this.workflowService.getKey(operator);
  }
}
