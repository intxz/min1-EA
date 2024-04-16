import { Injectable } from '@angular/core';
import { IOnline } from '../models/online';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class OnlineService {
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

    getState(findState : string){
        return this.http.get<IOnline>(this.url+'/state/'+findState, { headers: this.getHeaders() });
    }

    deleteState(deleteStateId : string) {
        return this.http.delete(this.url+'/state/'+ deleteStateId, { headers: this.getHeaders() });
    }

    updateState(editState : IOnline) {
        return this.http.put<IOnline>(this.url+'/state/'+ editState._id, editState.name_users, { headers: this.getHeaders() });
    }
  }