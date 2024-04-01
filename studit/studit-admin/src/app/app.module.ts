import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_guards/auth.guard';
import { ToastrService } from 'ngx-toastr';
import { PopupComponent } from './popup/popup.component';

import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { LoaderInterceptor } from './Services/loader-interceptor.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AngularMaterialModule } from './modules/common/angular-material/angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PopupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxUiLoaderModule,
    MatProgressSpinnerModule,
    AngularMaterialModule,
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

    // AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },


 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
