import { Component, inject, Inject, Input, OnInit } from '@angular/core';
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
export class MymodalComponent implements OnInit {
  @Input() component: any;
  private workflowService = inject(WorkflowService)
  private _snackBar = inject(MatSnackBar);

  operatorConfig: { [key: string]: string[] } = {};
  categoryType: string = '';
  
  selectedConName: string = '';
  selectedCondition: string = '';
  selectedRun: string = '';
  selectedFallback: string = '';
  selectedProvider: string = '';
  selectedRequires: string = '';
  selectedRuntype: string = '';
  selectedScope: string = '';
  selectedVariable: string = '';
  selectedValue: string = '';
  selectedTimePeriod: string = '';
  selectedSource: string = '';
  selectedTarget: string = '';

  conditionOptions: string[] = ['Equals', 'Not Equals', 'Greater', 'Greater or Equals', 'less', 'Less or Equals', 'Starts with', 'Ends with', 'Contains', 'Not Contains'];
  // runOptions: string[] = [];
  fallbackOptions: string[] = [];
  providerOptions: string[] = ['identity', 'variable', 'secret', 'date'];
  runtypeOptions: string[] = ["workflow", "flow", "step"]
  ScopeOptions: string[] = ["global", "local"]

  constructor(
    public dialogRef: MatDialogRef<MymodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.operatorConfig = this.workflowService.getOperatorConfig();  
  }

  close(): void {
    this.dialogRef.close();
  }

  getFormattedOperator(operator: string): string {
    return this.workflowService.getFormatted(operator);
  }

  whichCategory(operator: any): string {
    return this.categoryType = this.workflowService.getCategoryByOperator(operator);
  }

  ConditionInputBox: any[] =  [{id: 1, operand1: null, operand2: null, selectedCondition: '' }]; 
  idCounter: number = 2;
  errorMessage: string = ''

  addCondition(){
    this.ConditionInputBox.push({id: this.idCounter++, selectedCondition: '' }); 
  }

  removeCondition(index: number){    
    if(this.ConditionInputBox.length > 1){
      this.ConditionInputBox.splice(index, 1);
    }
  }

  runOptions(type: 'steps' | 'flows'){
    return this.workflowService.getKey(type)
  }

  saveData(name: string) {
    const isValid = this.ConditionInputBox.every(item => 
      // item.operand1 !== null && item.operand1 !== undefined && item.operand1 !== '' &&
      // item.operand2 !== null && item.operand2 !== undefined && item.operand2 !== '' &&
      // item.selectedCondition !== null && item.selectedCondition !== undefined && item.selectedCondition !== '' &&
      this.selectedConName !== '' && this.selectedConName !== null && this.selectedConName !== undefined &&
      this.selectedRun !== '' && this.selectedRun !== null && this.selectedRun !== undefined
    );
  
    if (!isValid) {
      this._snackBar.open("Enter all the field", "close", { duration: 3000 });
      return;
    }
  
    const dataToSave = {
      // name: "",
      // next: "",
      action: {
        type: name,
        kind: this.workflowService.getCategoryByOperator(name),
        conditions: this.ConditionInputBox.map(item => ({
          operand1: item.operand1,
          operator: item.selectedCondition,
          operand2: item.operand2
        })),
      },
      conditionName: this.selectedConName,
      run: this.selectedRun,
      fallback: this.selectedFallback,
      

    };

    // console.log("Saved Data:", dataToSave);
    this.dialogRef.close(dataToSave);
    this._snackBar.open("Data Saved", "close", {duration: 3000});
  }
}

