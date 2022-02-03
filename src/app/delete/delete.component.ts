import { Component, OnInit } from '@angular/core';
import { SearchPeopleService } from '../search-people.service';
import { SearchGroupService } from '../search-group.service';
import { Subject } from 'rxjs';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  searchSubject = new Subject;
  person: any;
  group: any;
  peopleArray: Array<any> = [];
  groupsArray: Array<any> = [];
  field: string = "";
  search: any = "";
  Gfield: string = "";
  Gsearch:string = "";

  id: number = 0;
  type: string = "";
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  emailAddress: string = "";
  phoneNumber: string = "";

  Gid: number = 0;
  Gtype: string = "";
  Gname: string  = "";
  Gdescription: string = "";
  Gnotes: string = "";
  Gdeleted: boolean = false;

  status: number = 0;

  constructor(private searchGroupService: SearchGroupService, private searchPeopleService: SearchPeopleService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  searchPeople(field: string, search: string){
      this.peopleArray = [];
      this.field = field;
      this.search = search;
      this.searchPeopleService.createAPIObservable(this.field, this.search)
      .subscribe((response: any) => {
      console.log(response);
      console.log(`Status: ${response.status}`);
      this.status = response.status;
      
        if(response.body[1]){
          this.peopleArray = response.body;
          
        } else {
        
          if(response.body[0]){
            this.person = response.body[0];  
          } else {
            this.person = response.body;
          }

          this.id = this.person.id;
          this.type = this.person.type;
          this.firstName = this.person.firstName;
          this.middleName = this.person.middleName;
          this.lastName = this.person.lastName;
          this.emailAddress = this.person.emailAddress;
          this.phoneNumber = this.person.phoneNumber;
      }
    
      console.log(this.peopleArray)
    });
  }


  deletePerson(personId: number){
    this.searchPeopleService.deletePersonObservable(personId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchPeople('id', personId.toString())
    })
  }



  searchGroups(Gfield: string, Gsearch: string){
    this.groupsArray = [];
    this.Gfield = Gfield;
    this.Gsearch = Gsearch;
    console.log(Gsearch);

    this.searchGroupService.searchGroupsObservable(this.Gfield, this.Gsearch)
    .subscribe((response: any) => {
      console.log(response);
      console.log(`Status: ${response.status}`);
      this.status = response.status;
      
        if(response.body[1]){
          this.groupsArray = response.body;
          
        } else {
        
          if(response.body[0]){
            this.group = response.body[0];  
            console.log(this.group.name);
          } else {
            this.group = response.body;
          }

          this.Gid = this.group.id;
          this.Gtype = this.group.type;
          this.Gname = this.group.name;
          this.Gdescription = this.group.description;
          this.Gnotes = this.group.notes;
          this.Gdeleted = this.group.deleted;
      }
      
      console.log(this.groupsArray)


      
    });
    

    this.search='';
  }


  deleteGroup(groupId: number){
    this.searchGroupService.deleteGroupObservable(groupId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchGroups('id', groupId.toString())
    })
  }






}
