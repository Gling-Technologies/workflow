import { inject, Injectable } from '@angular/core';

import { WorkflowService } from './workflow.service';

@Injectable({
  providedIn: 'root'
})
export class HighchartService {
  private workflowService = inject(WorkflowService)

  constructor() { }

  findOperator(type: string, key: string){
    this.workflowService.findOperators(type, key)
  }
}
