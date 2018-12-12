import { Component,OnInit } from '@angular/core';
import {FormGroup,Validators,FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import {MatTableDataSource} from '@angular/material';
import {ExcelService} from '../../service/excel.service';
export interface UserElement {
  title: string;
  ViruthuName:string;
  total_amount: string;
  date:string;
  status:string;
  color:string;
  email:string;
}
export interface DetailUser {
  viruthu_name:string;
  date:string;
  address:string;
  amount:string;
  name:string;
   status:string;
   color:string;
   email:string;

}
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    data: any = [];
    uservirthu: UserElement[];
    displayedColumns1: string[];
    dataSource1: MatTableDataSource<any>;
    toggleField: string;
    detailinfo: DetailUser[];
    displayedColumns: string[];
    dataSource: MatTableDataSource<any>;
    toalamount;
    temp=[];
    constructor(private excelService:ExcelService, private userservice:UserService, private fb:FormBuilder ,private router:Router) { 
  
     }
   ngOnInit() {  this.toggleField ="searchMode"; this.getData();}
   exportAsXLSX():void {
     //alert(JSON.stringify(this.data));

     for(var i=0;i<this.data.length;i++){
     var obj={  'SNO':i+1,'PERSON NAME':this.data[i].name,'VIRUTHU NAME':this.data[i].viruthu_name,
           'ADDRESSE':this.data[i].address,'AMOUNT':this.data[i].amount }
            this.temp.push(obj);
          }
     this.temp.push({'SNO':'ToTalAmount','PERSON NAME':'','VIRUTHU NAME':'','ADDRESSE':'','AMOUNT':this.toalamount});
   //  alert(JSON.stringify(this.temp));
      this.excelService.exportAsExcelFile(this.temp, 'sample');
    this.temp=[];
   }
    getTotalCost(data){
     this.toalamount=data.map(t => t.amount).reduce((acc, value) => acc +  parseInt(value), 0);
    }
   ViruthupersonDetailinfo(useradminname,date,email){
      this.userservice.viruthupersondetails(useradminname,date,email).subscribe(
 (data:DetailUser[])=>{  
      this.detailinfo=data;
      this.data=data;
  
    this.getTotalCost(this.data);
     this.dataSource = new MatTableDataSource(this.detailinfo);
      this.displayedColumns = ['PersonName', 'ViruthuName', 'Viruthu Date','Address','Amount'];
      } ,
      error=>alert(JSON.stringify(error.error))
      );
   }
   getData(){
   this.userservice.getviruthu().subscribe((
     data:UserElement[])=>{
     this.uservirthu=data;
         for(var i=0;i<this.uservirthu.length;i++){
                   if(this.uservirthu[i].status=='Active')
                    this.uservirthu[i].color='#101110';
              else if(this.uservirthu[i].status=='InActive')
                    this.uservirthu[i].color='#F50B07';
          }
      this.dataSource1 = new MatTableDataSource(this.uservirthu);
     this.displayedColumns1 = ['Name', 'ViruthuName', 'Viruthu Date','TotalAmount','Action'];
     },
      error=>{
        alert(JSON.stringify(error.error));
      });
   }
  toggle(filter?) {
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
    }
    applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  
}
