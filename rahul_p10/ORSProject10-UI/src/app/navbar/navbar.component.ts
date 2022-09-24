import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpServiceService} from '../http-service.service';
import { ServiceLocatorService} from '../service-locator.service';

import {TranslateService} from '@ngx-translate/core';
import { HttpClient} from '@angular/common/http'



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginId: string;
  userid : string;
 
  constructor(private translate: TranslateService, private route : ActivatedRoute, private httpService : HttpServiceService,private myservice: HttpClient ,private servicelocator : ServiceLocatorService) { 

    localStorage.setItem("locale","en");
    translate.setDefaultLang(localStorage.getItem("locale"));
  }

  changeLocale(locale:string){
    localStorage.setItem("locale",locale);
    this.translate.use(localStorage.getItem("locale"));
     console.log(locale);
   }

   public form = {

    error: false, //error 
    message: null, //error or success message
    firstName : null,
    data: { id: null, fname: null, lname : null, role: null, loginId : null }, //form data
    inputerror: {}, // form input error messages
    searchParams: {}, //search form
    searchMessage: null, //search result message
    list: [], // search list 
  
  };
  ngOnInit() {
    // var _self = this;
    // this.httpService.get("http://localhost:8080/Auth/menu",function (res){
      
    //   if(res.success){
    //     _self.form.list = res.result.list;
      
    //   }else{
    //     _self.form.error = false;
    //     _self.form.message = res.result.message;
    //   }
    //   console.log('FORM', _self.form);
    // });
  }

  forward(){
    this.userid = localStorage.getItem("userid");
    console.log(this.userid+'UID<<<<<<<<<')
    
    this.servicelocator.forward("/user/"+this.userid);
   
  }
  isLogin() {
    let check = localStorage.getItem('fname');
    if (check != "null" && check != null) {
      this.form.data.fname = localStorage.getItem("fname");
      this.form.data.lname = localStorage.getItem("lname");
      this.form.data.loginId = localStorage.getItem("loginId");
      this.form.data.role = localStorage.getItem("role"); 


      console.log(this.form.data.fname+'fname is ---->>>');
      return true;
    } else {
      return false;
  }
  }

  logout() {
    var _self = this;

    console.log('Logout', this.form);

    // let url = this.servicelocator.endpoints.getEndpoint(this.servicelocator.endpoints.AUTH, "logout");

    // this.servicelocator.httpService.post(url, this.form, function (res, error) {

    //   if (error) {
    //     alert(error);
    //     return;
    //   }
     /* _self.loginId = "null";
      localStorage.removeItem("token");
      localStorage.removeItem("fname");
      localStorage.removeItem("lname");
      localStorage.removeItem("loginId");
      localStorage.removeItem("role")



      console.log(localStorage.getItem("JSESSIONID")+'after logout jsessionid');
    

      console.log("After logout-------------");
      this.form.message = "Logout Successfully";
     _self.servicelocator.router.navigateByUrl('/login');*/
     _self.httpService.get("http://localhost:8080/User/logout",function (res){
      
      if(res.success){
         localStorage.removeItem("JSESSIONID");
         localStorage.removeItem("token");
         localStorage.removeItem("fname");
         localStorage.removeItem("lname");
         localStorage.removeItem("loginId");
         localStorage.removeItem("role");
         _self.servicelocator.router.navigateByUrl('/login');
         _self.httpService.logout=res.result.message;
        console.log('User logged out Successfully');
        
       }
       
     });


  }
}
