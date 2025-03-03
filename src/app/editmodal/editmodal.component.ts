import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-editmodal',
  imports: [MaterialModule],
  templateUrl: './editmodal.component.html',
  styleUrl: './editmodal.component.css' 
})
export class EditmodalComponent {
 constructor(
    public dialogRef: MatDialogRef<EditmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
