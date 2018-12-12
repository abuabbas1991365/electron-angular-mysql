import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {
   private _userQLURL = "http://192.168.1.197:3000";

  constructor(private _http:HttpClient) { }

  register(body:any){

    return this._http.post(this._userQLURL+'/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  
  login(body:any){

    return this._http.post(this._userQLURL+'/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }  

addviruthu(title,ViruthuName,date,Address,Password,Mobileno,email){
  const body={
      title:title,
     ViruthuName:ViruthuName,
     date:date,
     Address:Address,
     Password:Password,
     Mobileno:Mobileno,
     email:email,
     Status:'Active',
  }
   return this._http.post(this._userQLURL+'/users/addviruthu',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  } 

addpersonviruthu(globaltitle,globalviruthu,globaldate,Address,persontotalamount,personname,globalemail){
  const body={
      globaltitle:globaltitle,
      globalviruthu:globalviruthu,
      Address:Address,
      persontotalamount:persontotalamount,
      personname:personname,
      globalemail:globalemail,
      globaldate:globaldate}
   return this._http.post(this._userQLURL+'/users/addpersonviruthu',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  } 
  viruthupersondetails(useradmin,date,email){
   const body={useradmin:useradmin,date:date,email:email}
   return this._http.post(this._userQLURL+'/users/personview',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }   

  getviruthu(){
    return this._http.get(this._userQLURL+'/users/getviruthu',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  totalcounofinformation(){
    return this._http.get(this._userQLURL+'/users/totalcountinformation',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  user(){
    return this._http.get(this._userQLURL+'/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
 dasdadaadsdsd(username,email){
   const body={
  username:username,
 email:email,

   }
    return this._http.post(this._userQLURL+'/users/meanactive',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  getpersondeleteinfo(email){
   const body={email:email}
    return this._http.post(this._userQLURL+'/users/deleteinfo',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  
  getpersoneditinfo(title,ViruthuName,date,Address,Password,Mobileno,Status,email){
    const body={
      title:title,
     ViruthuName:ViruthuName,
     date:date,
     Address:Address,
     Password:Password,
     Mobileno:Mobileno,
     email:email,
     Status:'Active',
   }
    return this._http.post(this._userQLURL+'/users/editpersoninfo',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
  logout(){
    return this._http.get(this._userQLURL+'/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

}
