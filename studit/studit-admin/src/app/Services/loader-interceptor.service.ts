// loader-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize, catchError } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(public uiLoader: NgxUiLoaderService, public toast: ToastrService) { }

 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    this.uiLoader.start();
    if (navigator.onLine) {
      return next.handle(req)
        .pipe(finalize(() => {
          this.uiLoader.stop();
        }))
        .pipe(catchError(err => {
          if (err.error.statusCode === 400) {
            this.toast.error('Something Went Wrong!');
          }
          if (err.error.statusCode === 500) {

            this.toast.error(err.error.message);
          }
          if (err.error.status === 401 || err.error.status) {

             this.toast.error(err.error.message);
          }


          return throwError(err.error);
        }
        ));
    } else {
      this.toast.error('Please Check your Network Connection');
    }
    return undefined;
  }
}
