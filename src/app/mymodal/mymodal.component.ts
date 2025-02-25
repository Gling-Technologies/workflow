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

  conditionOptions: string[] = ['== (equals)', '!= (notEquals)', '> (greater)', '>= (greaterOrEquals)', '< (less)', '<= (lessOrEquals)', 'x.startswith(y)', 'x.endswith(y)', 'x in y (contains)', '!(x in y) (notContains)'];
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

  inputBox: any[] =  [{ selectedCondition: '' }]; ;

  addCondition(){
    this.inputBox.push({ selectedCondition: '' }); 
  }

  removeCondition(index: number){
    this.inputBox.splice(index, 1)
  }
}

