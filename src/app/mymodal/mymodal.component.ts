import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-mymodal',
  imports: [FormsModule, MaterialModule],
  templateUrl: './mymodal.component.html',
  styleUrl: './mymodal.component.css'
})
export class MymodalComponent {
  selectedCondition: string = '';
  selectedRun: string = '';
  selectedFallback: string = '';

  conditionOptions: string[] = ['condition1'];
  runOptions: string[] = [];
  fallbackOptions: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<MymodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  getFormattedOperator(operator: string): string {
    return operator ? operator.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : '';
  }
}

