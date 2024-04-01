import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';

const PrimeModules = [
  TableModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimeModules
  ],
  exports: [PrimeModules],

})
export class AngularPrimengModule { }
