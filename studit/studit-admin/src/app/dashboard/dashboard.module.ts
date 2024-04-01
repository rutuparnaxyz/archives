import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CourseComponent } from './course/course.component';
import { AngularMaterialModule } from '../modules/common/angular-material/angular-material.module';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    MainDashboardComponent,
    StudentComponent,
    TeacherComponent,
    CourseComponent,
    StudentDetailsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class DashboardModule { }
