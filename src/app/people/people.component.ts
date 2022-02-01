import { Component, OnInit } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  person: any = {firstName: ""};
  field: string = "";
  search: string = "";


  constructor() { }

  ngOnInit(): void {
  }






  searchPeople(field: String, search: string){
    // if(field==="email"){
    //   this.person = this.http.get(`https://church-mgr-proj.herokuapp.com/api/v1/people/email/'${search}'`);  private http: HttpClient
    //   console.log(this.person);
    // } else {
    //   this.person = this.http.get(`https://church-mgr-proj.herokuapp.com/api/v1/people/phoneNumber/'${search}'`);
    //   console.log(this.person);  
    // }
    this.person.firstName = "Nate";
    console.log(this.person);
  }





}
