import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';
import { WorkflowService } from '../workflow.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editmodal',
  imports: [MaterialModule, FormsModule],
  templateUrl: './editmodal.component.html',
  styleUrl: './editmodal.component.css' 
})
export class EditmodalComponent {
  private workflowService = inject(WorkflowService);

  constructor(
    public dialogRef: MatDialogRef<EditmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  getFormattedName(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }
}
