import { OrderSearch } from './../../../shared/classes/order-search';
import { OrderService } from './../../../shared/services/order.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/classes/category';
import { Order } from 'src/app/shared/classes/order';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { AddEditComponent } from '../category/add-edit.component';
import { PageModel } from 'src/app/shared/classes/page-model';
import { OrderEditComponent } from '../../modules/orders/order-edit/order-edit.component';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss']
})
export class OrderSearchComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(AddEditComponent) subForm: AddEditComponent;
  private triggerCategory = new Subject<any>();
  orderSearchForm: FormGroup;
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

   // MatPaginator Inputs
   totalRecords = 0;
   pageSize = 5;
   currentPage = 0;
   pageSizeOptions: number[] = [5, 10,25];

   // MatPaginator Output
   pageEvent: PageEvent;

  loading = false;
  submitted = false;
  orders: Order[]=[];
  orderSearch: OrderSearch = new OrderSearch();
  currentOrder= new Order;
  displayedColumns: string[] = ['id', 'orderedDate', 'deliveredDate', 'orderStatus', 'paymentStatus', 'address', 'items', 'action'];
  dataSource = new MatTableDataSource();
  subs: Subscription[] = [];
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private orderService: OrderService,
              private toastr: ToastrService,
              public dialog: MatDialog) {

               }

  ngOnInit(): void {
    const ordersearch = new OrderSearch();
    this.getOrders(ordersearch);
    this.getAllOrders();

  }
  getAllOrders(){
  this.orderService.getorders().subscribe((res)=>{
    this.orders = res;
    this.dataSource=new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.orders);
  })
}
  // convenience getter for easy access to form fields
   get f() { return this.orderSearchForm.controls; }


  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  getOrders(orderSearch: OrderSearch) {

    this.subs.push(this.orderService.getOrders(orderSearch).subscribe(
      res => {
        this.orders = res.orders;
        this.totalRecords = res.totalRecords;
        this.currentPage = res.currentPage-1;
        this.orderSearch = res.orderSearch;
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    ))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getOrderForUpdate(order: Order) {
    console.log(order);
    this.orderService.EditOrder.next(order);
    this.dialog.open(OrderEditComponent,{

    });

  }

  public handlePage(e: any) { console.log(e);
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getPageData();
  }

  getPageData() {
    const from = this.currentPage * this.pageSize;
    const to = (this.currentPage + 1) * this.pageSize;
    let pageModel = new PageModel();
    pageModel.from = from;
    pageModel.to = to;
    this.orderSearch.pageModel = pageModel;

    this.subs.push(this.orderService.getPageOrders(this.orderSearch)
      .subscribe(res => {
        this.orders = res.orders;
        this.totalRecords = res.totalRecords;
        this.currentPage = res.currentPage-1;
        this.orderSearch = res.orderSearch;
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.sort = this.sort;
      },
      error =>{
        console.log(error);
    }))
  }

/*  onUpdate(category: any) {
    this.submitted = true;
    console.log(category);
    // stop here if form is invalid

    this.loading = true;
    this.categoryService.putCategory(category.id, category)
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
        });
  } */


/*   getCategory(id) {
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
        this.categoryService.deleteCategory(id).subscribe(
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
        );
      }
      this.dialogRef = null;
    });
  } */

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
