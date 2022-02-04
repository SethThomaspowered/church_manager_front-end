import { Component, OnInit } from '@angular/core';
import { SearchGroupService } from '../search-group.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  status: number = 0;

  searchSubject = new Subject;
  group: any;
  groupsArray: Array<any> = [];
  field: string = "";
  search: any = "";

  id: number = 0;
  type: string = "";
  name: string = "";
  description: string = "";
  deleted: boolean = false;
  notes: string = "";
  staffSupervisor: any;
  leaders: any = [];
  members: any = [];

  nameNew: string ="";
  typeNew: string ="";
  descriptionNew: string ="";
  notesNew: string ="";

  memberId: number = 0;
  leaderId: number = 0;
  staffId: number = 0;


  constructor(private searchGroupService: SearchGroupService, private http: HttpClient) { }

  ngOnInit(): void {  }


  searchGroups(field: string, search: string){
    this.groupsArray = [];
    this.id = 0;
    this.type = "";
    this.name = "";
    this.description = "";
    this.notes = "";
    this.deleted = false;
    this.staffSupervisor = null;
    this.leaders = [];
    this.members = [];

    this.field = field;
    this.search = search;
    console.log(search);

    this.searchGroupService.searchGroupsObservable(this.field, this.search)
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


          if(this.group.deleted){
            this.deleted = this.group.deleted;
          } else {
            this.id = this.group.id;
            this.type = this.group.type;
            this.name = this.group.name;
            this.description = this.group.description;
            this.notes = this.group.notes;
            this.deleted = this.group.deleted;
            this.staffSupervisor = this.group.staffSupervisor;
            this.leaders = this.group.leaders;
            this.members = this.group.members;
          }
      }
      
      console.log(this.groupsArray)


      
    });
    

    this.search='';
  }


  addMember(groupId: number, memberId: number){
    this.searchGroupService.addMemberObservable(groupId, memberId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchGroups('id', groupId.toString())
    })
  }

  removeMember(personId: number, memberId: number){
    this.searchGroupService.removeMemberObservable(personId, memberId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchGroups('id', personId.toString())
    })
  }

  addLeader(groupId: number, leaderId: number){
    console.log(leaderId)
    this.searchGroupService.addLeaderObservable(groupId, leaderId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchGroups('id', groupId.toString())
    })
  }

  removeLeader(groupId: number, leaderId: number){
    this.searchGroupService.removeLeaderObservable(groupId, leaderId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchGroups('id', groupId.toString())
    })
  }

  addStaff(groupId: number, staffId: number){
    console.log(staffId)
    this.searchGroupService.addStaffObservable(groupId, staffId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchGroups('id', groupId.toString())
    })
  }

  removeStaff(groupId: number){
    this.searchGroupService.removeStaffObservable(groupId)
    .subscribe((response: any) => {
      this.status = response.status;
      this.searchGroups('id', groupId.toString())
    })
  }



  createGroup( 
    nameNew: string,
    typeNew: string,
    descriptionNew: string,
    notesNew: string
    ){
      let groupObject = {
          "name":nameNew,
          "type":typeNew,
          "description":descriptionNew,
          "notes":notesNew
        };

      this.searchGroupService.createGroupObservable(groupObject)
      .subscribe((response: any) => {
        this.status = response.status;
        let newId = response.body.id;
        this.searchGroups('id', newId.toString());
      })

      this.nameNew ="";
      this.typeNew ="";
      this.descriptionNew ="";
      this.notesNew ="";
  }

   updateGroupInfo(id: number, name: string, type: string, description:string, notes:string){
     console.log();

      let groupObject = {
          "name":name,
          "type":type,
          "description":description,
          "notes":notes
        };

      this.searchGroupService.updateGroupObservable(id, groupObject)
      .subscribe((response: any) => {
        this.status = response.status;
        this.searchGroups('id', id.toString())
      })
  }



}

