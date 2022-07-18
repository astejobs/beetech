import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  readonly ROOT_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }
  saveBlog(data: any) {
    return this.http.post(`${this.ROOT_URL}/blog`, data);
  }
  getBlog() {
    return this.http.get(`${this.ROOT_URL}/blog`);
  }
  getblog(id: any) {
    return this.http.get(`${this.ROOT_URL}/blog/${id}`);
  }
  deleteBlog(id: number) {
    return this.http.delete(`${this.ROOT_URL}/blog/${id}`);

  }
  updateBlog(userid, blog: any) {
    return this.http.put(`${this.ROOT_URL}/blog`, blog);
  }
}
