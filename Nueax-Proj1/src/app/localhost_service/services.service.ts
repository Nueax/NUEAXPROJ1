import { Injectable } from '@angular/core';

import {Http} from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _http:Http) { }

  public SignUp(FormValues)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/SignUp.php",FormValues).map(res=>res.json());
  }

  public Login(FormValues)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/SignUp.php",FormValues).map(res=>res.json());
  }

  public Profile(FormValues)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/Profile.php",FormValues).map(res=>res.json());
  }

  public Get_LocalHost_Time_Stamp(Email_Id)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/Get_TimeStamp.php",{"EmailId":Email_Id}).map(res=>res.json());
  }

  public Get_Data_From_LocalHost(Email_Id)
  {
    return this._http.post("http://localhost:8080/APIs/Nueax/Get_LocalHost_Data.php",{"EmailId":Email_Id}).map(res=>res.json());
  }
  
}
