import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//-------------- For Http Services-----------------------
  import{HttpModule} from "@angular/http";
//------------------------------------------------------

//----------- For Reactive Forms -----------------
    import {ReactiveFormsModule} from "@angular/forms";
//-------------------------------------------

//----------------------Firebase Library----------------------
import{AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth'
import {AngularFireDatabaseModule} from 'angularfire2/database';
//-----------------------------------------------------------


//--------------- Pages ----------------------
  import { LoginPageComponent } from './login-page/login-page.component';
  import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
  import { ProfileComponent } from './profile/profile.component';
//--------------------------------------------

//-------------- Routing -------------------
    import{Routing} from './routing/routing'
//------------------------------------------

//-------------- Routing -------------------
import{Synchronizing} from './Synchronizing/Synchronizing'
//------------------------------------------


var config = {
  apiKey: "AIzaSyDYKWW2AvLTogIVjdezvTRjZGBWh1wFiDM",
  authDomain: "nueax-82290.firebaseapp.com",
  databaseURL: "https://nueax-82290.firebaseio.com",
  projectId: "nueax-82290",
  storageBucket: "nueax-82290.appspot.com",
  messagingSenderId: "769400406104"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpPageComponent,
    ProfileComponent
  ],
  
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Reactive Form Module
    HttpModule, // Form Http Service
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    Routing,Synchronizing
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
