import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {CommonService} from "../../services/common.service";

/**
 * Generated class for the FilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {

  filterBy: any;
  filterOrder: any;
  isChecked: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public commonService: CommonService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterModalPage');
  }

  filterOrderValue(filter_order) {
    this.filterOrder = filter_order;
    console.log('filterOrderValue : ' + filter_order);

    /*if (filter_order == 'desc') {
      this.isChecked = true;
      return;
    } else if(filter_order == 'asc') {
      this.isChecked = true;
      return;
    }  else {
      this.isChecked = false;
      return;
    }*/

  }

  filterByValue(filter_by) {

    this.filterBy = filter_by;
    console.log('filterByValue : ' + filter_by);

    /* if (filter_by == 'price') {
       this.isChecked = true;
       return;
     } else if (filter_by == 'title') {
       this.isChecked = true;
       return;
     } else if (filter_by == 'history') {
       this.isChecked = true;
       return;
     } else {
       this.isChecked = false;
       return;
     }*/
  }

  applyFilter() {

    if (!this.validation()) {
      return;
    }

    if (this.filterOrder == null || this.filterOrder == '') {
      this.filterOrder = 'desc';
    }

    let data = {'filterBy': this.filterBy, 'filterOrder': this.filterOrder, 'isApplyFilter': true};
    this.viewCtrl.dismiss(data);
  }

  clearFilter() {
    this.filterOrder = '';
    this.filterBy = '';
    let data = {/*'filterBy': this.filterBy, 'filterOrder': this.filterOrder,*/ 'isApplyFilter': false};
    this.viewCtrl.dismiss(data);
  }

  validation(): boolean {
    if (((this.filterBy && this.filterBy.toString().trim() == '')) /*||
      ((this.filterOrder && this.filterOrder.toString().trim() == ''))*/) {
      this.commonService.showPopUp('Alert', 'Please choose a filter');
      return false;
    }
    return true;
  }

}
