import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import your standalone components
import { GenerateExcel } from './components/generate-excel/generate-excel';
import { UploadCsv } from './components/upload-csv/upload-csv';
import { ExportReport } from './components/export-report/export-report';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    GenerateExcel,
    UploadCsv,
    ExportReport
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('student-frontend');
}
