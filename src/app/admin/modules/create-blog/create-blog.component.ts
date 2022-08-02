import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from 'src/app/shared/services/blog.service';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  @ViewChild('title', { read: ElementRef }) tile: ElementRef;
  @ViewChild('description', { read: ElementRef }) descr: ElementRef;
  @ViewChild('scrol') scrol: ElementRef;

  constructor(private blogService: BlogService,
              public snackbar: MatSnackBar,

              ) { }
  users: any;
  blogs: any;
  Result: any;
  editIndex: number;
  editMode: boolean = false;
  headingUpdate: boolean = false;
  editUserId: number;
  blogEdit = {
    id: 0,
    title: "",
    description: "",
    blogDate: ""
  }
  ngOnInit(): void {
    this.blogService.getBlog().subscribe(rslt => {
      this.blogs = rslt;


    })
  }
  addPost(form: NgForm) {
    if (this.editMode && !form.invalid) {
      this.blogEdit.id = this.editUserId;
      this.blogEdit.title = form.value.title;
      this.blogEdit.description = form.value.description;
      this.blogEdit.blogDate = form.value.blogDate;
      this.blogService.updateBlog(this.editUserId, this.blogEdit).subscribe(res => {
        console.log(res);
        this.snackbar.open("WelDone ! Post Updated Successfully !", "Updated", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: "right"
        });
        form.resetForm();
        this.ngOnInit();
        this.editMode = false;
        this.headingUpdate = false;

      });

    }
    else {
      if (form.invalid) {
        return
      }
      this.blogService.saveBlog(form.value).subscribe((res) => {
        this.users = res;
        //this.message=true;

        this.snackbar.open("WelDone ! Post Saved Successfully !", "Saved", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: "right"
        });
        form.resetForm();
        this.ngOnInit();

      });
    }
  }
  editBlog(userId, index) {
    this.editMode = true;
    //   this.blogService.getblog(userId).subscribe((res)=>{
    //   this.Result=res;
    //   this.tile.nativeElement.value=this.Result.title;
    //   this.descr.nativeElement.value=this.Result.description;
    // })

    this.editUserId = userId;
    this.editIndex = index;
    this.headingUpdate = true;
    this.tile.nativeElement.value = this.blogs[index].title;
    this.descr.nativeElement.value = this.blogs[index].description;

  }
  deletePost(id: number) {
    console.log("idddd", id);
    if (confirm('Do you Really Want To Delete This Blog !!')) {
      this.blogService.deleteBlog(id).subscribe(res => {
        this.snackbar.open("Whoa! Post Deleted Successfully !", "Deleted", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: "right",
        });
        this.ngOnInit();
      })
    }
  }
gotoTop(){
  console.log("scrolling...");
  console.log(window.scrollY);


}

}


