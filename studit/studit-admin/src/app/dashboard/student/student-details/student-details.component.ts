import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  studentId;
  constructor(private activeRoute: ActivatedRoute,) { }
  studentDetails = {
    first_name: '',
    last_name: '',
    email: '',
    primary_contact_number:'',
    secondary_contact_number:'',
    primary_address: '',
    secondary_address:'',
    role_id: '',
    bank_details:null
    // bank_details: {
    //   account_holder_name: null,
    //   bank_name: null,
    //   branch_name:null,
    //   account_number: null,
    //   confirm_account_number: null,
     
    //   ifsc_code: ''
    // },
  };

  ngOnInit(): void {
    this.studentId = this.activeRoute.snapshot.params["id"];

  }

}
