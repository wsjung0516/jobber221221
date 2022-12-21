import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3333/api/v1';
  constructor(private http: HttpClient) {}
  headers = { 'content-type': 'application/json'}; // 'Accept': 'application/json'
  getUsers(skip: number, take: number, orderBy?: any, where?: any): Observable<User[]> {
    let url: string;
    const dat = {data: where};
    const whereData = JSON.stringify(dat);
    const order = JSON.stringify(orderBy);
    // console.log('whereData: ', whereData, where);

    if( where && whereData){
      url = `${this.baseUrl}/user?skip=${skip}&take=${take}&orderBy=${order}&where=${whereData}`;
    }
    else{
      url = `${this.baseUrl}/user?skip=${skip}&take=${take}&orderBy=${order}`;
    }

    return this.http.get(url).pipe(
      map((data: any) => data )
    )
  }
  getUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`;

    return this.http.get(url).pipe(
      map((data: any) => data ),
      shareReplay(1)
    )
    // return this.http.get(url).pipe(
    //   map((data: any) => data )
    // )
  }
  getConditionalUserLength(where: any): Observable<User[]> {
    const dat = {data: where};
    const whereData = JSON.stringify(dat);
    const url = `${this.baseUrl}/user/length?where=${whereData}`;

    return this.http.get(url).pipe(
      map((data: any) => data ),
      shareReplay(1)
    )
  }
  createUser(data:Partial<User>): Observable<User> {
    const url = `${this.baseUrl}/user`;

    return this.http.post(url, {data}, {headers: this.headers}).pipe(
      map((data: any) => data ),
      shareReplay(1)
    )
  }
  updateUser(id: number, data: Partial<User>): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.http.patch(url, {data}, {observe: 'response'}).pipe(
      map((data: any) => data ),
      shareReplay(1)
    )
  }
  deleteUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`;

    return this.http.delete(url).pipe(
      map((data: any) => data ),
      shareReplay(1)
    )
  }
}
