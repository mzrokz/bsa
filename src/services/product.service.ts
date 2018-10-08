import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';

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
        debugger;
        let params = this.commonService.prepareFormData({
            user_id: post.currentUserId,
            category_id: post.categoryId,
            subcategory_id: post.subcategoryId,
            title: post.title,
            description: post.description,
            price: "50",
            brand_name: "Sony",
            model_name: "X - 4785"
        })

        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
            fileKey: 'image_uri',
            fileName: 'product.jpeg',
            chunkedMode: false,
            mimeType: "image/jpeg",
            params: params
        }

        // return fileTransfer.upload(post.files[0].path, this.commonService.baseUrl + 'add-product.php', options);

        let formData: FormData = new FormData();
        formData.append('user_id', post.currentUserId);
        formData.append('category_id', post.categoryId);
        formData.append('subcategory_id', post.subcategoryId);
        formData.append('title', post.subcategoryId);
        formData.append('description', post.subcategoryId);
        formData.append('price', post.subcategoryId);
        formData.append('brand_name', post.subcategoryId);
        formData.append('model_name', post.subcategoryId);

        let blob = this.commonService.b64toBlob(post.files[0].encodedImg, 'image/jpeg');
        formData.append('image_uri', blob, 'product.jpeg');

        let httpOptions = {
            headers: new HttpHeaders({
                'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
            })
        };
        return this.http.post<any>(this.commonService.baseUrl + 'add-product.php', formData, httpOptions);
    }
}