import { DashboardComponent } from './dashboard.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CourseComponent } from './course/course.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivateChild : [AuthGuard],
    children: [
      {
        path: '',

        redirectTo: 'maindashboard'

      },
      {
        path: 'maindashboard',
        component: MainDashboardComponent,

      },
    
      {
        path: 'student',
        component: StudentComponent,

      },
      {
        path: 'studentdetails/:id',
        component: StudentDetailsComponent,

      },
    
      {
        path: 'teacher',
        component: TeacherComponent,

      },
      {
        path: 'courses',
        component: CourseComponent,

      },
    
    ]


  }


]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
