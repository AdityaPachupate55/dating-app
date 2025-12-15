import { Component, signal } from '@angular/core';
import { Register } from "../account/register/register";
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected registerMode = signal(false);
    
  showregister(value:boolean){
    this.registerMode.set(value);
  }

  
}
