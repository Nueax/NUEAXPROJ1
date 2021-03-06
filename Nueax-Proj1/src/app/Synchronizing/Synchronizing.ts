import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ServicesService} from "../localhost_service/services.service"

//---------- Angular Firebase ------------------
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//----------------------------------------------


@NgModule({

 imports: [
            CommonModule,
          ],
 exports: [],
 declarations: []

})

export class Synchronizing
{
    
    private Uid:any;
    
    constructor(private Local_Host_Service:ServicesService,private AngularFireAuth:AngularFireAuth,
                private AFDB:AngularFireDatabase,private LocalHostData:ServicesService){}
    
    Synchronizing() 
    {
        this.Get_Local_Host_SignUp_Info();
        console.log("check");
        var User = this.AngularFireAuth.auth.currentUser;
        if(User!=null)
        {
            this.Uid = this.AngularFireAuth.auth.currentUser.uid;
            console.log("Null");
            this.Get_Firebase_TimeStamp();
        }
    }

    Get_Local_Host_SignUp_Info()
    {
        this.Local_Host_Service.Get_EmailId_Password_From_LocalHost()
            .subscribe(Email_Password_Arr=>{
                                                for(var i=0;i<Email_Password_Arr.length;i++)
                                                this.SignUp_Synchronisation(Email_Password_Arr[i]["EmailId"],Email_Password_Arr[i]["Password"]);
                                           })        
    }

    SignUp_Synchronisation(EmailId,Password)
    {
        var no_error;
        this.AngularFireAuth.auth.createUserWithEmailAndPassword(EmailId,Password)
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


    Get_Firebase_TimeStamp()
    {
        var Firebase = this.AFDB.database.ref('Signup').child(this.Uid).child("TimeStamp");
        Firebase.once('value').then(snapshot=>{
                                            var Firebase_TimeStamp = snapshot.val();
                                            var Email_Id = this.AngularFireAuth.auth.currentUser.email;
                                            this.Get_LocalHost_TimeStamp(Email_Id,Firebase_TimeStamp);    
                                         }
                                         
                              );
    }

    Get_LocalHost_TimeStamp(Email_Id,Firebase_TimeStamp)
    {
        this.Local_Host_Service.Get_LocalHost_Time_Stamp(Email_Id)
        .subscribe(LocalHost_Time_Stamp=>{
                            console.log(Firebase_TimeStamp);
                            console.log(LocalHost_Time_Stamp[1]);
                            this.Compare_LH_FB_TimeStamp(Firebase_TimeStamp,LocalHost_Time_Stamp[1],Email_Id);
                        })
    }

    Compare_LH_FB_TimeStamp(Firebase_TimeStamp,LocalHost_Time_Stamp,Email_Id) 
    {
        if(Firebase_TimeStamp!=null || LocalHost_Time_Stamp)
        {
            console.log("Null check");
            
            if(Firebase_TimeStamp==null)
            {
                this.Get_LocalhostData(Email_Id,LocalHost_Time_Stamp);
            }
            else
            {
                Firebase_TimeStamp = new Date(Firebase_TimeStamp).getTime()/1000;    
                if(Firebase_TimeStamp!=LocalHost_Time_Stamp)
                {
                    this.Get_LocalhostData(Email_Id,LocalHost_Time_Stamp);
                }
            }
        }
    }

    Get_LocalhostData(Email_Id,LocalHost_Time_Stamp)
    {
        this.LocalHostData.Get_Data_From_LocalHost(Email_Id)
            .subscribe(LocalHost_Data=>{
                                            this.Send_To_Firebase(LocalHost_Data,LocalHost_Time_Stamp);            
                                       }
                      );
    }

    Send_To_Firebase(LocalHost_Data,LocalHost_Time_Stamp)
    {
        console.log(LocalHost_Data);
        console.log(LocalHost_Data[1]["FirstName"]);
        var Firebase = this.AFDB.database.ref("Signup").child(this.Uid);
        Firebase.set(  
                        { 
                            First_Name: LocalHost_Data[1]['FirstName'],
                            Last_Name: LocalHost_Data[1]['LastName'], 
                            Contact:LocalHost_Data[1]['Contact'],
                            Email_Id: LocalHost_Data[1]['EmailId'], 
                            DOB:LocalHost_Data[1]['DOB'],
                            Hobbies:LocalHost_Data[1]['Hobbies'],
                            TimeStamp: LocalHost_Time_Stamp
                        }
                    )        
    }
}