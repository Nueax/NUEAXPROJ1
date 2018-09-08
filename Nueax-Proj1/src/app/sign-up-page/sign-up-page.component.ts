import { Component, OnInit } from '@angular/core';

//---- FormGroup and FormBuilder ----
  import { FormGroup, FormBuilder } from '@angular/forms'
//------------------------------------

//---- Add sign up service for LOCALHOST ----
  import { ServicesService } from '../localhost_service/services.service';
//-------------------------------------------

//---------- Angular Firebase ------------------
  import {AngularFireAuth} from 'angularfire2/auth';
  import { AngularFireDatabase } from 'angularfire2/database';
//----------------------------------------------

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit 
{
  SignUpForm:FormGroup; // FORM NAME

  constructor(private FormBuilder:FormBuilder,private Localhost_Service:ServicesService,private AngularFireAuth:AngularFireAuth,
              private AFDB:AngularFireDatabase ) { }

  ngOnInit() 
  {
    this.SignUpForm = this.FormBuilder.group({
                                                  FirstName:[],
                                                  LastName:[],
                                                  Contact:[],
                                                  EmailId:[],
                                                  Password:[],
                                              })
  }

  
 Firebase_SignUp(FormValues)
  {
    //Firebase SignUp
    if(this.SignUpForm.valid)
    {
      var no_error = true;
      this.AngularFireAuth.auth.createUserWithEmailAndPassword(FormValues.EmailId,FormValues.Password)
         .catch(
                 Info=>{
                          //this.Sign_Up_Error_Message(Info.message);
                          console.log(Info.message);
                          no_error=false;
                       }
               ).then(Info=>{
                                if(no_error==true)
                               {
                                 console.log("SignUp Sucessfully")
                               }
                            }
                      );
    }
  }
}


