import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 

export class LoginComponent implements OnInit {
  loginForm : FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null, Validators.required)
  });
  constructor(private _router:Router, private _user:UserService) { }

  ngOnInit() {
  }

  moveToRegister(){
      this._router.navigate(['/starter']);
   }
  login(){
   this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{
         this.useractive();
         } ,
      error=>alert(JSON.stringify(error.error))
    )
  }
  activevalue(data){
            if(data.flag==1)
            this._router.navigate(['/starter']);
       else if(data.flag==2) 
            this._router.navigate(['/lists']);
     }
 useractive(){
this._user.user()
   .subscribe(data=>{
              this.activevalue(data);
            },
      error=>{
       this._router.navigate(['/login']) 
      }
    )
  }
}
