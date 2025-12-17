import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { User } from '../../types/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected creds:any = {}
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastService);

  

  login(){
    this.accountService.login(this.creds).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in Succesfully')
        this.creds = {};
      },
      error: res => {
        const msg = res?.error ?? 'Login failed';
        this.toast.error(typeof msg === 'string' ? msg : 'Invalid credentials');
      }
    });
  }

  logout(){
    this.accountService.logout();
    this.toast.success('Logged out successfully')
    this.router.navigateByUrl('/');
  }
  
}
