import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'page-post-product',
  templateUrl: 'post-product.html',
})
export class PostProductPage {

  public products: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostProductPage2');
    this.getProducts();
  }


  getProducts() {
    //TODO: update userId
    this.productService.getPostProducts(19).subscribe(res => {
      if (res.status == 200) {
        this.products = res.data;
      }
    });
  }
}