import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	API_URL = 'https://groupleads.net/secret/userdashboardapi/api.php?action=';
	constructor(private httpClient: HttpClient) { }

	loginUser(data) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		return this.httpClient.post(this.API_URL + 'login', data, { headers: headers });
	}

	forgetpassword(email) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		return this.httpClient.post(this.API_URL + 'forgotpassword', email, { headers: headers });
	}

	resetpassword(data) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		return this.httpClient.post(this.API_URL + 'resetpassword', data, { headers: headers });
	}

	allLeads(token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('token', token);
		return this.httpClient.get(this.API_URL + 'get_group_leads&group_id=0', { headers: headers });
	}

	getGroupLeads(token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('token', token);
		return this.httpClient.get(this.API_URL + 'get_group_list', { headers: headers });
	}
	
	getParticularGroupLeads(id,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('token', token);
		return this.httpClient.get(this.API_URL + 'get_group_leads&group_id='+id, { headers: headers });
	}
	
	refreshToken(token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('token', token);
		return this.httpClient.get(this.API_URL + 'refresh_token', { headers: headers });
	}
	
	billingDetails(token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('token', token);
		return this.httpClient.get(this.API_URL + 'get_user_details', { headers: headers });
	}	

	deleteLeads(id,token) {
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Accept', 'application/json');
		headers = headers.append('token', token);
		return this.httpClient.post(this.API_URL + 'delete_lead',id,{ headers: headers });
	}
}
