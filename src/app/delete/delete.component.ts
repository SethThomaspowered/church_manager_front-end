import { Component, OnInit } from '@angular/core';
import { SearchPeopleService } from '../search-people.service';
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

  status: number = 0;

  constructor(private searchPeopleService: SearchPeopleService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  searchPeople(field: string, search: string){

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






}
