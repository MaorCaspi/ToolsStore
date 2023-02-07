import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiService } from 'src/app/services/product-api.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit{

  productList$!:Observable<any[]>;

  constructor(private service:ProductApiService) { }


  ngOnInit(): void {
    this.productList$ = this.service.getProductList();
  }

  // Variables (properties)
  modalTitle:string = '';
  activateAddEditProductComponent:boolean = false;
  product:any;

  modalAdd() {
    this.product = {
      productId:0,
      productName:"",
      category:"",
      price:"",
      unitsInStock:""
    }
    this.modalTitle = "Add Product";
    this.activateAddEditProductComponent = true;
  }

  modalEdit(item:any) {
    this.product = item;
    this.modalTitle = "Edit Product";
    this.activateAddEditProductComponent = true;
  }

  modalClose() {
    this.activateAddEditProductComponent = false;
    this.productList$ = this.service.getProductList();
  }
}
