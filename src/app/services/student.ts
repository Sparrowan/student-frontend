// src/app/services/student.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentModel {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  studentClass: string;
  score: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private baseUrl = 'http://localhost:9090/students';

  constructor(private http: HttpClient) {}

  // List with pagination + filter + search
  getStudents(
    page: number,
    size: number,
    studentClass?: string,
    studentId?: number
  ): Observable<PageResponse<StudentModel>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (studentClass) {
      params = params.set('studentClass', studentClass);
    }
    if (studentId) {
      return this.http.get<PageResponse<StudentModel>>(`${this.baseUrl}/search/${studentId}`);
    }

    return this.http.get<PageResponse<StudentModel>>(this.baseUrl, { params });
  }

  generateExcel(count: number): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/generate-excel?count=${count}`,
      {},
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
