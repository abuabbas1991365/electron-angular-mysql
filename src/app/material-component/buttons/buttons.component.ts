import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import {MatTableDataSource} from '@angular/material';
export interface PeriodicElement {
 
  title: string;
  ViruthuName:string;
  Address: string;
  Password: string;
  Mobileno:string;
  email:string;
  date:string;
  status:string;
  color:string;
}
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit{
   
   getinviruthudata: PeriodicElement[];
   displayedColumns: string[];
   dataSource: MatTableDataSource<any>;
   createForm:FormGroup;
   toggleField: string;
   hide = true;
   editemail;
   editMobileno;
   editPassword;
   editAddress;
   editdate;
   editViruthuName;
   edittitle;
   minDate;
   maxDate; 
  constructor( private userservice:UserService, private fb:FormBuilder ,private router:Router) { 
  this.createForm=this.fb.group({
  	 title: ['',Validators.required],
  	 ViruthuName:['',Validators.required],
  	 date:['',Validators.required],
  	 Address:['',Validators.required],
     Password:['',Validators.required],
     Mobileno:['',Validators.required],
     EmailId:['',Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],

})
 this.getdateinfo();
}
 getdateinfo(){
     var dueDate=new Date();
        dueDate.setMonth(dueDate.getMonth()+1);
        dueDate.setDate(dueDate.getDate()-1);
        this.minDate = new Date(dueDate);
        this.maxDate = new Date(2020, 0, 1);
 }
  addIssue(title,ViruthuName,date,Address,Password,Mobileno,email){
      this.userservice.addviruthu(title,ViruthuName,date,Address,Password,Mobileno,email).subscribe(
      data=>{
        alert(JSON.stringify(data));
         this.createForm.reset();
      } ,
      error=>alert(JSON.stringify(error.error))
      );
   }

  SaveEditinfo(title,ViruthuName,date,Address,Password,Mobileno,Status){
      this.userservice.getpersoneditinfo(title,ViruthuName,date,Address,Password,Mobileno,Status,this.editemail).subscribe(
      data=>{
        alert(JSON.stringify(data));
      } ,  
      error=>alert(JSON.stringify(error.error))
      );
  }
   deleteDoc(email,status){
       if(status=='InActive'){
        alert("All Ready this Account For DeActivate.....!");  
       }
     else if(status=='Active'){
    this.userservice.getpersondeleteinfo(email).subscribe(
      data=>{
        alert(JSON.stringify(data));
        this.getData();
      } ,
      error=>alert(JSON.stringify(error.error))
      );
       }

     
  }
 
  toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
    }
  ngOnInit() {  this.toggleField ="searchMode"; this.getData();}
  getData(){
	 this.userservice.getviruthu().subscribe((
     data:PeriodicElement[])=>{
     this.getinviruthudata=data;
        for(var i=0;i<this.getinviruthudata.length;i++){
                   if(this.getinviruthudata[i].status=='Active')
                    this.getinviruthudata[i].color='#101110';
              else if(this.getinviruthudata[i].status=='InActive')
                    this.getinviruthudata[i].color='#F50B07';
                        
        }
        //alert(JSON.stringify(this.getinviruthudata));
     this.dataSource = new MatTableDataSource(this.getinviruthudata);
     this.displayedColumns = ['title', 'ViruthuName', 'Address','Mobileno','Password','date','Status','Action'];
     },
      error=>{
      	alert(JSON.stringify(error.error));
      });
 }
 geteditinfo(email,Mobileno,Password,Address,date,ViruthuName,title,status){
    if(status=='InActive'){
    this.toggle('searchMode');
     alert("Account AllReady Deactivate Dont Try...!");
    }
   this.editemail=email;
   this.editMobileno=Mobileno;
   this.editPassword=Password;
   this.editAddress=Address;
   this.editdate=date;
   this.editViruthuName=ViruthuName;
   this.edittitle=title;
 }
 refitem(){
    this.createForm.reset();
 }
applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fndate(value){
     var selectedDate = new Date(value);
     var now = new Date();
    
     if(selectedDate < now) {
          

      this.createForm.reset();
      alert("Date must be in the future");
   }

  }
  print(elem){
    
var prtContent = document.getElementById("prrerer");
var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
WinPrint.document.write(prtContent.innerHTML);
WinPrint.document.close();
WinPrint.focus();
WinPrint.print();
WinPrint.close();
  }
}
