import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from '../api.service';
import { UIChart } from "primeng/chart/chart";
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: UIChart;
  id: any;
  data: any;
  datasets: any[];
  totalThisYear;
  total: any;
  Gname: any;
  totalLeads: any;
  overAlltotalLeads: any;
  allLeadsTemp: any[];
  leads: any[];
  groupsTemp: any;
  groups: any[];
  dataTemp: any = [];
  filterDropdown: any;
  name;
  dateVariable;
  monthsArray;
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
  ) {
    this.monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'september', 'October', 'November', 'December']
  }

  ngOnInit(): void {
    this.spinner.show();
    var arrayList = JSON.parse(localStorage.getItem("groupList"));
    this.groupsTemp = arrayList;
    var name = localStorage.getItem("name").split(" ");
    this.name = name[0];
    var token = localStorage.getItem("token");
    this.apiService.allLeads(token).subscribe((response: any) => {
      if (response["status"] == 404) {
        console.log(response);
        this.spinner.hide();
      } else if (response["status"] == 200) {
        this.allLeadsTemp = response.allLeads;
        this.overAlltotalLeads = response.allLeads.length;
        this.totalLeads = response.allLeads.length > 0 ? false : true;
        setTimeout(function () {
          $("li#allTime").addClass("link");
          return;
        }, 1000);
        this.onChange("", "All Time");
        this.spinner.hide();
        console.log(response);
      }
    }, (err) => {
      console.log(err);
    })
  }

  filterGroup(groupname) {
    this.spinner.show();
    var name = groupname;
    this.Gname = name
    var array = this.groupsTemp
    this.groups = this.groupsTemp.filter(function (item) {
      if (name == "All Groups") {
        return array;
      }
      return item.group_name == name;
    })
    this.id = name == "All Groups" ? 0 : this.groups[0].group_id;
    var Groupname = this.filterDropdown ? this.filterDropdown : "All Time";
    this.onChange("", Groupname);
    this.spinner.hide();
    console.log(this.groups);
  }

  filterdataFromLeads(name) {
    var id = this.id;
    if (this.id) {
      this.leads = this.allLeadsTemp.filter(function (item) {
        return item.group_id == id;
      })
      this.fiterGroupdata(this.leads, name);
    } else {
      this.fiterGroupdata(this.allLeadsTemp, name);
    }
  }

  fiterGroupdata(arrayLeds, filterName) {
    var array = arrayLeds
    var date = new Date();
    if (filterName == "Today") {
      var Today = 0;
      var year_Today = moment(date).format("YYYY");
      var day_Today = moment(date).format("DD");
      if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
          var thisYear = moment(array[i].created_date).format("YYYY");
          var today = moment(array[i].created_date).format("DD");
          if (thisYear == year_Today) {
            if (today == day_Today) {
              Today += 1;
            }
          }
        }
      }
      this.total = Today;
      this.dateVariable = "Today";
      this.data = {
        labels: ['0', 'Today', '0'],
        datasets: [
          {
            label: 'Leads',
            data: [0, Today, 0],
            fill: false,
            borderColor: '#565656'
          }
        ]
      }
    }
    else if (filterName == "This month") {
      var one = 0;
      var two = 0;
      var three = 0;
      var four = 0;
      var five = 0;
      var six = 0;
      var seven = 0;
      var eight = 0;
      var nine = 0;
      var ten = 0;
      var eleven = 0;
      var tweleve = 0;
      var thirteen = 0;
      var fourteen = 0;
      var fifteen = 0;
      var sixteen = 0;
      var seventeen = 0;
      var eighteen = 0;
      var nineteen = 0;
      var twienty = 0;
      var twentyone = 0;
      var twentyTwo = 0;
      var twentyThree = 0;
      var twentyFour = 0;
      var twentyFive = 0;
      var twentysix = 0;
      var twentyseven = 0;
      var twentyEight = 0;
      var twentyNine = 0;
      var thirty = 0;
      var thirtyOne = 0;
      var year = moment(date).format("YYYY");
      var month = moment(date).format("MMMM");
      if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
          var thisYear = moment(array[i].created_date).format("YYYY");
          var thisMonth = moment(array[i].created_date).format("MMMM");
          var day = moment(array[i].created_date).format("DD");
          if (thisYear == year) {
            if (month == thisMonth) {
              if ('01' == day) {
                one += 1;
              }
              else if ('02' == day) {
                two += 1;
              }
              else if ('03' == day) {
                three += 1;
              }
              else if ('04' == day) {
                four += 1;
              }
              else if ('05' == day) {
                five += 1;
              }
              else if ('06' == day) {
                six += 1;
              }
              else if ('07' == day) {
                seven += 1;
              }
              else if ('08' == day) {
                eight += 1;
              }
              else if ('09' == day) {
                nine += 1;
              }
              else if ('10' == day) {
                ten += 1;
              }
              else if ('11' == day) {
                eleven += 1;
              }
              else if ('12' == day) {
                tweleve += 1;
              }
              else if ('13' == day) {
                thirteen += 1;
              }
              else if ('14' == day) {
                fourteen += 1;
              }
              else if ('15' == day) {
                fifteen += 1;
              }
              else if ('16' == day) {
                sixteen += 1;
              }
              else if ('17' == day) {
                seventeen += 1;
              }
              else if ('18' == day) {
                eighteen += 1;
              }
              else if ('19' == day) {
                nineteen += 1;
              }
              else if ('20' == day) {
                twienty += 1;
              }
              else if ('21' == day) {
                twentyone += 1;
              }
              else if ('22' == day) {
                twentyTwo += 1;
              }
              else if ('23' == day) {
                twentyThree += 1;
              }
              else if ('24' == day) {
                twentyFour += 1;
              }
              else if ('25' == day) {
                twentyFive += 1;
              }
              else if ('26' == day) {
                twentysix += 1;
              }
              else if ('27' == day) {
                twentyseven += 1;
              }
              else if ('28' == day) {
                twentyEight += 1;
              }
              else if ('29' == day) {
                twentyNine += 1;
              }
              else if ('30' == day) {
                thirty += 1;
              }
              else if ('31' == day) {
                thirtyOne += 1;
              }
            }
          }
        }
      }
      var _year = moment(date).format("YYYY");
      var _month = moment(date).format("MM");
      var daysInMonth = moment(_year + "-" + _month, "YYYY-MM").daysInMonth();
      if (daysInMonth == 31) {
        this.total = one + two + three + four + five + six + seven + eight + nine + ten + eleven + tweleve + thirteen + fourteen + fifteen + sixteen + seventeen + eighteen + nineteen + twienty + twentyone + twentyTwo + twentyThree + twentyFour + twentyFive + twentysix + twentyseven + twentyEight + twentyNine + thirty + thirtyOne;

        this.data = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
          datasets: [
            {
              label: 'Leads',
              data: [one, two, three, four, five, six, seven, eight, nine, ten, eleven, tweleve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twienty, twentyone, twentyTwo, twentyThree, twentyFour, twentyFive, twentysix, twentyseven, twentyEight, twentyNine, thirty, thirtyOne],
              fill: false,
              borderColor: '#565656'
            }
          ]
        }
      } else if (daysInMonth == 30) {
        this.total = one + two + three + four + five + six + seven + eight + nine + ten + eleven + tweleve + thirteen + fourteen + fifteen + sixteen + seventeen + eighteen + nineteen + twienty + twentyone + twentyTwo + twentyThree + twentyFour + twentyFive + twentysix + twentyseven + twentyEight + twentyNine + thirty;
        this.data = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          datasets: [
            {
              label: 'Leads',
              data: [one, two, three, four, five, six, seven, eight, nine, ten, eleven, tweleve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twienty, twentyone, twentyTwo, twentyThree, twentyFour, twentyFive, twentysix, twentyseven, twentyEight, twentyNine, thirty],
              fill: false,
              borderColor: '#565656'
            }
          ]
        }
      } else if (daysInMonth == 28) {
        this.total = one + two + three + four + five + six + seven + eight + nine + ten + eleven + tweleve + thirteen + fourteen + fifteen + sixteen + seventeen + eighteen + nineteen + twienty + twentyone + twentyTwo + twentyThree + twentyFour + twentyFive + twentysix + twentyseven + twentyEight;

        this.data = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
          datasets: [
            {
              label: 'Leads',
              data: [one, two, three, four, five, six, seven, eight, nine, ten, eleven, tweleve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twienty, twentyone, twentyTwo, twentyThree, twentyFour, twentyFive, twentysix, twentyseven, twentyEight],
              fill: false,
              borderColor: '#565656'
            }
          ]
        }
      } else if (daysInMonth == 29) {
        this.total = one + two + three + four + five + six + seven + eight + nine + ten + eleven + tweleve + thirteen + fourteen + fifteen + sixteen + seventeen + eighteen + nineteen + twienty + twentyone + twentyTwo + twentyThree + twentyFour + twentyFive + twentysix + twentyseven + twentyEight + twentyNine;

        this.data = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
          datasets: [
            {
              label: 'Leads',
              data: [one, two, three, four, five, six, seven, eight, nine, ten, eleven, tweleve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twienty, twentyone, twentyTwo, twentyThree, twentyFour, twentyFive, twentysix, twentyseven, twentyEight, twentyNine],
              fill: false,
              borderColor: '#565656'
            }
          ]
        }
      }
      this.dateVariable = "This Month";
    }
    else if (filterName == "Last 30 Days") {
      var one_months = false;
      var two_months = false;
      var firstmonth = 0;
      var _firstmonth = "";
      var secondmonth = 0;
      var _secondmonth = "";
      var _previousYear = moment(date).subtract(1, 'year').format("YYYY");
      var _year = moment(date).format("YYYY");
      _firstmonth = moment(date).format("MMMM");
      _secondmonth = moment(date).subtract(30, 'days').format("MMMM");
      var _copy1 = moment(date).format("DD MMMM");
      var _copy2 = moment(date).subtract(30, 'days').format("DD MMMM");
      if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
          var thisYear = moment(array[i].created_date).format("YYYY");
          var thismonth = moment(array[i].created_date).format("MMMM");
          if (thisYear == _year || _previousYear == thisYear) {
            if (_firstmonth == _secondmonth) {
              one_months = true;
              if (_firstmonth == thismonth) {
                firstmonth += 1;
              }
            } else {
              two_months = true;
              if (_firstmonth == thismonth) {
                firstmonth += 1;
              }
              else if (_secondmonth == thismonth) {
                secondmonth += 1;
              }
            }
          }
        }
      }
      this.dateVariable = "Last 30 Days";
      if (one_months == true) {
        this.total = firstmonth;
        this.data = {
          labels: ["", _copy1, ""],
          datasets: [
            {
              label: 'Leads',
              data: ["", firstmonth, ""],
              fill: false,
              borderColor: '#565656'
            }
          ]
        }
        console.log(this.total);
      } else if (two_months == true) {
        this.total = firstmonth + secondmonth;
        this.data = {
          labels: [_copy2, _copy1],
          datasets: [
            {
              label: 'Leads',
              data: [secondmonth, firstmonth],
              fill: false,
              borderColor: '#565656'
            }
          ]
        }
        console.log(this.total);
      }
    }
    else if (filterName == "Last 90 Days") {
      var three_months = false;
      var four_months = false;
      var firstmonth = 0;
      var _firstmonth = "";
      var secondmonth = 0;
      var _secondmonth = "";
      var thirdmonth = 0;
      var _thirdmonth = "";
      var fourmonth = 0;
      var _fourmonth = "";
      var _previousYear = moment(date).subtract(1, 'year').format("YYYY");
      var _year = moment(date).format("YYYY");
      _firstmonth = moment(date).format("MMMM");
      _secondmonth = moment(date).subtract(30, 'days').format("MMMM");
      _thirdmonth = moment(date).subtract(60, 'days').format("MMMM");
      _fourmonth = moment(date).subtract(90, 'days').format("MMMM");
      var _copy1 = moment(date).format("DD MMMM");
      var _copy2 = moment(date).subtract(90, 'days').format("DD MMMM");
      if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
          var thisYear = moment(array[i].created_date).format("YYYY");
          var thismonth = moment(array[i].created_date).format("MMMM");
          if (thisYear == _year || _previousYear == thisYear) {
            if (_firstmonth == _secondmonth) {
              three_months = true;
              if (_firstmonth == thismonth) {
                firstmonth += 1;
              }
              else if (_thirdmonth == thismonth) {
                thirdmonth += 1;
              }
              else if (_fourmonth == thismonth) {
                fourmonth += 1;
              }
            } else {
              four_months = true;
              if (_firstmonth == thismonth) {
                firstmonth += 1;
              }
              else if (_secondmonth == thismonth) {
                secondmonth += 1;
              }
              else if (_thirdmonth == thismonth) {
                thirdmonth += 1;
              }
              else if (_fourmonth == thismonth) {
                fourmonth += 1;
              }
            }
          }
        }
      }
      this.dateVariable = "Last 90 Days";
      if (three_months == true) {
        this.total = firstmonth + thirdmonth + fourmonth;
        this.data = {
          labels: [_copy2, _thirdmonth, _copy1,],
          datasets: [
            {
              label: 'Leads',
              data: [fourmonth, thirdmonth, firstmonth],
              fill: false,
              borderColor: '#565656'
            }
          ]
        }
        console.log(this.total);
      } else if (four_months == true) {
        this.total = firstmonth + secondmonth + thirdmonth + fourmonth;
        this.data = {
          labels: [_copy2, _thirdmonth, _secondmonth, _copy1],
          datasets: [
            {
              label: 'Leads',
              data: [fourmonth, thirdmonth, secondmonth, firstmonth],
              fill: false,
              borderColor: '#565656'
            }
          ]
        }
        console.log(this.total);
      }
    }
    else if (filterName == "This Year") {
      var January = 0;
      var February = 0;
      var March = 0;
      var April = 0;
      var May = 0;
      var June = 0;
      var July = 0;
      var August = 0;
      var September = 0;
      var October = 0;
      var November = 0;
      var December = 0;
      var year = moment(date).format("YYYY");
      if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
          var thisYear = moment(array[i].created_date).format("YYYY");
          var month = moment(array[i].created_date).format("MMMM");
          if (thisYear == year) {
            if ('January' == month) {
              January += 1;
            }
            else if ('February' == month) {
              February += 1;
            }
            else if ('March' == month) {
              March += 1;
            }
            else if ('April' == month) {
              April += 1;
            }
            else if ('May' == month) {
              May += 1;
            }
            else if ('June' == month) {
              June += 1;
            }
            else if ('July' == month) {
              July += 1;
            }
            else if ('August' == month) {
              August += 1;
            }
            else if ('September' == month) {
              September += 1;
            }
            else if ('October' == month) {
              October += 1;
            }
            else if ('November' == month) {
              November += 1;
            }
            else if ('December' == month) {
              December += 1;
            }
          }
        }
      }
      this.total = January + February + March + April + May + June + July + August + September + October + November + December;
      this.dateVariable = "{ this Year }";
      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'september', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Leads',
            data: [January, February, March, April, May, June, July, August, September, October, November, December],
            fill: false,
            borderColor: '#565656'
          }
        ]
      }
    }
    else if (filterName == "All Time") {
      var first = 0;
      var _currentYear = moment(date).format("YYYY");
      var firtYear = "";
      if (array.length > 0) {
         firtYear = moment(array[0].created_date).format("YYYY") == _currentYear?"":moment(array[0].created_date).format("YYYY");
        for (let i = 0; i < array.length; i++) {
          var thisYear = moment(array[i].created_date).format("YYYY");
          if (thisYear >= firtYear && thisYear <= _currentYear) {
            first += 1;
          }
        }
      }
      this.total = first;
      this.dateVariable = "All Time";
      this.data = {
        labels: [firtYear, _currentYear],
        datasets: [
          {
            label: 'Leads',
            data: ["", first, ""],
            fill: false,
            borderColor: '#565656'
          }
        ]
      }
    }
    else if (filterName == "Current Period") {

    }
  }

  onChange(e, name) {
    this.spinner.show();
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
      this.filterdataFromLeads(this.filterDropdown);
    } else {
      //this.leads = this.allLeadsTemp;
    }
    this.spinner.hide();
  }
}
