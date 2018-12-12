import { Component ,OnInit} from '@angular/core';
import {FormGroup,Validators,FormBuilder} from '@angular/forms';
import { UserService } from '../../user.service';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ExcelService} from '../../service/excel.service';

@Component({ 
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit{
   dataSource: MatTableDataSource<any>;
   createForm:FormGroup;
   toggleField: string;
   displayedColumns: string[];   
   globaltitle;
   globaldate;
   globalviruthu;
   globaluser;
   globalemail;
   globalamount;
   printpersonname;
   printamount;
   printcity;toalamount;
   fulldata=[];
   temp=[];
  constructor(private excelService:ExcelService,private userservice:UserService, private fb:FormBuilder ,private router:Router) { 
      
 this.userservice.user()
    .subscribe(
      data=>{
      
      this.personviruthuinfo(data);
      },
      error=>{
       this.router.navigate(['/login']) 
      }
    )

this.createForm=this.fb.group({
     Address:['',Validators.required],
     persontotalamount:['',Validators.required],
     personname:['',Validators.required],
})

}
 toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
    }
  ngOnInit() {  this.toggleField ="searchMode";}
  personviruthuinfo(data){
    this.globaltitle=data.username;
    this.globalemail=data.email;
    this.userservice.dasdadaadsdsd(this.globaltitle,this.globalemail)
    .subscribe(
      data=>{
          this.finalprocess(data);
        },
      error=>{
       this.router.navigate(['/login']) 
      }
    )

 }
  exportAsXLSX():void {
   // alert(JSON.stringify(this.fulldata));
    for(var i=0;i<this.fulldata.length;i++){
        var obj={  'SNO':i+1,'PERSON NAME':this.fulldata[i].name,'CITY':this.fulldata[i].address,
           'AMOUNT':this.fulldata[i].amount };
            this.temp.push(obj);
       }
   // alert(JSON.stringify(this.temp));

      this.temp.push({'SNO':'ToTalAmount','PERSON NAME':'','CITY':'','AMOUNT':this.toalamount});
    this.excelService.exportAsExcelFile(this.temp, 'sample');
    this.temp=[];
    this.fulldata=[];
   }
 recalldate(){
 this.userservice.dasdadaadsdsd(this.globaltitle,this.globalemail)
    .subscribe(
      data=>{
          this.finalprocess(data);
        },
      error=>{
       this.router.navigate(['/login']) 
      }
    )
  }
 finalprocess(data){
  this.globaldate=data.adminprocess[0].date; 
  this.globalviruthu=data.adminprocess[0].ViruthuName;
  this.globalamount=data.totalporcess[0].amount;
  this.globaluser=data.totalporcess[0].totalausers;
  this.dataSource = new MatTableDataSource(data.viruthuprocess);
   this.getTotalCost(data.viruthuprocess);
  this.displayedColumns = ['Name', 'City', 'Amount'];
}
getTotalCost(data){
  this.fulldata=data;
  this.toalamount=data.map(t => t.amount).reduce((acc, value) => acc +  parseInt(value), 0);
}
  addIssue(Address,persontotalamount,personname){
    this.printpersonname=personname;
    this.printamount=persontotalamount;
    this.printcity=Address;
       this.userservice.addpersonviruthu(this.globaltitle,this.globalviruthu,this.globaldate,Address,persontotalamount,personname,this.globalemail).subscribe(
      data=>{ 
         alert(JSON.stringify(data));
         this.prints();
         this.createForm.reset();
      } ,
      error=>alert(JSON.stringify(error.error))
      );
   }
 applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    prints(){
var prtContent = document.getElementById("prrerer");
var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
WinPrint.document.write(prtContent.innerHTML);
WinPrint.document.close();
WinPrint.focus();
WinPrint.print();
WinPrint.close();
  }
}
  