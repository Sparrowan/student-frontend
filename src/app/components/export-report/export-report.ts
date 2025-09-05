import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-export-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn btn-success me-2" (click)="export('excel')">Export Excel</button>
    <button class="btn btn-success me-2" (click)="export('csv')">Export CSV</button>
    <button class="btn btn-success" (click)="export('pdf')">Export PDF</button>
    <p *ngIf="message">{{ message }}</p>
  `
})
export class ExportReport {
  message = '';

  constructor(private studentService: StudentService) {}

  export(format: 'excel' | 'csv' | 'pdf') {
    this.studentService.exportReport(format).subscribe({
       next: (blob: Blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `report.${format}`;
        link.click();
        this.message = `Report exported as ${format.toUpperCase()}`;
      },
      error: () => this.message = 'Export failed'
    });
  }
}
