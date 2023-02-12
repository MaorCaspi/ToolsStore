import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductApiService } from 'src/app/services/product-api.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  constructor(private service:ProductApiService) { }

  @Input() product:any;
  productId!: number;
  productName!: string;
  category!: string;
  price!: number;
  unitsInStock!: number

  ngOnInit(): void {
    this.productId = this.product.productId;
    this.productName = this.product.productName;
    this.category = this.product.category;
    this.price = this.product.price;
    this.unitsInStock = this.product.unitsInStock;
  }

  addEditForm = new FormGroup({
    productNameForm: new FormControl('',[Validators.required, Validators.maxLength(30)]),
    categoryForm: new FormControl('',[Validators.required]),
    priceForm: new FormControl('',[Validators.required, Validators.min(0), Validators.max(10000)]),
    unitsInStockForm: new FormControl('',[Validators.required, Validators.min(0), Validators.max(10000)])
  })

  get productNameForm(){
    return this.addEditForm.get('productNameForm');
  }

  get categoryForm(){
    return this.addEditForm.get('categoryForm');
  }

  get priceForm(){
    return this.addEditForm.get('priceForm');
  }

  get unitsInStockForm(){
    return this.addEditForm.get('unitsInStockForm');
  }

  addProduct() {
    var product = {
      productName: this.productName,
      category: this.category,
      price: this.price,
      unitsInStock: this.unitsInStock
    }
    this.service.addProduct(product).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    }, error => console.log('Add new product failed, the error message:', error.message)
    )
  }

  updateProduct() {
    var product = {
      productName: this.productName,
      category: this.category,
      price: this.price,
      unitsInStock: this.unitsInStock
    }
    var productId:number = this.productId;
    this.service.updateProduct(productId,product).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    }, error => console.log('Update product failed, the error message:', error.message)
    )
  }
}
