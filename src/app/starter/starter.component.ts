import { Component, AfterViewInit ,OnInit} from '@angular/core';
import {FormGroup,Validators,FormBuilder,FormControl} from '@angular/forms';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import { moveIn, fallIn } from '../shared/router.animations';
import {MatTableDataSource} from '@angular/material';
export interface PeriodicElement {
  
  title: string;
  ViruthuName:string;
  Address: string;
  Password: string;
  Mobileno:string;
  email:string;
  date:string;
  total_amount: string;
  color:string;
  status: string;
}
@Component({ 
  selector: 'starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'], 
})
export class StarterComponent implements OnInit,AfterViewInit {
   getinviruthudata: PeriodicElement[];
   displayedColumns: string[];
   dataSource: MatTableDataSource<any>;  
   username:String='';
   exampleForm:FormGroup;
   TotalAmounts;
    UserCounts;
   totalinfo:any;
  constructor(private _user:UserService, private _router:Router,private fb:FormBuilder){
    this._user.user()
    .subscribe(
      data=>{
        this.addName(data);
      },
      error=>{
       this._router.navigate(['/login']) 
      }
    )
}
  ngOnInit() {}
    addName(data){
    this.username = data.username;  
     this.getData();
     this._user.totalcounofinformation().subscribe(
      data=>{
        this.currentActivedate(data);

      },
      error=>alert(JSON.stringify(error.error))
    )
  }
  currentActivedate(data){
    this.UserCounts=data.UserCount;
    this.TotalAmounts=data.TotalAmount ;
  }
   getData(){
     this._user.getviruthu().subscribe((
     data:PeriodicElement[])=>{
     this.getinviruthudata=data;
        for(var i=0;i<this.getinviruthudata.length;i++){
                 if(this.getinviruthudata[i].status=='Active')
                    this.getinviruthudata[i].color='#101110';
           else if(this.getinviruthudata[i].status=='InActive')
                    this.getinviruthudata[i].color='#F50B07';
          }
     this.dataSource = new MatTableDataSource(this.getinviruthudata);
     this.displayedColumns = ['title', 'ViruthuName', 'Address','Mobileno','email','date','Amount'];
      
     },
      error=>{
        alert(JSON.stringify(error.error));
      });
 }
 ngAfterViewInit(){}   
 
}
