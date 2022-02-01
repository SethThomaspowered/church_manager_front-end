import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchPeopleService {

  constructor(private http: HttpClient) {}

    createAPIObservable(field: string, search: string){
      if(field==="email"){
        return this.http.get(`https://church-mgr-proj.herokuapp.com/api/v1/people/email/'${search}'`);  
        
      } else {
        return this.http.get(`https://church-mgr-proj.herokuapp.com/api/v1/people/phoneNumber/'${search}'`);
        
      }

     }
  
}
