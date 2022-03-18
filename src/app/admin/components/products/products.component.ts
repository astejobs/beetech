import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/classes/product';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  displayedColumns: string[] = ['id', 'name', 'description', 'category', 'action'];
  dataSource = new MatTableDataSource();

  products: Product[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addProduct() {
    this.redirectTo("/admin/add-product")
  }

  getProducts() {
    this.productService.getAll().subscribe(
      res => {
        this.products = res; console.log(this.products);
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  getProduct(id) {
    this.redirectTo("/admin/edit-product/"+id);
  }

  deleteProduct(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this Product?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.productService.deleteProduct(id).subscribe(
          data=> {
            console.log(data);
            this.toastr.success("Product Deleted Successfully!", 'Deleted', {
              timeOut: 2000,
            });
            this.redirectTo('/admin/products');
          },
          error=> { console.log(error); }
        );
      }
      this.dialogRef = null;
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}
