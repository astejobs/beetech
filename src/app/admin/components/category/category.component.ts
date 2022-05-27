import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { Category } from 'src/app/shared/classes/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Subject, Subscription } from 'rxjs';
import { AddEditComponent } from './add-edit.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(AddEditComponent) subForm: AddEditComponent;
  private triggerCategory = new Subject<any>();
  categoryForm: FormGroup;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  loading = false;
  submitted = false;
  categories: Category[]=[];
  currentCategory= new Category;
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource();

  subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private toastr: ToastrService,
              public dialog: MatDialog) {

               }

  ngOnInit(): void {
    this.getCategories();
  }

  // convenience getter for easy access to form fields
   get f() { return this.categoryForm.controls; }


  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   onSubmit(category: any) {
      this.submitted = true;
      console.log(category);
      // stop here if form is invalid

      this.loading = true;
      this.subs.push(this.categoryService.addCategory(category)
          .subscribe(
              data => {
                console.log(data);
                this.categories.push(data);
                this.toastr.success('Category Added Successfully!', 'Created', {
                  timeOut: 2000,
                });
                this.loading = false;
                this.redirectTo('/admin/category');
              },
              error => {
                  console.log(error);
                  this.toastr.error('Error In Saving Category, Check for Duplicate', 'Error', {
                    timeOut: 2000,
                  });
                  this.loading = false;
          }));
  }


  onUpdate(category: any) {
    this.submitted = true;
    console.log(category);
    // stop here if form is invalid

    this.loading = true;
    this.subs.push(this.categoryService.putCategory(category.id, category)
        .subscribe(
            data => {
              console.log(data);
              this.toastr.success('Category Updated Successfully!', 'Updated', {
                timeOut: 2000,
              });
              this.loading = false;
              this.redirectTo('/admin/category');
              
            },
            error => {
                console.log(error);
                this.toastr.error('Category not updated successfully!, Check for duplicate', 'Error', {
                  timeOut: 2000,
                });
                this.loading = false;
        }));
  }

  getCategories() {
    this.subs.push(this.categoryService.getAll().subscribe(
      res => {
        this.categories = res;
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    ))
  }

  getCategory(id) {
    //this.subForm.getCategory(id);
    this.router.navigate(["/admin/category/"+id]);
  }

  deleteCategory(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this Category. Products with this category will also be deleted?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.subs.push(this.categoryService.deleteCategory(id).subscribe(
          data=> {
            console.log(data);
            this.toastr.success("Category Deleted Successfully!", 'Deleted', {
              timeOut: 2000,
            });
            this.redirectTo('/admin/category');
          },
          error=> {
            this.toastr.error("Category Deletetion unsuccessful!", 'Error', {
              timeOut: 2000,
            });
            console.log(error);
          }
        ));
      }
      this.dialogRef = null;
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      })
  }

}
