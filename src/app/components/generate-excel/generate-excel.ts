import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../services/student';

@Component({
  selector: 'app-generate-excel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-3">
      <label>Number of Records:</label>
      <input type="number" [(ngModel)]="count" class="form-control">
      <button class="btn btn-primary mt-2" (click)="generateExcel()">Generate Excel</button>
    </div>
    <p *ngIf="message">{{ message }}</p>
  `
})
export class GenerateExcel {
  count = 1000;
  message = '';

  constructor(private studentService: Student) {}

  generateExcel() {
    this.studentService.generateExcel(this.count).subscribe({
      next: blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'students.xlsx';
        link.click();
        this.message = 'Excel generated successfully';
      },
      error: err => {
        console.error(err);
        this.message = 'Error generating Excel';
      }
    });
  }
}
