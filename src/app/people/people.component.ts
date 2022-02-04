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
  deleted: boolean = false;

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

  firstNameNew: string ="";
  middleNameNew: string ="";
  lastNameNew: string ="";
  emailAddressNew: string ="";
  phoneNumberNew: string ="";
  typeNew: string ="";




  constructor(private searchPeopleService: SearchPeopleService, private http: HttpClient) { }

  ngOnInit(): void {  }



  searchPeople(field: string, search: string){
    this.id = 0;
    this.type = "";
    this.firstName = "";
    this.middleName = "";
    this.lastName = "";
    this.emailAddress = "";
    this.phoneNumber = "";
    this.deleted = false;
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


          if(this.person.deleted){
            this.deleted = this.person.deleted;
          } else {
          this.id = this.person.id;
          this.type = this.person.type;
          this.firstName = this.person.firstName;
          this.middleName = this.person.middleName;
          this.lastName = this.person.lastName;
          this.emailAddress = this.person.emailAddress;
          this.phoneNumber = this.person.phoneNumber;
          this.deleted = this.person.deleted;
        }
      }
      
      console.log(this.peopleArray)


      
    });
    

    this.search='';
  }

  createPerson( 
    firstNameNew: string,
    middleNameNew: string,
    lastNameNew: string,
    emailAddressNew: string,
    phoneNumberNew: string,
    typeNew: string
    ){
      let personObject = {
          "firstName":firstNameNew,
          "middleName":middleNameNew,
          "lastName":lastNameNew,
          "emailAddress":emailAddressNew,
          "phoneNumber":phoneNumberNew,
          "type":typeNew
        };

      this.searchPeopleService.createPersonObservable(personObject)
      .subscribe((response: any) => {
        this.status = response.status;
        let newId = response.body.id;
        this.searchPeople('id', newId.toString());
      })

      this.firstNameNew = "";
      this.middleNameNew = "";
      this.lastNameNew = "";
      this.emailAddressNew = "";
      this.phoneNumberNew = "";
      this.typeNew = "";
  }

  updateBasicInfo(
    id: number, 
    firstName: string,
    middleName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
    type: string
    ){
      let personObject = {
          "firstName":firstName,
          "middleName":middleName,
          "lastName":lastName,
          "emailAddress":emailAddress,
          "phoneNumber":phoneNumber,
          "type":type
        };

      this.searchPeopleService.updatePersonObservable(id, personObject)
      .subscribe((response: any) => {
        this.status = response.status;
        this.searchPeople('id', id.toString())
      })
  }

  updateProfile(id: number, birthDate: string|null, married: boolean, anniversary: string|null){
    let profileObject = {
      "birthDate":birthDate,
      "married":married,
      "anniversary":anniversary
    };

    this.searchPeopleService.updateProfileObservable(id, profileObject)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchPeople('id', id.toString())
    })
  }

  updateMemberRecord(id: number, deacon: boolean, joinDate: string|null, joinMethod: String|null, membershipEndDate: string|null, comments: string){
    let profileObject = {
      "deacon":deacon,
      "joinDate":joinDate,
      "joinMethod":joinMethod,
      "membershipEndDate":membershipEndDate,
      "comments":comments
    };

    this.searchPeopleService.updateMemberRecordObservable(id, profileObject)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchPeople('id', id.toString())
    })
  }

  addChild(personId: number, childId: number){
    this.searchPeopleService.addChildObservable(personId, childId)
    .subscribe((response: any) => {
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

  addParent(personId: number, parentId: number){
    console.log(parentId)
    this.searchPeopleService.addParentObservable(personId, parentId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchPeople('id', personId.toString())
    })
  }

  removeParent(personId: number, parentId: number){
    this.searchPeopleService.removeParentObservable(personId, parentId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchPeople('id', personId.toString())
    })
  }

  addSpouse(personId: number, spouseId: number){
    console.log(spouseId)
    this.searchPeopleService.addSpouseObservable(personId, spouseId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchPeople('id', personId.toString())
    })
  }

  removeSpouse(personId: number){
    this.searchPeopleService.removeSpouseObservable(personId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchPeople('id', personId.toString())
    })
  }

}
