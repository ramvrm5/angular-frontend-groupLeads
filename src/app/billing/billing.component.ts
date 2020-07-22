import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  planDetails;
  planFeatures: any[];
  token;
  billingIdBollean: boolean = false;
  billingId;
  expireDate;
  dayleft;
  upgradeURL;
  trial;
  planDetail: any = {};

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.token = localStorage.getItem("token");
    this.planDetails = [
      {
        "plan_id": "1", 
        "price":"$17",
        "save_text":"Save $107",
        "plan_Features": [
          "Easy To Use",
          "Up to 2 facebook groups",
          "Lifetime Software Updates",
          "Grow Email List On AUTOPILOT",
          "Facebook Group Automatic Approval",
          "No Monthly Zapier Fees",
          "Google Sheet Integration",
          "Grab All Members At A Go",
          "20 Autoresponders & CRMs",
          "Email Support",
          "Facebook Group Lead Generation",
          "Auto Message Declined Group Members",
          "Send Group Members’ Data To Three Places",
/*           "Easy to use",
          "No monthly zapier fees",
          "Up to 2 facebook groups",
          "Google sheet integration",
          "Email support",
          "Lifetime software updates",
          "Grab all members' details at a go!",
          "Email list grows like wild",
          "7 day FREE trial" */
        ]
      },
      {
        "plan_id": "2", 
        "price":"$97",
        "save_text":"You Never Have To Pay Again!",
        "plan_Features": [
          "Easy To Use",
          "Up to 4 facebook groups",
          "Lifetime Software Updates",
          "Grow Email List On AUTOPILOT",
          "Facebook Group Automatic Approval",
          "No Monthly Zapier Fees",
          "Google Sheet Integration",
          "Grab All Members At A Go",
          "20 Autoresponders & CRMs",
          "Email Support",
          "Facebook Group Lead Generation",
          "Auto Message Declined Group Members",
          "Send Group Members’ Data To Three Places",
/*           "Easy to use",
          "No monthly zapier fees",
          "Up to 4 facebook groups",
          "Google sheet integration",
          "Fast Email support",
          "Lifetime software updates",
          "Grab all members' details at a go!",
          "Email list grows like wild",
          "7 day FREE trial",
          "Access to exclusive FB group" */
        ]
      },
      {
        "plan_id": "3", 
        "price":"$297",
        "save_text":"",
        "plan_Features": [
          "Easy To Use",
          "Unlimited Facebook Groups",
          "Lifetime Software Updates",
          "Grow Email List On AUTOPILOT",
          "Facebook Group Automatic Approval",
          "No Monthly Zapier Fees",
          "Google Sheet Integration",
          "Grab All Members At A Go",
          "20 Autoresponders & CRMs",
          "Email Support",
          "Facebook Group Lead Generation",
          "Auto Message Declined Group Members",
          "Send Group Members’ Data To Three Places",
/*           "Easy to use",
          "No monthly zapier fees",
          "Unlimited facebook groups",
          "Google sheet integration",
          "Priority Email support",
          "Lifetime software updates",
          "Grab all members' details at a go!",
          "Email list grows like wild",
          "7 day FREE trial",
          "Access to exclusive FB group",
          "No monthly fees" */
        ]
      }
    ]
  }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.billingDetails(this.token).subscribe((response: any) => {
/*       response = {
        "status": 200,
        "userDetails": [
          {
            "userid": "20",
            "name": "Toluse ",
            "email": "dove.tolu@gmail.com",
            "plan_id": "2",
            "trial":"0",//1 for trial
            "expired_on": "2020-03-31"
          }
        ]
      } */
      this.upgradeURL = "https://groupleads.net/plans/?id="+response["userDetails"][0].userid;
      if (response["status"] == 404) {
        console.log(response);
      } else if (response["status"] == 200) {
        console.log(response);
        for (let i = 0; i < this.planDetails.length; i++) {
          if (response["userDetails"][0].plan_id == this.planDetails[i].plan_id) {
            this.planFeatures = this.planDetails[i].plan_Features;
            this.planDetail = this.planDetails[i];

            this.spinner.hide();
          } else if (response["userDetails"][0].plan_id == "3") {
            this.billingIdBollean = true;
            this.spinner.hide();
          }
        }
        this.billingId = response["userDetails"][0].plan_id;
        this.expireDate = moment(response["userDetails"][0].expired_on).format('MMMM Do YYYY');
        var expireDate = moment(response["userDetails"][0].expired_on).format('MM/DD/YYYY');
        var todaydate = moment(new Date).format('MM/DD/YYYY');
        this.dayleft = moment(expireDate).diff(moment(todaydate), 'days');
        this.trial = response["userDetails"][0].trial;
      }
    }, (err) => {
      console.log(err);
    })
  }

}
