import { Subscription } from 'rxjs';
import { Image } from '../../../shared/classes/image';
import { ImageService } from './../../../shared/services/image.service';
import { CategoryService } from './../../../shared/services/category.service';
import { Category } from './../../../shared/classes/category';
import { Product } from './../../../shared/classes/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  productForm: FormGroup;
  units: FormArray;
  images : Image[] = [];
  uploadedImages : any[] = [];
  loading = false;
  submitted = false;
  imageLimit = 3;
  product: Product;
  categories: Category[]=[];
  selectedCategoryId;
  productId;

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
              public dialog: MatDialog) {

               }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
      this.getProduct(this.productId);
    });

    this.productForm = this.formBuilder.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(5)]],
        productStock: ['', [Validators.min(0), Validators.pattern(/^[1-9]\d*$/)]],
        shortDescription: [''],
        aboutProduct: [''],
        description: ['', [Validators.required, Validators.minLength(5)]],
        category: this.formBuilder.group({
          id: ['',Validators.required],
          name: ['']
        }),
        //unit: this.formBuilder.array([ this.createUnit() ]),
        weight: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[1-9]\d*$/)]],
        brand: [''],
        flavour: [''],
        packageInfo: [''],
        discount: [''],
        productImages: this.formBuilder.array([])
    });

    this.getCategories();
  }

  getProduct(id: number): void {
    this.subs.push(this.productService.getProduct(id)
      .subscribe(
        data => {
          this.product = data;
          this.selectedCategoryId = this.product.category.id;
          console.log(this.product);
          this.patchProductValues();
        },
        error => {
          console.log(error);
        }));
  }
  patchProductValues() {
    this.productForm.patchValue({
      id: this.product.id,
      name: this.product.name,
      productStock: this.product.productStock,
      shortDescription: this.product.shortDescription,
      aboutProduct: this.product.aboutProduct,
      description: this.product.description,
      //unit: this.product.unit,
      weight: this.product.weight,
      price: this.product.price,
      discount: this.product.discount,
      packageInfo: this.product.packageInfo,
      brand: this.product.brand,
      flavour: this.product.flavour,
      productImages: this.product.productImages
    });

    this.productForm.get("category").patchValue({
      id: this.product.category.id,
      name: this.product.category.name
    });

  }

  /* getProductImage(imageName: string) {
    this.imageService.getProductImage(imageName).subscribe(data => { console.log(data);
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  } */

/* getProductImagesById(id: number) {
    this.imageService.getProductImagesById(id)
    .subscribe(imadeList => {
      this.uploadedImages = imadeList;
      //this.imgMap = this.getBase64(this.uploadedIages);
      this.imagesLoaded = true;
      console.log(this.uploadedImages);
    });
} */

/* getBase64(list: any[]) {
  let map = new Map();
  for(let img of list) {
    this.imageService.getProductImage(img)
    .subscribe(blob => {
      let objectURL = URL.createObjectURL(blob);
      map.set(img,objectURL);
    });
  } //console.log(map);
  return map;
} */

  /* createImageFromBlob(image: Blob) {
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
   get productImages() { return this.productForm.get('productImages'); }

   /* createUnit(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      type: ['', Validators.required],
      value: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['']
    })
  } */
  /*  createImage(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: [''],
      type: [''],
      image: [this.croppedImage]
    })
  } */

  /* addUnit(): void {
    this.units = this.productForm.get('unit') as FormArray;
    this.units.push(this.createUnit());
  } */

  /* removeUnit(i: number) {
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
      this.subs.push(this.productService.putProduct(product.id, product.value)
          .subscribe(
              data => {
                console.log(data);
                this.toastr.success("Product Updated Successfully!", 'Updated', {
                  timeOut: 2000,
                });
                this.loading = false;
                this.redirectTo('/admin/products');
              },
              error => {
                  console.log(error);
                  this.loading = false;
          }));
  }

  getCategories() {
    this.subs.push(this.categoryService.getAll().subscribe(
      res => {
        this.categories = res;
        //console.log(this.categories);
      }
    ))
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      let imageArray = this.productForm.get('productImages') as FormArray;
      console.log(imageArray);
      imageArray.clear();
      console.log(imageArray);
      imageArray.push(new FormControl(this.croppedImage));
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

  removeProductImage(imgName: string) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this Image?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.subs.push(this.imageService.removeProductImage(this.productId, imgName)
            .subscribe(res => {
                  console.log(res);
                  this.toastr.success("Product Image Deleted Successfully!", 'Deleted', {
                    timeOut: 2000,
                  });
                  this.redirectTo('/admin/edit-product/'+this.product.id);
                },
                error => {
                    console.log(error);
                    this.toastr.error("Product Image Deletion Unsussessful!", 'Deleted', {
                      timeOut: 2000,
                    });
            }));
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
