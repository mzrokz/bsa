import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService
    ) { }


    getPostProducts(userId) {
        let payload = this.commonService.prepareFormData({ user_id: userId });
        return this.http.post<any>(this.commonService.baseUrl + 'post-product.php', payload);
    }
}