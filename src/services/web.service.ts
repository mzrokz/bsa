import {Injectable} from '@angular/core';
// import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonService} from './common.service';

/*
  Generated class for the WebServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebServicesProvider {

  public apiUrl;

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
  homeSlider = 'home-slider.php';
  search = 'search-product.php';


  constructor(
    public http: HttpClient,
    private commonService: CommonService
  ) {
    console.log('Hello WebServicesProvider Provider');
    this.apiUrl = this.commonService.baseUrl;
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
    let options = {headers: headers};

    return this.http.post(this.apiUrl + this.signUp, body, options);
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
    let options = {headers: headers};

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

    let options = {headers: headers};

    return this.http.post<any>(this.apiUrl + this.login, body, options);

  }

  postAddComment(list_id, user_id, comment_content,price /*auth_token*/) {
    // let body = JSON.stringify(data);
    /*   let header = new Headers;
       header.append('Content-Type', 'application/json');*/

    let headers = new HttpHeaders({
      'NDAPI-Key': 'XXXXXXXXX',
      'NDAPI-Host': 'XXXXXXXXX',
     // 'auth_token': auth_token
    });
    let body = new FormData();
    body.append('list_id', list_id);
    body.append('user_id', user_id);
    body.append('comment_content', comment_content);
    body.append('price', price);

    let options = {headers: headers};
    return this.http.post(this.apiUrl + this.addComment, body, options);
  }

  postListComments(list_id)/*auth_token*/ {
    // let body = JSON.stringify(data);
    /*   let header = new Headers;
       header.append('Content-Type', 'application/json');*/

    let headers = new HttpHeaders({
      'NDAPI-Key': 'XXXXXXXXX',
      'NDAPI-Host': 'XXXXXXXXX',
     // 'auth_token': auth_token
    });
    let body = new FormData();
    body.append('list_id', list_id);

    let options = {headers: headers};

    return this.http.post(this.apiUrl + this.listComments, body, options);
  }

  getRootCategory(auth_token) {
    let header = new HttpHeaders;
    header.append('Content-Type', 'application/json');
    header.append('auth_token', auth_token);
    let options = {headers: header};
    return this.http.get<any>(this.apiUrl + this.homeRootCategory, options);
  }

  getChildCategory(parent_id) {
    let header = new HttpHeaders;
    header.append('Content-Type', 'application/json');
    // header.append('Authorization', token);
    let options = {headers: header};

    return this.http.get<any>(this.apiUrl + this.childCategory + parent_id, options);
  }

  getItemChildCategory(category_id) {
    let header = new HttpHeaders;
    header.append('Content-Type', 'application/json');
    // header.append('Authorization', token);
    let options = {headers: header};

    return this.http.get(this.apiUrl + this.listProductByCategory + category_id, options);
  }

  getProductDetailData(product_id) {
    // let header = new HttpHeaders;
    // header.append('Content-Type', 'application/json');
    // // header.append('Authorization', token);
    // let options = { headers: header };

    return this.http.get(this.apiUrl + this.productDetailList + product_id);
  }

  getHomeSliderImages(auth_token) {
    let header = new HttpHeaders;
    header.append('Content-Type', 'application/json');
    header.append('auth_token', auth_token);
    let options = {headers: header};
    return this.http.get<any>(this.apiUrl + this.homeSlider, options);

    //  return this.http.get(this.apiUrl + this.homeSlider );
  }
  getSearchApi(search) {
    let headers = new HttpHeaders({
      'NDAPI-Key': 'XXXXXXXXX',
      'NDAPI-Host': 'XXXXXXXXX'
    });
    let body = new FormData();
    body.append('search', search);
    let options = {headers: headers};

    return this.http.post(this.apiUrl + this.search, body, options);

  }

  getAllCategory() {
    return this.http.get<any>(this.apiUrl + "all-category.php");
  }

}
