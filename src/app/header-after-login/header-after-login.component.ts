import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { GroupListComponent } from '../group-list/group-list.component';
import { GroupLeadsComponent } from '../group-leads/group-leads.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';


@Component({
  selector: 'app-header-after-login',
  templateUrl: './header-after-login.component.html',
  styleUrls: ['./header-after-login.component.css']
})
export class HeaderAfterLoginComponent implements OnInit {

  token;
  groups;
  groupId;
  partocularGroup;
  particularGroupName;
  groupDropdown;
  filtername;
  name;
  billinURl:boolean=false;

  constructor(
    private groupComponent: GroupListComponent,
    private spinner: NgxSpinnerService,
    private groupLeadsComponent: GroupLeadsComponent,
    private dashboardComponent: DashboardComponent,
    private router: Router,
    private cookie: CookieService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.name = localStorage.getItem("name");
    this.particularGroupName = '';
    this.token = localStorage.getItem("token");
    this.activatedRoute.queryParams.subscribe(params => {
      this.groupId = params['group_id'];
      this.filtername = params['filter_name'];
      localStorage.setItem("groupId",this.groupId);
    });
  }

  ngOnInit(): void {
    if(this.router.url == '/billing' || this.router.url == '/groupList'){
      this.billinURl = true;
      $("li#billing").addClass("link");
    }
    this.verifyUserToken(true);
    setInterval(() => {
      this.verifyUserToken();
    }, 7 * 60000);    
  }


  verifyUserToken(loadList = false){
    this.spinner.show();
    var tokenTemp = localStorage.getItem("token");
    console.log("before "+tokenTemp);
      this.apiService.refreshToken(tokenTemp).subscribe((response: any) => {
        if (response["status"] == 404) {
          localStorage.removeItem("token");
          this.router.navigate(['login']);
          this.spinner.hide();
          console.log(response);
        } else if (response["status"] == 200) {
          var token = response["token"];
          console.log("after "+token);
          localStorage.removeItem("token");
          localStorage.setItem("token",token);
          this.spinner.hide();
          console.log(response);
          if(loadList){
            this.groupList();
          }
        }
      }, (err) => {
        console.log(err);
      })
  }

  groupList() {
    this.spinner.show();
    var id = this.groupId;
    this.apiService.getGroupLeads(this.token).subscribe((response: any) => {
      if (response["status"] == 404) {
        console.log(response);
        this.spinner.hide();
      } else if (response["status"] == 200) {
        var temp = response["groupList"];
        temp.unshift({"group_id": "0", "group_name": "All Groups"});
        this.groups = temp;
        if (id) {
          this.partocularGroup = this.groups.filter(function (item) {
            return item.group_id == id;
          })
          var groupName = this.partocularGroup[0].group_name;
          this.particularGroupName = groupName;
          this.groupDropdown = id;
          this.onChange("",groupName);
          this.spinner.hide();
        }else{
          this.groupDropdown = 0;
          this.spinner.hide();
        }
      }
    }, (err) => {
      console.log(err);
    })
  }

  onChange(e, name) {
    if (e) {
      this.partocularGroup = this.groups.filter(function (item) {
        return item.group_id == e.target.value;
      })
      var groupName = this.partocularGroup[0].group_name;
    }
    var gName = name ? name : groupName;
    if (gName !== "All Groups") {
      var partocularGroupId = this.groups.filter(function (item) {
        return item.group_name == gName;
      })
      var groupId = partocularGroupId[0].group_id;
      var querryParam = { queryParams: { group_id: groupId ,filter_name:this.filtername} }
    }
    var pathname = this.router.url.split("?")[0];
/*     if ('/groupList' == pathname) {
      this.router.navigate(['/groupList'], querryParam);
      return this.groupComponent.filterGroup(gName);
    } */
    if ('/groupLeads' == pathname) {
      this.router.navigate(['/groupLeads'], querryParam);
      return this.groupLeadsComponent.filterLeadsAccGroups(gName);
    }
    else if ('/dashboard' == pathname) {
      this.router.navigate(['/dashboard'], querryParam);
      return this.dashboardComponent.filterGroup(gName);
    }
  }

  logout() {
    this.cookie.deleteAll();
    window.localStorage.clear();
    this.router.navigate(['login']);
  }
  onLiChange(e){
    $("li").removeClass("link");
    if (e.target.text == "Billing") {
      $("li#billing").addClass("link");
    }
    else if (e.target.text == "Help & Doc") {
      $("li#helpAndDoc").addClass("link");
    }
  }
}
