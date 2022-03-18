import { Component, EventEmitter, Input, OnChanges, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/classes/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, AfterViewInit {
  categoryForm: FormGroup;
  @Input() loading;
  @Input() submitted;
  @Input() category: Category;
  @Output() onSubmitCategory = new EventEmitter<string>();
  @Output() onUpdateCategory = new EventEmitter<string>();
  subscription: Subscription;
  title= "Add Category";

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private toastr: ToastrService) {

    }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngAfterViewInit() {
    if(this.route.snapshot.params.id) {
      this.title= "Update Category";
      this.route.params.subscribe((params: Params) => {
        this.getCategory(params['id']);
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

  onSubmit(category: any) {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    if(this.route.snapshot.params.id) {
      console.log("Updating...");
      this.onUpdateCategory.emit(category);
    } else {
      this.onSubmitCategory.emit(category);
    }
  }

  getCategory(id: number): void {
    this.categoryService.getCategory(id)
      .subscribe(
        data => {
          this.category = data;
          console.log(this.category);
          this.patchValues();
        },
        error => {
          console.log(error);
        });
  }

  // Patch form Values
  patchValues(){ console.log("Patching..");console.log(this.category);
    this.categoryForm.patchValue({
      id: this.category.id,
      name: this.category.name
    });
  }

}
