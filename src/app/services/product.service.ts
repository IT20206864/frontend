import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { IProduct } from '../schema/product';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  post(data : any){
    console.log(data);
    return this.http.post<any>("http://localhost:3000/products/",data);
  }

  get(){
    return this.http.get<IProduct[]>("http://localhost:3000/products/");
  }

  update(data:any , id: number){
    return this.http.patch<any>(`http://localhost:3000/products/${id}` , data)
  }

  delete(id : number){
    return this.http.delete<IProduct>(`http://localhost:3000/products/${id}`);
  }
}
