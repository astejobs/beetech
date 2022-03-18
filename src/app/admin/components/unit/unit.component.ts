import { UnitService } from './../../../shared/services/unit.service';
import { Component, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Unit } from 'src/app/shared/classes/unit';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // we will pass in unit from Product component
  //@Input('group')
  unitForm: FormGroup;

  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  isUpdate: boolean = false;
  loading = false;
  submitted = false;
  units: Unit[]=[];
  unit: Unit= new Unit();
  currentUnit= new Unit;
  displayedColumns: string[] = ['id', 'type', 'value', 'price', 'discount', 'action'];
  dataSource = new MatTableDataSource();

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private unitService: UnitService,
    private cdRef : ChangeDetectorRef) {
      this.getUnits();
    }

  ngOnInit(): void {
    this.unitForm = this.formBuilder.group({
      id: [''],
      type: ['', [Validators.required]],
      value: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.unitForm.controls; }


  ngAfterViewInit() {
    if(this.route.snapshot.params.id) {
      this.route.params.subscribe((params: Params) => {
        this.getUnit(params['id'])
        this.isUpdate = true;
      });
    }
  }

  ngAfterViewChecked() {
    if(this.route.snapshot.params.id) {
      this.isUpdate = true;
    }
    this.cdRef.detectChanges();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   onSubmit(unit: any) {
      this.submitted = true;
      console.log(unit);
      // stop here if form is invalid
      if(this.unitForm.invalid) {
        return;
      }
      this.loading = true;

      if(this.isUpdate) {
        this.updateUnit(unit);
      } else {
        this.addNewUnit(unit);
      }


  }
  addNewUnit(unit: any) {
    this.unitService.addUnit(unit)
    .subscribe(
        data => {
          console.log(data);
          this.units.push(data);
          this.toastr.success('Unit Added Successfully!', 'Created', {
            timeOut: 2000,
          });
          this.loading = false;
          this.redirectTo('/admin/unit');
        },
        error => {
            console.log(error);
            this.loading = false;
    });
  }

  updateUnit(unit: any) {

    this.unitService.putUnit(unit.id, unit)
        .subscribe(
            data => {
              console.log(data);
              this.toastr.success('Unit Updated Successfully!', 'Updated', {
                timeOut: 2000,
              });
              this.loading = false;
              this.redirectTo('/admin/unit');
            },
            error => {
                console.log(error);
                this.loading = false;
        });
  }

  getUnits() {
    this.unitService.getAll().subscribe(
      res => {
        this.units = res;
        this.dataSource = new MatTableDataSource(this.units);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
getEdit(id) {
  this.redirectTo("/admin/unit/"+id);
}
  getUnit(id: number): void {
      this.unitService.getUnit(id)
        .subscribe(
          data => {
            this.unit = data;
            console.log(this.unit);
            this.patchUnitValues();
          },
          error => {
            console.log(error);
          }
        )
  }

  deleteUnit(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this Unit. Products with this Unit will also be deleted?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.unitService.deleteUnit(id).subscribe(
          data=> {
            console.log(data);
            this.toastr.success("Unit Deleted Successfully!", 'Deleted', {
              timeOut: 2000,
            });
            this.redirectTo('/admin/unit');
          },
          error=> { console.log(error); }
        );
      }
      this.dialogRef = null;
    });
  }

  // Patch form Values
  patchUnitValues(){ console.log("Patching..");
    this.unitForm.patchValue({
      id: this.unit.id,
      type: this.unit.type,
      value: this.unit.value,
      price: this.unit.price,
      discount: this.unit.discount
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
