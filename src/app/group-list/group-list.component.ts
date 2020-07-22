import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups: any[];
  groupsTemp: any[];
  leads: any[];
  allLeadsTemp: any[];
  cols: any[];
  search: any;
  Gname;
  Nogroup:boolean=false;
  id;
  filterDropdown;
  token;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    this.token = localStorage.getItem("token");
    this.cols = [
      { field: 'group_name', header: 'Group Name' },
      { field: 'count', header: 'Total Leads Captured' },
      { field: 'lastUpdate', header: 'Date Last Captured' },
    ];
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['group_id'];
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    var token = localStorage.getItem("token");
    this.apiService.getGroupLeads(token).subscribe((response: any) => {
      if (response["status"] == 404) {
        console.log(response);
      } else if (response["status"] == 200) {
        let tempGroups = response["groupList"];
        console.log(tempGroups)
        this.groups = tempGroups;
        this.groupsTemp = tempGroups;
        if(!this.groupsTemp){
          this.Nogroup = true;
          $(".main").addClass('no-groups');
        } else {
          $(".main").removeClass('no-groups');
        }
        this.allLeads()
        this.spinner.hide();
        console.log(response);
      }
    }, (err) => {
      console.log(err);
    })
  }

  fiterdata(array) {
    this.spinner.show();
    var groupname = this.Gname ? this.Gname : "All Groups";
    if (this.groups) {
      if (groupname == "All Groups") {
        for (let i = 0; i < this.groups.length; i++) {
          this.groups[i].count = "0";
          var count = 0;
          for (let j = 0; j < array.length; j++) {
            if (this.groups[i].group_id == array[j].group_id) {
              count += 1;
              this.groups[i].count = count.toString();
            }
          }
        }
        this.spinner.hide();
      } else {
        for (let i = 0; i < this.groups.length; i++) {
          this.groups[i].count = "0";
          for (let j = 0; j < array.length; j++) {
            var count = 0;
            count += j + 1;
            this.groups[i].count = count.toString();
          }
        }
      }
    }
    this.spinner.hide();
  }

  allLeads() {
    this.apiService.getParticularGroupLeads(this.id, this.token).subscribe((response: any) => {
      if (response["status"] == 404) {
        this.spinner.hide();
        console.log(response);
      } else if (response["status"] == 200) {
        this.allLeadsTemp = response["allLeads"];
        $("li#allTime").addClass("link");
        this.onChange("","All Time");
        this.spinner.hide();
        console.log(response);
      }
    }, (err) => {
      console.log(err);
    })
  }

  filterGroup(groupname) {
    var name = groupname;
    this.Gname = name
    var array = this.groupsTemp
    this.groups = this.groupsTemp.filter(function (item) {
      if (name == "All Groups") {
        return array;
      }
      return item.group_name == name;
    })
    console.log(this.groups);
  }

  fiterGroupdata(filterName) {
    var array = this.allLeadsTemp
    var date = new Date();
    var groupId = this.id;
    var groupname = this.Gname ? this.Gname : "All Groups";
    if (filterName == "Today") {
      this.leads = this.allLeadsTemp.filter(function (item) {
        if (groupname == "All Groups") {
          var today = moment(date).format("DD/YYYY");
          var todayFromData = moment(item.created_date).format("DD/YYYY");
          return today == todayFromData;
        }
        else if (groupId == item.group_id) {
          var today = moment(date).format("DD/YYYY");
          var todayFromData = moment(item.created_date).format("DD/YYYY");
          return today == todayFromData;
        }
      })
    }
    else if (filterName == "This month") {
      this.leads = this.allLeadsTemp.filter(function (item) {
        if (groupname == "All Groups") {
          var thisMonth = moment(date).format("MM/YYYY");
          var thisMonthFromData = moment(item.created_date).format("MM/YYYY");
          return thisMonth == thisMonthFromData;
        }
        else if (groupId == item.group_id) {
          var thisMonth = moment(date).format("MM/YYYY");
          var thisMonthFromData = moment(item.created_date).format("MM/YYYY");
          return thisMonth == thisMonthFromData;
        }
      })
    }
    else if (filterName == "Last 30 Days") {
      this.leads = this.allLeadsTemp.filter(function (item) {
        if (groupname == "All Groups") {
          var last30Day = moment(date).subtract(30, 'days').format("MM/DD/YYYY");
          var last30DayFromData = moment(item.created_date).format("MM/DD/YYYY");
          var diff = moment(last30DayFromData).diff(moment(last30Day), 'days');
          var comparison = diff < 30
          return comparison == true;
        }
        else if (groupId == item.group_id) {
          var last30Day = moment(date).subtract(30, 'days').format("MM/DD/YYYY");
          var last30DayFromData = moment(item.created_date).format("MM/DD/YYYY");
          var diff = moment(last30DayFromData).diff(moment(last30Day), 'days');
          var comparison = diff < 30
          return comparison == true;
        }
      })
    }
    else if (filterName == "Last 90 Days") {
      this.leads = this.allLeadsTemp.filter(function (item) {
        if (groupname == "All Groups") {
          var last90Day = moment(date).subtract(90, 'days').format("MM/DD/YYYY");
          var last90DayFromData = moment(item.created_date).format("MM/DD/YYYY");
          var diff = moment(last90DayFromData).diff(moment(last90Day), 'days');
          var comparison = diff < 90
          return comparison == true;
        }
        else if (groupId == item.group_id) {
          var last90Day = moment(date).subtract(90, 'days').format("MM/DD/YYYY");
          var last90DayFromData = moment(item.created_date).format("MM/DD/YYYY");
          var diff = moment(last90DayFromData).diff(moment(last90Day), 'days');
          var comparison = diff < 90
          return comparison == true;
        }
      })
    }
    else if (filterName == "This Year") {
      this.leads = this.allLeadsTemp.filter(function (item) {
        if (groupname == "All Groups") {
          var thisYear = moment(date).format("YYYY");
          var thisYearFromData = moment(item.created_date).format("YYYY");
          return thisYear == thisYearFromData;
        }
        else if (groupId == item.group_id) {
          var thisYear = moment(date).format("YYYY");
          var thisYearFromData = moment(item.created_date).format("YYYY");
          return thisYear == thisYearFromData;
        }
      })
    }
    else if (filterName == "All Time") {
      if (groupname == "All Groups") {
        this.leads = this.allLeadsTemp;
      }
      else {
        this.leads = this.allLeadsTemp.filter(function (item) {
          return groupId == item.group_id;
        })
      }
    }
    else if (filterName == "Current Period") {

    } 
    else {
      if (groupname == "All Groups") {
        this.leads = this.allLeadsTemp;
      }
      else {
        this.leads = this.allLeadsTemp.filter(function (item) {
          return groupId == item.group_id;
        })
      }
    }
    this.fiterdata(this.leads);
  }

  onChange(e,name) {
    $("li").removeClass("link");
    this.filterDropdown = name ? name : e.target.text ? e.target.text.trim() : "";
    if (this.filterDropdown) {
      if (this.filterDropdown == "Today") {
        $("li#today").addClass("link");
      }
      else if (this.filterDropdown == "This month") {
        $("li#thisMonth").addClass("link");
      }
      else if (this.filterDropdown == "Last 30 Days") {
        $("li#last30Days").addClass("link");
      }
      else if (this.filterDropdown == "Last 90 Days") {
        $("li#last90Days").addClass("link");
      }
      else if (this.filterDropdown == "This Year") {
        $("li#thisYear").addClass("link");
      }
      else if (this.filterDropdown == "All Time") {
        $("li#allTime").addClass("link");
      }
      else if (this.filterDropdown == "Current Period") {
        $("li#currentPeriod").addClass("link");
      }
      this.fiterGroupdata(this.filterDropdown);
    } else {
      //this.leads = this.allLeadsTemp;
    }
  }
}
