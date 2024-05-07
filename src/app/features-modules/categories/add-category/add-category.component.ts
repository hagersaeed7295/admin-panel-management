import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/shared-service/api.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  editedCategory: any;
  addCategoryForm = this.formBuilder.group({
    title: new FormControl('', Validators.required)
  });


  public inEditMode: boolean = false;
  loading: boolean = false;



  constructor(public modal: NgbActiveModal,
    private toastr: ToastrService, 
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.checkInEditMode();
  }

  checkInEditMode() {
    if (this.editedCategory) {
      this.inEditMode = true;
      this.addCategoryForm.patchValue({
        title: this.editedCategory
      });
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.saveProduct();
  }

  cancel() {
    this.modal.dismiss();
    this.apiService.modalClosed.next(true);
  }

  async saveProduct() {
    this.cancel();
  }

}
