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
//---------------------------------------------

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit 
{

  LoginForm:FormGroup;
  
  constructor(private FormBuilder:FormBuilder, private Router:Router,private AngularFireAuth:AngularFireAuth,
              private AFDB:AngularFireDatabase) 
  {

  }

  ngOnInit() 
  {
    this.LoginForm = this.FormBuilder.group({ 
                                              EmailId:[],
                                              Password:[]
                                            });
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
                         if(!this.LoginForm.valid)
                         {
                          // if(this.LoginForm.)
                          var Message  = "Invalid EmailId";
                         }
                         else
                         {
                          var Message  = "Unauthorized EmailId and Password";
                         }
                          console.log(Message);
                       }
               ).then(Info=>{
                              console.log("no error "+no_error);
                              console.log(Info);
                              if(no_error==true)
                              {
                                console.log("Inside");
                                this.Router.navigateByUrl("Profile");
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
}
