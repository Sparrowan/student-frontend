// src/app/services/student.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Student {
  private baseUrl = 'http://localhost:9090/students';

  constructor(private http: HttpClient) {}

  // Use POST now
  generateExcel(count: number): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/generate-excel?count=${count}`,
      {}, // empty body
      { responseType: 'blob' }
    );
  }

  uploadCSV(file: File): Observable<any> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`${this.baseUrl}/upload-csv`, form);
  }

  exportReport(format: 'excel' | 'csv' | 'pdf'): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/report/${format}`, { responseType: 'blob' });
  }
}
