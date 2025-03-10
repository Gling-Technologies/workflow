import { Component, inject, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MaterialModule } from '../material.module';
import { WorkflowService } from '../workflow.service';

@Component({
  selector: 'app-mymodal',
  imports: [FormsModule, MaterialModule, CommonModule],
  templateUrl: './mymodal.component.html',
  styleUrl: './mymodal.component.css'
})
export class MymodalComponent {
  @Input() component: any;
  private workflowService = inject(WorkflowService)
  private _snackBar = inject(MatSnackBar);
  
  selectedCondition: string = '';
  selectedRun: string = '';
  selectedFallback: string = '';
  selectedProvider: string = '';
  selectedRequires: string = '';
  selectedRuntype: string = '';

  conditionOptions: string[] = ['equals', 'notEquals', 'greater', 'greaterOrEquals', 'less', 'lessOrEquals', 'x.startswith(y)', 'x.endswith(y)', 'contains', 'notContains'];
  runOptions: string[] = [];
  fallbackOptions: string[] = [];
  providerOptions: string[] = ['identity', 'variable', 'secret', 'date'];
  runtypeOptions: string[] = ["workflow", "flow", "step"]
  
  constructor(
    public dialogRef: MatDialogRef<MymodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  getFormattedOperator(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }

  inputBox: any[] =  [{id: 1, operand1: null, operand2: null, selectedCondition: '' }]; 
  idCounter: number = 2;
  errorMessage: string = ''

  addCondition(){
    this.inputBox.push({id: this.idCounter++, selectedCondition: '' }); 
  }

  removeCondition(index: number){    
    if(this.inputBox.length > 1){
      this.inputBox.splice(index, 1);
    }
  }

  saveData(name: string) {
    const isValid = this.inputBox.every(item => 
      item.operand1 !== null && item.operand1 !== undefined && item.operand1 !== '' &&
      item.operand2 !== null && item.operand2 !== undefined && item.operand2 !== '' &&
      item.selectedCondition !== null && item.selectedCondition !== undefined && item.selectedCondition !== ''
    );
  
    if (!isValid) {
      this._snackBar.open("Enter all the field", "close", { duration: 3000 });
      return;
    }
  
    const dataToSave = {
      name: "",
      next: "",
      action: {
        type: name,
        kind: this.workflowService.getCategoryByOperator(name),
        conditions: this.inputBox.map(item => ({
          operand1: item.operand1,
          operator: item.selectedCondition,
          operand2: item.operand2
        })),
        run: this.selectedRun,
        fallback: this.selectedFallback
      },
      // type: run
      // kind: system

    };

    console.log("Saved Data:", dataToSave);
    this.dialogRef.close(dataToSave);
    this._snackBar.open("Data Saved", "close", {duration: 3000});
  }
}

