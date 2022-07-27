import { OrderSearch } from './../classes/order-search';
import { Order } from './../classes/order';
import { Basket } from 'src/app/shared/classes/Basket';
import { VerifyOtp } from './../classes/verify-otp';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthenticationService } from './authentication.service';
import { EMPTY, Observable } from 'rxjs';
import { Category } from '../classes/category';
import { Product } from '../classes/product';
import { Unit } from '../classes/unit';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL = environment.BASE_URL;

  //readonly ROOT_URL = '';
  url=null;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    /* this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    this.headers.append("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); */
  }
  login(uri: string,username,password) {
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, { username, password });
  }

  getImage(uri: string,imageName: string): Observable<Blob> {
    return this.http.get(`${this.ROOT_URL}/${uri}/${imageName}`, { responseType: 'blob' });
  }

  removeProductImage(uri: string, id: any, imageName: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}/${id}/${imageName}`);
  }

  getProductImagesById(uri: string,id: number): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/${uri}/${id}`); /* , { responseType: 'blob' } */
  }

  saveProduct(product: any, images: any) {
    this.url = this.ROOT_URL+"/product";
    return this.http.post<any>(this.url, product);//, {headers: this.headers}
  }

  getProduct (id: any): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/product/${id}`);
  }

  putProduct (id: any, product: any): Observable<any> { console.log("updatimg....pppprrr");
    return this.http.put(`${this.ROOT_URL}/product`, product);
  }

  deleteProduct (id: any) {
    return this.http.delete(`${this.ROOT_URL}/product/${id}`);
  }


  getAllProducts(): Observable<Product[]> {
    this.url = this.ROOT_URL+"/product";
    return this.http.get<Product[]>(this.url);
  }

  saveCategory(category: any) {
    this.url = this.ROOT_URL+"/category";
    return this.http.post<any>(this.url, category);//, {headers: this.headers}
  }
  getCategory (id: any): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/category/${id}`);
  }

  putCategory (id: any, category: any): Observable<any> {
    return this.http.put(`${this.ROOT_URL}/category`, category);
  }

  deleteCategory (id: any) {
    return this.http.delete(`${this.ROOT_URL}/category/${id}`);
  }


  getAllCategories(): Observable<Category[]> {
    this.url = this.ROOT_URL+"/category";
    return this.http.get<Category[]>(this.url);
  }

  saveUnit(unit: any) {
    this.url = this.ROOT_URL+"/unit";
    return this.http.post<any>(this.url, unit);//, {headers: this.headers}
  }
  getUnit (id: any): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/unit/${id}`);
  }

  putUnit (id: any, unit: any): Observable<any> {
    return this.http.put(`${this.ROOT_URL}/unit`, unit);
  }

  deleteUnit (id: any) {
    return this.http.delete(`${this.ROOT_URL}/unit/${id}`);
  }

  getAllUnits(): Observable<Unit[]> {
    this.url = this.ROOT_URL+"/unit";
    return this.http.get<Unit[]>(this.url);
  }

  getOtp(smsRequest: any) {
    this.url = this.ROOT_URL+"/getotp";
    return this.http.post<any>(this.url, smsRequest);//, {headers: this.headers}
  }

  verifyOtp(verifyOtp: VerifyOtp) {
    this.url = this.ROOT_URL+"/verifyotp";
    return this.http.post<any>(this.url, verifyOtp);//, {headers: this.headers}
  }

  registerUser(user: any) { console.log(user);
    this.url = this.ROOT_URL+"/register";
    return this.http.post<any>(this.url, user);//, {headers: this.headers}
  }

  addShippingAddress(address: any) {
    this.url = this.ROOT_URL+"/address";
    return this.http.post<any>(this.url, address);//, {headers: this.headers}
  }

  getAllAddresses(id: any) {
    this.url = this.ROOT_URL+"/address/user/"+id;
    return this.http.get<any>(this.url);//, {headers: this.headers}
  }

  getBasket(id: any): Observable<Basket> {
    //this.url = this.ROOT_URL+"/basket";
    this.url = this.ROOT_URL+"/basket/user/"+id;
    return this.http.get<Basket>(this.url);//, {headers: this.headers}
  }

  saveBasket(basket: Basket) {
    this.url = this.ROOT_URL+"/basket";
    return this.http.post<any>(this.url, basket);//, {headers: this.headers}
  }

  deleteBasketItem (id: any) {
    return this.http.delete(`${this.ROOT_URL}/basket/deleteItem/${id}`);
  }

  saveOrder(order: Order) {
    this.url = this.ROOT_URL+"/order";
    return this.http.post<any>(this.url, order);//, {headers: this.headers}
  }

  makePayment(paymentRequest: any) {
    this.url = this.ROOT_URL+"/pgredirect";
    return this.http.post<any>(this.url, paymentRequest);//, {headers: this.headers}
  }

  getPaytmResponce(parameters: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
    headers = headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');

    const byPassCORSHack = 'https://cors-escape.herokuapp.com/';
    this.url = environment.paytmUrl;

  return this.http.post<Basket>(this.url, parameters, {headers:headers})
      .pipe(catchError((error) => {
        console.warn(error)
        return EMPTY;
      }));

  }

  getOrders(orderSearch: OrderSearch) {
    this.url = this.ROOT_URL+"/order/search";
    return this.http.post<any>(this.url, orderSearch);//, {headers: this.headers}
  }
  getOrderss(id:any)
  {
    this.url=this.ROOT_URL+"/order/orderz/"+id;
    return this.http.get<any>(this.url);
  }

  getPageOrders(orderSearch: OrderSearch) {
    this.url = this.ROOT_URL+"/order/getPage/";
    console.log(this.url);
    return this.http.post<any>(this.url, orderSearch);//, {headers: this.headers}
  }
  getorders(){
    this.url=this.ROOT_URL+"/orders";
    return this.http.get<any>(this.url);
  }
  getbasket(id){
    this.url=this.ROOT_URL+"/basket/basketz/"+id;
    return this.http.get<any>(this.url);
  }
}
