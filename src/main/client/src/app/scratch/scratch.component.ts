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


  users: User[];
  products: Product[];


  loadedAt: string;

  constructor( private httpClient:HttpClient) { }

  ngOnInit() {
  }

  getProducts() {
    this.httpClient.get<Product[]>("api/products")
    //NOTE: ideally, we should have an error handler here, which we left away for simplicity
      .subscribe(resp => {
        this.products = resp;
      });
    this.loadedAt = new Date().toLocaleTimeString();
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
