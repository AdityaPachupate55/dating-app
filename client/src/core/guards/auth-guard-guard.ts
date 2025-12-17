import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastService } from '../services/toast-service';
import { AccountService } from '../services/account-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const toast = inject(ToastService);
  const accountService = inject(AccountService);

  if(accountService.currentUser()) return true;
  else{
    toast.error('Access denied')
    return false;
  }
};
