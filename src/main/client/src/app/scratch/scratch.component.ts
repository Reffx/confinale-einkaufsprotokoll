import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Product} from "./product";

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

  onLoadUsersButtonClick() {
    this.httpClient.get<User[]>("api/users")
    //NOTE: ideally, we should have an error handler here, which we left away for simplicity
      .subscribe(resp => {
        this.users = resp;
      });

    this.loadedAt = new Date().toLocaleTimeString();
  }

  removeUsers() {
    this.users = null;
  }
}
