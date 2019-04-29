import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Product} from "./product";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.css']
})
export class ScratchComponent implements OnInit {
  productName: "";
  userName: "";
  purchaseDate: "";
  price: null;



  users: User[];
  products: Product[];
  pickedProduct: Product;
  newInputMode: boolean;


  loadedAt: string;

  constructor( private httpClient:HttpClient) { }

  ngOnInit() {
    this.getProducts();
  }

  onProductNameKeyUp(event: any) {
    this.productName = event.target.value;
  }

  onUserNameKeyUp(event: any) {
    this.userName = event.target.value;
  }

  onPurchaseDateKeyUp(event: any) {
    this.purchaseDate = event.target.value;
  }

  onPriceKeyUp(event: any) {
    this.price = event.target.value;
  }

  getProducts() {
    this.httpClient.get<Product[]>("api/products")
    //NOTE: ideally, we should have an error handler here, which we left away for simplicity
      .subscribe(resp => {
        this.products = resp;
      });
    this.removePickedProduct();
    this.newInputMode = true;
    this.loadedAt = new Date().toLocaleTimeString();
  }



  postProduct() {
    this.httpClient.post("api/products", {
      productName: this.productName,
      userName: this.userName,
      purchaseDate: this.purchaseDate,
      price: this.price
    })
      .subscribe((resp) => {
        console.log(resp);
        this.getProducts();
      })
  }

  updateProduct(productId: number) {
    this.httpClient.put("api/products/" + productId, {
      productName: this.productName,
      userName: this.userName,
      purchaseDate: this.purchaseDate,
      price: this.price
    }).subscribe((resp) => {
      console.log(productId);
      this.getProducts();
    });
  }

  deleteService(productId: number): void {
    this.deleteProduct(productId).subscribe((resp) => {
      this.products = this.products.filter(eachProduct => eachProduct.id !== productId)
    })
  }

  deleteProduct(productId: number): Observable<Product> {
    console.log(productId);
    const url = "api/products/" + productId; // --> ${ProductId} isn't rendered corretly :(
    return this.httpClient.delete<Product>(url);
  }

  setPickedProduct(productId: number) {
    this.httpClient.get<Product>("api/products/" + productId).subscribe(resp => {
      this.pickedProduct = resp;
      this.products = null;
      this.newInputMode = false;
    });
  }

  removePickedProduct() {
    this.pickedProduct = null;
  }

  removeUsers() {
    this.users = null;
  }

  public getSumOfPurchases(products){
    var result = 0;
    for (var i = 0; i < products.length; i++){
      var product = products[i];
      result = product.price + result;
    }
    return result;
  }
}
