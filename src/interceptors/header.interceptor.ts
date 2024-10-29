import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppStore } from 'src/app/store/app.store';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AppStore).token;
  console.log(token())
  const modifiedReq = token() ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${ token() }`
    }
  }) : req;
  return next(modifiedReq);
};
