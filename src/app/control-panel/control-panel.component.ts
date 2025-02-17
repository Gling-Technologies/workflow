import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-panel',
  imports: [MaterialModule, FormsModule],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  @Output() cellSizeChange = new EventEmitter<number>();
  @Output() colorChange = new EventEmitter<string>();

  // yamlInput: string = '';
  colors = [
    { name: 'Gray', code: '#8f8e8e' },
    { name: 'Charcoal Gray', code: '#5a5959' },
    { name: 'Coral Red', code: '#fa5a5a' },
    { name: 'Lime Green', code: '#43f870' },
    { name: 'Electric Blue', code: '#5e5bf7' },
    { name: 'Hot Pink', code: '#f75b8f' }
  ];
  selectedColor = this.colors[0].code;
  cellSize: number = 10;

  updateCellSize(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const size = parseInt(input, 10);
    if (size && size > 0) {
      this.cellSize = size;
      this.cellSizeChange.emit(this.cellSize);
    }
  }

  updateGridColor(color: string) {
    this.selectedColor = color;
    this.colorChange.emit(color);
  }

  downloadYaml() {
    // if (!this.yamlInput.trim()) {
    //   alert("Please enter some data before downloading.");
    //   return;
    // }
    const yamlContent = `data:\n cell_size: ${this.cellSize}\n grid_color: "${this.selectedColor}"`;
    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
