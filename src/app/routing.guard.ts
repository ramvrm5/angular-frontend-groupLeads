import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate():boolean {
    const currentUser = localStorage.getItem("token");
    if (currentUser) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      localStorage.removeItem("token");
      return false;
    }
  }
  
}
