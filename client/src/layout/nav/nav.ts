import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { User } from '../../types/user';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected creds:any = {}
  protected accountService = inject(AccountService);

  

  login(){
    this.accountService.login(this.creds).subscribe({
      next:response=>{
        console.log(response);
        
      },
      error:error=>console.log(error)

    });
  }

  logout(){
    this.accountService.logout();
    this.creds={};
  }
  
}
