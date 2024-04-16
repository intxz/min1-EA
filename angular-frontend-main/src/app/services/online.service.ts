import { Injectable } from '@angular/core';
import { IOnline } from '../models/online';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    token: string | null = null;
    newURL: string = '';
  
    constructor(private http:HttpClient, private authService:AuthService) { }
  
    url: string = "http://127.0.0.1:3000";
    
    getToken() {
      this.token = this.authService.getToken();
    }
  
    getHeaders() {
      this.getToken();
      let headers = new HttpHeaders();
      headers = headers.set('x-access-token', this.token || '');
      return headers;
    }

    
  }