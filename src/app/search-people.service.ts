import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchPeopleService {

  constructor(private http: HttpClient) {}

    createAPIObservable(field: string, search: any){
      console.log(`service : ${search}`)
      if(field==="email"){
        return this.http.get(`https://church-mgr-proj.herokuapp.com/api/v1/people/email/'${search}'`,
        {observe: 'response'});  
        
      } else if(field==="phoneNumber") {
        return this.http.get(`https://church-mgr-proj.herokuapp.com/api/v1/people/phoneNumber/'${search}'`,
        {observe: 'response'}); 

      } else {
        console.log(`else : ${search}`);
        let url = `https://church-mgr-proj.herokuapp.com/api/v1/people/id/${search}`;
        console.log(url);
        return this.http.get(url,
          {observe: 'response'}); 
      }

     }

    updatePersonObservable(personId: number, body: any){
      return this.http.put<any>(`https://church-mgr-proj.herokuapp.com/api/v1/people/${personId}`, body,
      {observe: 'response'});  
    }

    updateProfileObservable(personId: number, body: any){
        return this.http.put<any>(`https://church-mgr-proj.herokuapp.com/api/v1/people/${personId}/profile`, body,
        {observe: 'response'});  
    }

    updateMemberRecordObservable(personId: number, body: any){
      return this.http.put<any>(`https://church-mgr-proj.herokuapp.com/api/v1/people/${personId}/memberRecord`, body,
      {observe: 'response'});  
  }

    addChildObservable(personId: number, childId:number){
        return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/people/${personId}/addChild/${childId}`,
        {observe: 'response'});  
     }

    removeChildObservable(personId: number, childId:number){
      return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/people/${personId}/removeChild/${childId}`,
      {observe: 'response'});  
    }

    addParentObservable(personId: number, parentId:number){
        return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/people/${personId}/addParent/${parentId}`,
        {observe: 'response'});  
    }

    removeParentObservable(personId: number, parentId:number){
      return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/people/${personId}/removeParent/${parentId}`,
      {observe: 'response'});  
    }

    addSpouseObservable(personId: number, spouseId:number){
      return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/people/${personId}/addSpouse/${spouseId}`,
      {observe: 'response'});  
    }

    removeSpouseObservable(personId: number){
      return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/people/${personId}/removeSpouse`,
      {observe: 'response'});  
    }
  
}
