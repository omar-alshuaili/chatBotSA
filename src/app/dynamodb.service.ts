import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DynamodbService {

  constructor(private http:HttpClient) { }

  saveChat(chat:any){
    return this.http.post('https://z2qddldd80.execute-api.eu-west-1.amazonaws.com/prod',{chatBody:chat})
  }
}
