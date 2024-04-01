import { GamesService } from './../Services/games.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);


  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,public router: Router) {
   this.mobileQuery = media.matchMedia('(max-width: 600px)');
   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
   this.mobileQuery.addListener(this._mobileQueryListener);


   
 }

 ngOnDestroy(): void {
   this.mobileQuery.removeListener(this._mobileQueryListener);
 }

  ngOnInit(): void {
 
  }

  submitJudgeCoordinate(){

  }

  logout(){
    // this.authService.logout()
  }


}
