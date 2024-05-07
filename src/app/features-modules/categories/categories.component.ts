import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ICategory } from 'src/app/shared/dataModels/categoriesModels/category';
import { ApiService } from 'src/app/shared/services/shared-service/api.service';
import Swal from 'sweetalert2';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  loadingCategories = false;
  recordsData: ICategory[] = [];
  searchText: string = '';
  showSearch = false;

  showFilter = false;
  selectedCategory: string = 'All Categories';
  allCategories: ICategory[] = [];

  ApprovalLoading = false;

  constructor(private translate: TranslateService,
    private apiService: ApiService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getCategoriesList();
    this.apiService.modalClosed.subscribe(closed => {
      if (closed) {
      }
    });
  }

  ngOnDestroy() {
    this.apiService.modalClosed.unsubscribe();
  }

  async getCategoriesList() {
    this.loadingCategories = true;
    let res = await this.apiService.doGetAll('products/categories');
    if (res) {
      this.recordsData = res as ICategory[];
      this.loadingCategories = false;
      this.allCategories = [...this.recordsData];
    }
  }

  resetSearch() {
    this.searchText = '';
    this.getCategoriesList();
  }

  
  async filterByCategory(category: string) {}

  addCategory(){
    const addModalRef = this.modalService.open(AddCategoryComponent, { size: 'lg', backdrop: 'static' });
  }

  editCategory(category: ICategory) {
    const addModalRef = this.modalService.open(AddCategoryComponent, { size: 'lg', backdrop: 'static' });
    addModalRef.componentInstance.editedCategory = category;
  }
  
  deleteCategory(category: ICategory) {
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
        Swal.fire({
          title: this.translate.instant('sweetAlert.success'),
          text: this.translate.instant('sweetAlert.success'),
          icon: 'success',
          confirmButtonText: this.translate.instant('sweetAlert.ok')
        }).then((res) => {
          this.recordsData = this.recordsData.filter((x: any) => x !== category);
          console.log(this.recordsData);
          this.ApprovalLoading = false;
        });
      
      }
    });
  }

}
