import { Injectable } from '@angular/core';
// import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*
  Generated class for the WebServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebServicesProvider {

  public apiUrl = 'http://4auctions.net/api/'; //local server

  // signUp = 'signup.php?phone=';
  signUp = 'signup.php';
  login = 'login.php';
  homeRootCategory = 'root-category.php';
  addComment = 'add-comment.php';
  listComments = 'list-comments.php';
  childCategory = 'child-category.php?parent_id=';
  listProductByCategory = 'category-products.php?category_id=';
  productDetailList = 'product-detail.php?product_id=';

  verifyOtp = 'verify-otp.php';


  constructor(public http: HttpClient) {
    console.log('Hello WebServicesProvider Provider');
  }

  /*  postUserSignUp(data) {
      console.log("postUserSignUp called with data : " +JSON.stringify(data));
      let body = JSON.stringify(data);
      let header = new Headers;
      header.append('Content-Type', 'application/json');
      let options = new RequestOptions({headers: header});

      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + this.signUp, body,options)
          .subscribe(res => {
            let resp: any = res;
            let body = resp._body;
            resolve(JSON.parse(body));
          }, (err) => {
            reject(err);
          });
      });
    }*/


  postUserSignUp(phone) {
    /* let header = new Headers;
     header.append('Content-Type', 'application/json');*/
    let headers = new HttpHeaders({
      'NDAPI-Key': 'XXXXXXXXX',
      'NDAPI-Host': 'XXXXXXXXX'
    });
    let body = new FormData();
    body.append('phone', phone);
    let options = { headers: headers };

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + this.signUp, body, options)
        .subscribe(res => {
          let resp: any = res;
          let body = resp._body;
          resolve(JSON.parse(body));
        }, (err) => {
          reject(err);
        });
    });
  }

  postVerifyOtp(phone, otp, type) {
    /* let header = new Headers;
     header.append('Content-Type', 'application/json');*/
    let headers = new HttpHeaders({
      'NDAPI-Key': 'XXXXXXXXX',
      'NDAPI-Host': 'XXXXXXXXX'
    });
    let body = new FormData();
    body.append('phone', phone);
    body.append('otp', otp);
    body.append('type', type);
    let options = { headers: headers };

   return this.http.post(this.apiUrl + this.verifyOtp, body, options);
  }

  postUserLogin(phone) {
    // let body = JSON.stringify(data);
    /*   let header = new Headers;
       header.append('Content-Type', 'application/json');*/

    let headers = new HttpHeaders({
      'NDAPI-Key': 'XXXXXXXXX',
      'NDAPI-Host': 'XXXXXXXXX'
    });
    let body = new FormData();
    body.append('phone', phone);

    let options = { headers: headers };
    return this.http.post<any>(this.apiUrl + this.login, body, options);

  }

  postAddComment(list_id, user_id, comment_content) {
    // let body = JSON.stringify(data);
    /*   let header = new Headers;
       header.append('Content-Type', 'application/json');*/

    let headers = new HttpHeaders({
      'NDAPI-Key': 'XXXXXXXXX',
      'NDAPI-Host': 'XXXXXXXXX'
    });
    let body = new FormData();
    body.append('list_id', list_id);
    body.append('user_id', user_id);
    body.append('comment_content', comment_content);

    let options = { headers: headers };
  return  this.http.post(this.apiUrl + this.addComment, body, options);
  }

  postListComments(list_id) {
    // let body = JSON.stringify(data);
    /*   let header = new Headers;
       header.append('Content-Type', 'application/json');*/

    let headers = new HttpHeaders({
      'NDAPI-Key': 'XXXXXXXXX',
      'NDAPI-Host': 'XXXXXXXXX'
    });
    let body = new FormData();
    body.append('list_id', list_id);

    let options = { headers: headers };

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + this.listComments, body, options)
        .subscribe(res => {
          let resp: any = res;
          let body = resp._body;
          resolve(JSON.parse(body));
        }, (err) => {
          reject(err);
        });
    });
  }

  getRootCategory() {
    let header = new HttpHeaders;
    header.append('Content-Type', 'application/json');
    // header.append('Authorization', token);
    let options = { headers: header };
    return this.http.get<any>(this.apiUrl + this.homeRootCategory, options);
  }

  getChildCategory(parent_id) {
    let header = new HttpHeaders;
    header.append('Content-Type', 'application/json');
    // header.append('Authorization', token);
    let options = { headers: header };

    return new Promise(resolve => {
      this.http.get(this.apiUrl + this.childCategory + parent_id, options)
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getItemChildCategory(category_id) {
    let header = new HttpHeaders;
    header.append('Content-Type', 'application/json');
    // header.append('Authorization', token);
    let options = { headers: header };

    return new Promise(resolve => {
      this.http.get(this.apiUrl + this.listProductByCategory + category_id, options)
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getProductDetailData(product_id) {
    // let header = new HttpHeaders;
    // header.append('Content-Type', 'application/json');
    // // header.append('Authorization', token);
    // let options = { headers: header };

    return this.http.get(this.apiUrl + this.productDetailList + product_id);
  }


}
