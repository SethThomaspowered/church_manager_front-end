import { Component, OnInit } from '@angular/core';
import { SearchPeopleService } from '../search-people.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  childrenResponse: boolean = false;
  parentsResponse: boolean = false;
  spouseResponse: boolean = false;
  status: number = 0;

  searchSubject = new Subject;
  person: any;
  peopleArray: Array<any> = [];
  field: string = "";
  search: any = "";

  id: number = 0;
  type: string = "";
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  emailAddress: string = "";
  phoneNumber: string = "";

  birthDate: string|null = "";
  anniversary: string = "";
  married: boolean = false;

  comments: string = "";
  deacon: boolean = false;
  joinDate: string = "";
  joinMethod: string = "";
  membershipEndDate: string = "";

  childId: number = 0;
  parentId: number = 0;
  spouseId: number = 0;




  constructor(private searchPeopleService: SearchPeopleService, private http: HttpClient) { }

  ngOnInit(): void {  }



  searchPeople(field: string, search: string){

    this.field = field;
    this.search = search;
    console.log(search);

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
    

    this.search='';
  }

  updateBasicInfo(id: number, firstName: string,
    middleName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
    type: string){
      console.log(firstName + " " + lastName);

      let personObject = [
        {
          "firstName":firstName,
          "middleName":middleName,
          "lastName":lastName,
          "emailAddress":emailAddress,
          "phoneNumber":phoneNumber,
          "type":type
        }
      ]

  }

  updateProfile(id: number, birthDate: string|null, married: boolean, anniversary: string|null){
    console.log(id)
  }

  updateMemberRecord(       
    id: number,
    deacon: boolean,
    joinDate: string|null,
    joinMethod: string|null,
    membershipEndDate: string|null,
    comments: string|null){
    console.log(id)
  }

  addChild(personId: number, childId: number){

    this.searchPeopleService.addChildObservable(personId, childId)
    .subscribe((response: any) => {
      console.log(response);
      console.log(`Status: ${response.status}`);
      this.status = response.status;

      this.searchPeople('id', personId.toString())

    })
  }

  removeChild(personId: number, childId: number){
    this.searchPeopleService.removeChildObservable(personId, childId)
    .subscribe((response: any) => {
      this.status = response.status;

      this.searchPeople('id', personId.toString())

    })
  }
  addParent(id: number){
    console.log(id);
  }
  removeParent(id: number){
    console.log(id);
  }

  addSpouse(id: number){
    console.log(id);
  }
  removeSpouse(){
    console.log('Remove');
  }

}
