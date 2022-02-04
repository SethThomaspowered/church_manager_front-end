import { Component, OnInit } from '@angular/core';
import { SearchPeopleService } from '../search-people.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  church = {
    name: "Hometown Church",
    address1: "1303 S Shelby St",
    address2: "",
    city: "Louisville",
    state: "Kentucky",
    zip: "40217",
    areaCode: "502",
    exchange: "635",
    phone: "7053",
    email: "hometownchurch@domain.com",
    lat: 38.2339879,
    lon: -85.7421174

};
user = {

  first: "Jerome",
  last: "Allen",
  accessLevel: "Developer",
  loginStamps: ["2022.01.31", "2022.02.01", "2022.02.02", "2022.02.03", "2022.02.04"]
};
searchSubject = new Subject;
status: any;
isUpString: string = "";



  constructor(private searchPeopleService: SearchPeopleService, private http: HttpClient) { }

  ngOnInit(): void {
    
    this.isUp();
  }

  isUp(){
    this.searchPeopleService.isUpObservable()
    .subscribe((response: any) => {
      this.status = response.status;
      console.log(response);
      this.isUpString = response.body? "UP" : "DOWN";

    })
  }
  

}
