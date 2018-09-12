import { Component, OnInit } from '@angular/core';

//--------- FormGroup and FormBuilder for reactive form --------
  import {FormGroup,FormBuilder} from '@angular/forms';
//----------------------------------------------------

//---------------- Routing ---------------
  import {Router} from '@angular/router';
//---------------------------------------

//--------------- Angular Firebase -------------
  import {AngularFireAuth} from 'angularfire2/auth';
  import { AngularFireDatabase } from 'angularfire2/database';
  import { ServicesService } from '../localhost_service/services.service';
//---------------------------------------------

//----------------- Synchronizing ----------------
  import { Synchronizing } from '../Synchronizing/Synchronizing';
//------------------------------------------------


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit 
{

  LoginForm:FormGroup;

  constructor(private FormBuilder:FormBuilder, private Router:Router,private AngularFireAuth:AngularFireAuth,
              private AFDB:AngularFireDatabase,private Local_Host_Service:ServicesService,private Synchronizing:Synchronizing) 
  {

  }

  ngOnInit() 
  {
    this.LoginForm = this.FormBuilder.group({ 
                                              EmailId:[],
                                              Password:[]
                                            });
    this.Synchronizing.Synchronizing();
  }


  Login(FormValues)
  {
    
    console.log("Enter login page");
    console.log(FormValues);
    var Email = FormValues.EmailId;
    var Password = FormValues.Password;
    
    if(Email!="" && Password!="")
    {
      let no_error = true;
      this.AngularFireAuth
         .auth
         .signInWithEmailAndPassword(FormValues.EmailId,FormValues.Password)
         .catch(info=>
                       {
                         no_error =false;
                         console.log(info);
                         
                         this.Local_Host_Service.Login(FormValues.EmailId,FormValues.Password)
                                .subscribe(result=>{
                                                        console.log(result);
                                                        if(result)
                                                        {
                                                          this.Go_To_Profile_Page();
                                                        }
                                                        else
                                                        {
                                                          console.log("Invalid EmailId and Password");
                                                        }
                                                   })
                       }
               ).then(Info=>{
                              console.log("no error "+no_error);
                              console.log(Info);
                              if(no_error==true)
                              {
                                console.log("Inside");
                                this.Go_To_Profile_Page();
                              }
                            }
                     )
    }
  }
  //-----------------Navigation -----------------
      Go_To_SignUp()
      {
        this.Router.navigateByUrl("SignUp");
      }
  //---------------------------------------------

  //-----------------Navigation -----------------
  Go_To_Profile_Page()
  {
    this.Router.navigateByUrl("Profile");
  }
//---------------------------------------------
}
