import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchGroupService {

  constructor(private http: HttpClient) {}

    searchGroupsObservable(field: string, search: any){
      console.log(`service : ${search}`)
      if(field==="type"){
        return this.http.get(`https://church-mgr-proj.herokuapp.com/api/v1/groups/type/'${search}'`,
        {observe: 'response'});  
        
      } else if(field==="name") {
        return this.http.get(`https://church-mgr-proj.herokuapp.com/api/v1/groups/name/'${search}'`,
        {observe: 'response'}); 

      } else {
        console.log(`else : ${search}`);
        let url = `https://church-mgr-proj.herokuapp.com/api/v1/groups/id/${search}`;
        console.log(url);
        return this.http.get(`https://church-mgr-proj.herokuapp.com/api/v1/groups/id/${search}`,
          {observe: 'response'}); 
      }

     }

  addMemberObservable(groupId: number, personId:number){
      return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/groups/${groupId}/addMember/${personId}`,
      {observe: 'response'});  
   }

  removeMemberObservable(groupId: number, personId:number){
    return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/groups/${groupId}/removeMember/${personId}`,
    {observe: 'response'});  
  }

  addLeaderObservable(groupId: number, personId:number){
      return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/groups/${groupId}/addLeader/${personId}`,
      {observe: 'response'});  
  }

  removeLeaderObservable(groupId: number, personId:number){
    return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/groups/${groupId}/removeLeader/${personId}`,
    {observe: 'response'});  
  }

  addStaffObservable(groupId: number, personId:number){
    return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/groups/${groupId}/addStaffSup/${personId}`,
    {observe: 'response'});  
  }

  removeStaffObservable(groupId: number){
    return this.http.put(`https://church-mgr-proj.herokuapp.com/api/v1/groups/${groupId}/removeStaff`,
    {observe: 'response'});  
  }

    
}
