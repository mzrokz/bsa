import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { forkJoin } from "rxjs/observable/forkJoin";

@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService,
        private transfer: FileTransfer
    ) { }


    getPostProducts(userId) {
        let payload = this.commonService.prepareFormData({ user_id: userId });
        return this.http.post<any>(this.commonService.baseUrl + 'post-product.php', payload);
    }

    addProduct(post) {
        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'product.jpeg',
            chunkedMode: false,
            mimeType: "image/jpeg",
        }

        let promises = [];

        post.files.forEach(file => {
            let promise = new Promise((resolve, reject) => {
                fileTransfer.upload(file.path, this.commonService.baseUrl + 'file.php', options).then(data => {
                    let res = JSON.parse(data.response);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            });
            promises.push(promise);
        });



        let newPromise = new Promise((resolve, reject) => {
            forkJoin<any>(promises).subscribe(res => {
                let images = [];
                let params = this.commonService.prepareFormData({
                    user_id: post.currentUserId,
                    category_id: post.categoryId,
                    subcategory_id: post.subcategoryId,
                    title: post.title,
                    description: post.description,
                    price: post.price,
                    brand_name: post.brand,
                    model_name: post.model
                });
                res.forEach((rs, i) => {
                    let imageId = rs.image_id[0];
                    params = params.append("image_id[" + i + "]", imageId);
                });


                this.http.post<any>("http://4auctions.net/api/add-product.php", params).subscribe(res => {
                    if (res.status == 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }, err => {
                    reject(err);
                });
            })
        });
        return newPromise;
    }


    getRecentProducts(userId) {
        let payload = this.commonService.prepareFormData({ user_id: userId });
        return this.http.post<any>(this.commonService.baseUrl + 'recently-views.php', payload);
    }

    getFavouriteProducts(userId) {
        let payload = this.commonService.prepareFormData({ user_id: userId });
        return this.http.post<any>(this.commonService.baseUrl + 'favorite-products.php', payload);
    }

}