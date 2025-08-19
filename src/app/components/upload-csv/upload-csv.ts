import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../services/student';

@Component({
  selector: 'app-upload-csv',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input type="file" (change)="onFileSelected($event)">
    <button class="btn btn-primary mt-2" (click)="upload()">Upload CSV</button>
    <p *ngIf="message">{{ message }}</p>
  `
})
export class UploadCsv {
  file: File | null = null;
  message = '';

  constructor(private studentService: Student) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    if (!this.file) return;
    this.studentService.uploadCSV(this.file).subscribe({
      next: () => this.message = 'CSV uploaded successfully',
      error: () => this.message = 'Upload failed'
    });
  }
}
