import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/* import {ConfirmationService} from 'primeng/primeng'; */
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
import * as $ from 'jquery';
/* import Swal from 'sweetalert2/dist/sweetalert2.js'; */
/* import 'sweetalert2/src/sweetalert2.scss'; */
import sweetAlert from 'sweetalert2';

@Component({
  selector: 'app-group-leads',
  templateUrl: './group-leads.component.html',
  styleUrls: ['./group-leads.component.css']
})
export class GroupLeadsComponent implements OnInit {

  id: any;
  valid: any;
  leads: any[];
  allLeads: any[];
  allLeadsTemp: any[];
  filterDropdown;
  Gname;
  token;
  cols: any[];
  selectedRows: number = 0;
  exportButton: boolean = false;
  firsttime: boolean = false;
  csvName;
  FromGPFilter;
  first = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private location: Location,
    private apiService: ApiService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['group_id'];
      this.FromGPFilter = params['filter_name'];
    });
    this.token = localStorage.getItem("token");
    this.cols = [
      { field: 'user_id', header: 'User ID' },
      { field: 'full_name', header: 'Full Name' },
      { field: 'first_name', header: 'First Name' },
      { field: 'last_name', header: 'Last Name' },
      { field: 'joined_date', header: 'Joined Facebook' },
      { field: 'ques_one', header: 'Question 1' },
      { field: 'ans_one', header: 'Answer 1' },
      { field: 'ques_two', header: 'Question 2' },
      { field: 'ans_two', header: 'Answer 2' },
      { field: 'ques_three', header: 'Question 3' },
      { field: 'ans_three', header: 'Answer 3' },
      { field: 'created_date', header: 'Date Added' }
    ];
  }

  ngOnInit(): void {
    this.firsttime = true
    this.spinner.show();
    this.apiService.getParticularGroupLeads(this.id, this.token).subscribe((response: any) => {
      if (response["status"] == 404) {
        this.spinner.hide();
        console.log(response);
      } else if (response["status"] == 200) {
        this.leads = response["allLeads"];
        this.allLeadsTemp = response["allLeads"];
        $("li#allTime").addClass("link");
        //this.fiterGroupdata("This month");
        this.spinner.hide();
        console.log(response);
      }
    }, (err) => {
      console.log(err);
    })
  }

  paginate(event) {
    this.first = event.first;
  }

  filterLeadsAccGroups(groupname) {
    this.first = 0;
    this.spinner.show();
    this.apiService.allLeads(this.token).subscribe((response: any) => {
      if (response["status"] == 404) {
        this.spinner.hide();
        console.log(response);
      } else if (response["status"] == 200) {
        this.allLeads = response.allLeads;
        this.allLeadsTemp = response.allLeads;
        var name = groupname;
        this.Gname = name;
        this.csvName = this.Gname + "-leads" + " (This month)";
        var id = this.id;
        var array = this.allLeadsTemp
        this.leads = this.allLeadsTemp.filter(function (item) {
          if (name == "All Groups") {
            return array;
          }
          return item.group_id == id;
        })
        if (this.firsttime == true) {
          var _filteroption = this.FromGPFilter ? this.FromGPFilter : "This month";
          this.onChange("", _filteroption);
          this.firsttime = false;
        } else {
          var filteroption = this.filterDropdown ? this.filterDropdown : "This month";
          this.onChange("", filteroption);
        }
        this.spinner.hide();
        console.log(response);
      }
    }, (err) => {
      console.log(err);
    })
  }

  fiterGroupdata(filterName) {
    this.first = 0;
    var array = this.allLeadsTemp
    var date = new Date();
    var groupId = this.id;
    var groupname = this.Gname ? this.Gname : "All Groups";
    var dayname = filterName ? filterName : "This month"
    this.csvName = groupname + "-leads" + " (" + dayname + ")";
    if (this.allLeadsTemp) {
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
      /*       else {
              if (groupname == "All Groups") {
                this.leads = this.allLeadsTemp;
              }
              else {
                this.leads = this.allLeadsTemp.filter(function (item) {
                  return groupId == item.group_id;
                })
              }
            } */
    }
  }

  onRowSelect(e) {
    setTimeout(() => {
      this.selectedRows = $("#group-leads tr.ui-state-highlight").length;
      if (this.selectedRows > 0) {
        this.exportButton = true;
      } else if (this.selectedRows == 0) {
        this.exportButton = false;
      }
    }, 1000);
  }

  onRowUnselect(e) {
    setTimeout(() => {
      this.selectedRows = $("#group-leads tr.ui-state-highlight").length;
      if (this.selectedRows > 0) {
        this.exportButton = true;
      } else if (this.selectedRows == 0) {
        this.exportButton = false;
      }
    }, 1000);
  }

  onChange(e, name) {
    $("li").removeClass("link");
    this.filterDropdown = name ? name : e.target.text ? e.target.text.trim() : "";
    if (this.filterDropdown) {
      //this.location.go(`${this.activatedRoute.url}?group_id=${this.id}&filter_name=${this.filterDropdown}`);
      const urlTree: any = this.router.createUrlTree([], {
        queryParams: { group_id: this.id, filter_name: this.filterDropdown },
        queryParamsHandling: 'merge',
        preserveFragment: true
      });
      this.location.go(urlTree);
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
      this.leads = this.allLeadsTemp;
    }
  }

  ans_one(textObject) {
    var arr = [];
    var arrTemp = [];
    var comment = "";
    var _class = "";
    arr.push(textObject.ans_one,textObject.ans_two,textObject.ans_three);
    if (arr.length > 0) {
      var tt =  arr.every(function (item) {
          arrTemp = [];
          if (item.includes("@")){
            var textObject1 = item.replace(' @', '@');
            var textObject1 = item.replace('@ ', '@');
            var _1 = textObject1.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            if (_1.length > 0) {
              comment = "";
              _class = "valid_ans";
              arrTemp.push(comment,_class);
              return false;
            } else {
              comment = "This member inputted a non-valid email address.";
              _class = "Notvalid_ans";
              arrTemp.push(comment,_class);
              return true;
            }
          } else {
            comment = "This member inputted a non-valid email address.";
            _class = "Notvalid_ans";
              arrTemp.push(comment,_class);
              return true;
          }
        })
        this.valid = arrTemp[0];
        var ___class = arrTemp[1];
        return ___class;
    }else{
      this.valid = "This member inputted a non-valid email address.";
      return "Notvalid_ans";
    }
  }

  deleteLeads(id, index) {
    sweetAlert.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteLeads({"id":id},this.token).subscribe((response: any) => {
          if (response["status"] == 404) {
            this.spinner.hide();
            console.log(response);
          } else if (response["status"] == 200) {
            this.leads.splice(index, 1);
            sweetAlert.fire(
              'Deleted!',
              'Your Lead has been deleted.',
              'success'
            )
            console.log(response);
          }
        }, (err) => {
          console.log(err);
        })
      }
    })
  }
}
