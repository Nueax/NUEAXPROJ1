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

//------------------NetworkConnection -----------------
  import{Synchronizing} from '../Synchronizing/Synchronizing'
//----------------------------------------------------

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  ProfileForm:FormGroup; // FORM NAME

  constructor(private FormBuilder:FormBuilder,private AngularFireAuth:AngularFireAuth,
              private AFDB:AngularFireDatabase,private Localhost_Service:ServicesService,
              private Synchronizing:Synchronizing) { }

  ngOnInit() 
  {
    

    this.ProfileForm = this.FormBuilder.group({
                                                  FirstName:[],
                                                  LastName:[],
                                                  Contact:[],
                                                  EmailId:[],
                                                  DOB:[],
                                                  Hobbies:[]
                                              })
    this.Synchronizing.Synchronizing();                                          
  }

  //FUNCTION FOR SIGNING UP
  Profile_Update(FormValues)
  {  
    this.Localhost_Service.Profile(FormValues).subscribe(res=>{
                                                                console.log(res);
                                                              });
    this.Firebase_Data_Insertion(FormValues);                                                            
  }

  
  Firebase_Data_Insertion(Form_Values)
  {
    console.log(Form_Values);
   
    var TimeStamp = Date();
    var Uid = this.AngularFireAuth.auth.currentUser.uid;
    var ref = this.AFDB.database.ref("Signup").child(Uid);
    ref.set(  
            { 
              First_Name: Form_Values.FirstName,
              Last_Name: Form_Values.LastName, 
              Contact:Form_Values.Contact,
              Email_Id: Form_Values.EmailId, 
              DOB:Form_Values.DOB,
              Hobbies:Form_Values.Hobbies,
              TimeStamp: TimeStamp
            }
           )
  }
}

