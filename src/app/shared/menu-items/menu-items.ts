import { Injectable, Component, AfterViewInit ,OnInit} from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';


export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}
const MENUITEMS = [
    {state: 'starter', name: 'DashBoard', type: 'link', icon: 'av_timer' },
    {state: 'button', type: 'link', name: 'User Master', icon: 'crop_7_5'},
    {state: 'grid', type: 'link', name: 'User Details', icon: 'view_comfy'},
    /*{state: 'lists', type: 'link', name: 'Expenses', icon: 'view_list'},*/
    /* {state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline'},
    {state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab'},
    {state: 'stepper', type: 'link', name: 'Stepper', icon: 'web'},
    {state: 'expansion', type: 'link', name: 'Expansion Panel', icon: 'vertical_align_center'},
    {state: 'chips', type: 'link', name: 'Chips', icon: 'vignette'},
    {state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail'},
    {state: 'progress-snipper', type: 'link', name: 'Progress snipper', icon: 'border_horizontal'},
    {state: 'progress', type: 'link', name: 'Progress Bar', icon: 'blur_circular'},
    {state: 'dialog', type: 'link', name: 'Dialog', icon: 'assignment_turned_in'},
    {state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant'},
    {state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb'},
    {state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode'},
    {state: 'slide-toggle', type: 'link', name: 'Slide Toggle', icon: 'all_inclusive'},*/
]; 
const MENUITEMS1 = [
  /*{state: 'starter', name: 'DashBoard', type: 'link', icon: 'av_timer' },
    {state: 'button', type: 'link', name: 'User Master', icon: 'crop_7_5'},
    {state: 'grid', type: 'link', name: 'User Details', icon: 'view_comfy'},*/
    {state: 'lists', type: 'link', name: 'User Info', icon: 'view_list'},
   /* {state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline'},
    {state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab'},
    {state: 'stepper', type: 'link', name: 'Stepper', icon: 'web'},
    {state: 'expansion', type: 'link', name: 'Expansion Panel', icon: 'vertical_align_center'},
    {state: 'chips', type: 'link', name: 'Chips', icon: 'vignette'},
    {state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail'},
    {state: 'progress-snipper', type: 'link', name: 'Progress snipper', icon: 'border_horizontal'},
    {state: 'progress', type: 'link', name: 'Progress Bar', icon: 'blur_circular'},
    {state: 'dialog', type: 'link', name: 'Dialog', icon: 'assignment_turned_in'},
    {state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant'},
    {state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb'},
    {state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode'},
    {state: 'slide-toggle', type: 'link', name: 'Slide Toggle', icon: 'all_inclusive'},*/
    
]; 

@Injectable()

export class MenuItems  {
    master;
    constructor(private _router:Router, private _user:UserService) {
        this._user.user()
    .subscribe(
      data=>{
          this.settitlevalue(data);
      },
      error=>{
       this._router.navigate(['/login']) 
      }
    )
     }
     settitlevalue(data){
      this.master=data.flag;
     }
     manuprocess(){
        this._user.user()
    .subscribe(
      data=>{
          this.settitlevalue(data);
      },
      error=>{
       this._router.navigate(['/login']) 
      }
    )
     }
getMenuitem(): Menu[]  {
       if(this.master==1)
    return MENUITEMS;
  else if(this.master==2)
    return MENUITEMS1;
 }

}
