import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','primary_address','action'];
  dataSource  = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',primary_address:'aa'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',primary_address:'aa'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',primary_address:'aa'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',primary_address:'aa'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',primary_address:'aa'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',primary_address:'aa'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',primary_address:'aa'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',primary_address:'aa'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',primary_address:'aa'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',primary_address:'aa'},
  ];
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);
  
  constructor( public router:Router ,private activeRoute: ActivatedRoute,  ) { }

  ngOnInit(): void {
  }

  editUser(i){
    console.log('for edit i got',i);
    this.router.navigate(['dashboard/studentdetails/'+i.position], { state: { data: i } });
  }

}
