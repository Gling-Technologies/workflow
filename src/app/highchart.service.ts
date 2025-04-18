import { inject, Injectable } from '@angular/core';

import { WorkflowService } from './workflow.service';

@Injectable({
  providedIn: 'root'
})
export class HighchartService {
  private workflowService = inject(WorkflowService)

  findOperator(type: string, key: string): string[] {
    const result = this.workflowService.findOperators(type, key);
    console.log(result);
    return result;
  }
}
