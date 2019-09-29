import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ShoppingCart} from "../../model/shopping.cart.model";
import {ShoppingCartColumns} from "./shopping-cart.column";

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnChanges {

  title = 'Shopping Cart';
  @Input() shoppingItemsList: ShoppingCart[] = [];
  @Input() totalPrice: number = 0;
  rows = 18;
  cols = [];

  constructor() {
    this.cols = ShoppingCartColumns;
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    console.log(this.shoppingItemsList);
  }


}
