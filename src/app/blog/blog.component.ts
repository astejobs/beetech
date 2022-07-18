
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  textString = '...';
  //showLess = "";
  constructor(private blogService: BlogService, public dialog:MatDialog) { }
  blogs: any;
  message: boolean = false;
  ngOnInit(): void {
    this.blogService.getBlog().subscribe((Result) => {
      this.blogs = Result;
      this.SortData();
      //console.log(Result);

    })
  }
  readMore(blog) {
    //console.log("Read More...", blog.description.length);
    //this.showLess = blog.description.substring(450, blog.description.length);
    this.dialog.open(DialogComponent,{
      data:blog,
    });
  }
  SortData(){
    return this.blogs.sort((a, b) => {
      return <any>new Date(b.blogDate) - <any>new Date(a.blogDate);
    });
  }
}
