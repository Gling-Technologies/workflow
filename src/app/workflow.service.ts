import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  workflow = {
    "name": "",
    "vars": "",
    "entrypoint": "",
    "steps": {},
    "flow": {}
  }

  getFormatted(operator: string): string {
    return operator ? operator.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()) : '';
  }
}
