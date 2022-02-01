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
  searchSubject = new Subject;
  person: any;
  field: string = "";
  search: string = "";

  id: number = 0;
  type: string = "";
  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  emailAddress: string = "";
  phoneNumber: string = "";

  birthDate: string = "";
  anniversary: string = "";
  married: boolean = false;

  comments: string = "";
  deacon: boolean = false;
  joinDate: string = "";
  joinMethod: string = "";
  membershipEndDate: string = "";




  constructor(private searchPeopleService: SearchPeopleService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.searchSubject
    // .pipe(debounceTime(750), distinctUntilChanged())
    // .subscribe(search => {
    //   console.log(this.field);
    //   console.log(search);
      

      
    //   this.searchPeopleService.createAPIObservable(this.field, this.search)
    //     .subscribe((response: any) => {
    //       console.log(response)
    //       this.person = response;
    //     });
      

    // });
  }



  searchPeople(field: string, search: string){
    this.field = field;
    this.search = search;

    this.searchPeopleService.createAPIObservable(this.field, this.search)
    .subscribe((response: any) => {
      console.log(response[0])
      this.person = response[0];

      this.id = this.person.id;
      this.type = this.person.type;
      this.firstName = this.person.firstName;
      this.middleName = this.person.middleName;
      this.lastName = this.person.lastName;
      this.emailAddress = this.person.emailAddress;
      this.phoneNumber = this.person.phoneNumber;
      
    });
    

    this.search='';
  }

  updatePeople(firstName: string,
    middleName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
    type: string){
      console.log(firstName + " " + lastName);

      // let updateObject = [
      //   "person" : {
      //     "firstName":firstName,
      //     "middleName":middleName,
      //     "lastName":lastName,
      //     "emailAddress":emailAddress,
      //     "phoneNumber":phoneNumber,
      //     "type":type
      //   },
      //   "profile" : {
      //     "firstName":firstName,
      //     "middleName":middleName,
      //     "lastName":lastName,
      //     "emailAddress":emailAddress,
      //     "phoneNumber":phoneNumber,
      //     "type":type
      //   },
      //   "memberRecord" : {
      //     "firstName":firstName,
      //     "middleName":middleName,
      //     "lastName":lastName,
      //     "emailAddress":emailAddress,
      //     "phoneNumber":phoneNumber,
      //     "type":type
      //   }
      // ]

  }





}
