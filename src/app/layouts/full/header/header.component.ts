import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent  implements OnInit {

	  constructor(private _user:UserService, private _router:Router) { 

}
   logout(){
    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.error(error)
    )
  }  
   ngOnInit() {
  } 
}
