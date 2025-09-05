// src/app/components/student-list/student-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService, StudentModel } from '../../services/student';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.html',
})
export class StudentListComponent {
  students: StudentModel[] = [];
  page = 0;
  size = 10;
  totalElements = 0;

  classes = ['Class1', 'Class2', 'Class3', 'Class4', 'Class5'];
  selectedClass: string | undefined;
  searchId: number | undefined;

  constructor(private studentService: StudentService) {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService
      .getStudents(this.page, this.size, this.selectedClass, this.searchId)
      .subscribe((res: any) => {
        if (res.content) {
          this.students = res.content;
          this.totalElements = res.totalElements;
        } else {
          // single student (search by ID)
          this.students = [res];
          this.totalElements = 1;
        }
      });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadStudents();
  }

  export(format: 'excel' | 'csv' | 'pdf') {
    this.studentService.exportReport(format).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `students.${format}`;
      a.click();
    });
  }
}
