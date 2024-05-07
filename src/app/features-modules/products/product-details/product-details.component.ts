import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from 'src/app/shared/dataModels/productsModels/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public selectedItems: IProduct = { title: '', description: '', price: 0, id: 0, image: '', category: '' };
  constructor(public modal: NgbActiveModal) { 
  }

  ngOnInit(): void {
  }

  
  cancel(){
    this.modal.dismiss();
  }
  

}
