import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/shared-service/api.service';
import { IProduct } from 'src/app/shared/dataModels/productsModels/product';
import { ICategory } from 'src/app/shared/dataModels/categoriesModels/category';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  
  editedProduct: IProduct = { title: '', description: '', price: 0, id: 0, image: '', category: '' };
  addProductForm = this.formBuilder.group({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    image: new FormControl(''),
    category: new FormControl('', Validators.required),
    id: new FormControl(0)
  });

  public allCategories: any = [];

  public inEditMode: boolean = false;
  loading: boolean = false;

  loadingCategories: boolean = false;


  constructor(public modal: NgbActiveModal,
    private toastr: ToastrService, 
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private translate: TranslateService
  ) {
    this.getCategoriesList();
  }

  ngOnInit(): void {
    this.checkInEditMode();
  }

  checkInEditMode() {
    if (this.editedProduct.title) {
      this.inEditMode = true;
      this.addProductForm.patchValue({
        title: this.editedProduct.title,
        price: this.editedProduct.price,
        category: this.editedProduct.category,
        description: this.editedProduct.description,
        image: this.editedProduct.image,
        id: this.editedProduct.id
      });
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.saveProduct();
  }

  async getCategoriesList() {
    this.loadingCategories = true;
    let res = await this.apiService.doGetAll('products/categories');
    if (res) {
      this.allCategories = res as ICategory[];
      this.loadingCategories = false;
    }
  }

  cancel() {
    this.modal.dismiss();
    this.apiService.modalClosed.next(true);
  }

  async saveProduct() {
    if (this.inEditMode) {
      let res = await this.apiService.doPut('products/', this.addProductForm.value);
      if(res){
        this.toastr.success(this.translate.instant('validationMsg.ProductUpdatedSuccessfully'));
        this.cancel();

      }else{
        this.toastr.error(this.translate.instant('validationMsg.UnableUpdateProduct'))
      }
    }
    else {
       let res = await this.apiService.doPost('products', this.addProductForm.value);
      if(res){
        this.toastr.success(this.translate.instant('validationMsg.ProductAddedSuccess'));
        this.cancel();

      }else{
        this.toastr.error(this.translate.instant('validationMsg.UnableAddProduct'))
      }
    }

  }

}
