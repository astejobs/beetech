import { UnitService } from './../../../shared/services/unit.service';
import { Image } from '../../../shared/classes/image';
import { ImageService } from './../../../shared/services/image.service';
import { CategoryService } from './../../../shared/services/category.service';
import { Category } from './../../../shared/classes/category';
import { Product } from './../../../shared/classes/product';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Unit } from 'src/app/shared/classes/unit';
import { Subscription } from 'rxjs';

//import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, AfterViewInit, OnDestroy {
  productForm: FormGroup;
  units: FormArray;
  images : Image[] = [];
  loading = false;
  submitted = false;
  imageLimit = 3;
  product: Product;
  categories: Category[]=[];
  productUnits: Unit[]=[];
  hasImage = false;

  imageToShow: any;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private imageService: ImageService,
              private toastr: ToastrService,
              private unitService: UnitService) {

               }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(5)]],
        productStock: ['', [Validators.min(0), Validators.pattern(/^[1-9]\d*$/)]],
        shortDescription: [''],
        aboutProduct: [''],
        description: ['', [Validators.required, Validators.minLength(5)]],
        weight: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[1-9]\d*$/)]],
        brand: [''],
        flavour: [''],
        packageInfo: [''],
        discount: [''],
        category: this.formBuilder.group({
          id: ['',[Validators.required]],
          name: ['']
        }),
        //unit: this.formBuilder.array([ this.createUnit() ]),
        productImages: this.formBuilder.array([]),
        //productImages: this.formBuilder.array([ this.createImage() ])
    });

    this.getCategories();
  }

  ngAfterViewInit() {

  }

  /* getProductImage(imageName: string) {
        this.imageService.getProductImage(imageName).subscribe(data => { console.log(data);
          this.createImageFromBlob(data);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });
    } */

 /*  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
 } */

  // convenience getter for easy access to form fields
   get f() { return this.productForm.controls; }

   /* createUnit(): FormGroup {
      return this.formBuilder.group({
        id: [''],
        type: ['', Validators.required],
        value: ['', Validators.required],
        price: ['', Validators.required],
        discount: ['']
      })
    } */

   /* createImage(): FormGroup {
      return this.formBuilder.group({
        id: [''],
        name: [''],
        type: [''],
        image: [this.croppedImage, [Validators.required]]
      })
    } */

  /* addUnit(): void {
    this.units = this.productForm.get('unit') as FormArray;
    this.units.push(this.createUnit());
  } */

  /* addImage(): void {
    this.units = this.productForm.get('productImages') as FormArray;
    this.units.push(this.createUnit());
  } */

 /*  removeUnit(i: number) {
      // remove unit from the list
      this.units = this.productForm.get('unit') as FormArray;
      this.units.removeAt(i);
  } */

  clearFiles(){
    this.productForm.patchValue({
      file: ''
    });
  }

  // Patch form Values
  patchValues(){
    this.productForm.patchValue({
      productImages: this.images
    });
  }

  // Remove Image
  removeImage(url:any){
    console.log(this.images,url);
    this.images = this.images.filter(img => (img != url));
    this.patchValues();
  }

   onSubmit(product: any) {
      this.submitted = true;
      console.log(product.value); //return;
      // stop here if form is invalid
      if (this.productForm.invalid) {
          return;
      }

      this.loading = true;
      this.subs.push(this.productService.addProduct(product.value,this.images)
          .subscribe(
              data => {
                console.log(data);
                this.toastr.success("Product Added Successfully!", 'Deleted', {
                  timeOut: 2000,
                });
                this.loading = false;
                this.redirectTo('/admin/products');
                  //this.router.navigate(['/login'], { queryParams: { registered: true }});
              },
              error => {
                this.toastr.error("Product cannot be saved, Try again!", 'Warning', {
                  timeOut: 2000,
                });
                  console.log(error);
                  this.loading = false;
          }));
  }

  getCategories() {
    this.subs.push(this.categoryService.getAll().subscribe(
      res => {
        this.categories = res;
      }
    ))
  }

  getUnits() {
    this.subs.push(this.unitService.getAll().subscribe(
      res => {
        this.productUnits = res;
      }
    ));
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      //clear all previous images (if only one allowed)
      /* let img: Image= new Image();
      img.id = 0;
      img.name = "";
      img.type = "";
      img.image =  this.croppedImage;
      this.productForm.get('productImages').patchValue(
        [{
        id:0,
        name:'',
        type:'',
        image: this.croppedImage
      }]); */
      //this.productForm.get('productImages').reset();
      let imageArray = this.productForm.get('productImages') as FormArray;
      console.log(imageArray);
      imageArray.clear();
      console.log(imageArray);
      imageArray.push(new FormControl(this.croppedImage));
      this.hasImage = true;
  }
  imageLoaded() {
      /* show cropper */
  }
  cropperReady() {
      /* cropper ready */
  }
  loadImageFailed() {
      /* show message */
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  ngOnDestroy(): void {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      })
  }
}


/* <select [compareWith]="compareFn"  [formControl]="selectedCountriesControl">
    <option *ngFor="let country of countries" [ngValue]="country">
        {{country.name}}
    </option>
</select>

compareFn(c1: Country, c2: Country): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
}
 */

