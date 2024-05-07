import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ListDataFilter } from 'src/app/shared/dataModels/ListDataFilter';
import { SortList } from 'src/app/shared/dataModels/SortList';
import { IProduct } from 'src/app/shared/dataModels/productsModels/product';
import { ApiService } from 'src/app/shared/services/shared-service/api.service';
import * as _ from 'underscore';
import Swal from 'sweetalert2';
import { ICategory } from 'src/app/shared/dataModels/categoriesModels/category';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  dataLoading = false;
  showFilter = false;
  showSearch = false;
  ApprovalLoading = false;

  sortItems = [
    { name: this.translate.instant('general.asc'), value: SortList.asc },
    { name: this.translate.instant('general.desc'), value: SortList.desc },
  ];

  sortValue = SortList.asc;

  recordsData: IProduct[] = [];
  filterModel: ListDataFilter = new ListDataFilter();

  selectedCategory: string = 'All Categories';
  allCategories: ICategory[] = [];
  loadingCategories = false;


  constructor(
    private translate: TranslateService,
    private apiService: ApiService,
    private modalService: NgbModal) {
    this.filterModel.pageSize = 10;
  }

  ngOnInit(): void {
    this.getAllProduct(null);
    this.getCategoriesList();
    this.apiService.modalClosed.subscribe(closed => {
      if (closed) {
        this.getAllProduct(null);
      }
    });
  }

  ngOnDestroy() {
    this.apiService.modalClosed.unsubscribe();
  }

  async getAllProduct(index: any) {
    this.dataLoading = true;
    if (index) {
      this.filterModel.pageNumber = index;
    } else {
      this.filterModel.pageNumber = 0;
    }

    let res = await this.apiService.doGetLimit('products?limit=', 10);
    if (res) {
      this.dataLoading = false;
      this.recordsData = res as IProduct[];
    }
  }

  async getCategoriesList() {
    this.loadingCategories = true;
    let res = await this.apiService.doGetAll('products/categories');
    if (res) {
      this.allCategories = res as ICategory[];
      this.loadingCategories = false;
    }
  }

  async sortRecords(selected: any) {
    this.filterModel.sort = selected.target.value;
    this.dataLoading = true;
    let res = await this.apiService.doGetLimit('products?sort=', this.filterModel.sort);
    if (res) {
      this.recordsData = res as IProduct[];
      this.dataLoading = false;
    }
  }

  async filterByCategory(category: string) {
    if (category !== 'all') {
      this.dataLoading = true;
      let res = await this.apiService.doGetLimit('products/category/', category);
      if (res) {
        this.recordsData = res as IProduct[];
        this.dataLoading = false;
      }
    } else {
      this.getAllProduct(null);
    }
  }


  resetSearch() {
    this.filterModel.searchText = '';
    this.getAllProduct(null);
  }

  addProduct() {
    const addModalRef = this.modalService.open(AddProductComponent, { size: 'lg', backdrop: 'static' });
  }

  
  editProduct(product: IProduct) {
    const addModalRef = this.modalService.open(AddProductComponent, { size: 'lg', backdrop: 'static' });
    addModalRef.componentInstance.editedProduct = product;
  }

  viewProduct(product: IProduct){
    const addModalRef = this.modalService.open(ProductDetailsComponent, { size: 'lg', backdrop: 'static' });
    addModalRef.componentInstance.selectedItems = product;
  }

  deleteProduct(product: IProduct) {
    Swal.fire({
      title: this.translate.instant('sweetAlert.AreYouSure'),
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('sweetAlert.yes'),
      cancelButtonText: this.translate.instant('sweetAlert.cancel')
    }).then((result) => {
      if (result.value) {
        this.ApprovalLoading = true;
        let res: any = this.apiService.doDelete('products/', product.id);
        if (res) {
          Swal.fire({
            title: this.translate.instant('sweetAlert.success'),
            text: this.translate.instant('sweetAlert.success'),
            icon: 'success',
            confirmButtonText: this.translate.instant('sweetAlert.ok')
          }).then((res) => {
            this.recordsData = this.recordsData.filter((x: any) => x.id !== product.id);
          });
        } else {
          Swal.fire({
            title: this.translate.instant('sweetAlert.Failed'),
            text: this.translate.instant('sweetAlert.Failed'),
            icon: 'error',
            confirmButtonText: this.translate.instant('sweetAlert.ok'),
          });
        }
        this.ApprovalLoading = false;
      }
    });
  }

}
