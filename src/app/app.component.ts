import {Component, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShoppingCart} from "./model/shopping.cart.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Shopping Application';
  item = 'Shopping Item';

  //Form
  shoppingCartForm: FormGroup;

  //Active item being shopped
  shoppingCart: ShoppingCart;

  //Mocked list of Items
  itemList = [
    {value: 'Bread', viewValue: 'Bread'},
    {value: 'Rice', viewValue: 'Rice'},
    {value: 'Wine', viewValue: 'Wine'},
    {value: 'Pasts', viewValue: 'Pasta'},
    {value: 'Salad', viewValue: 'Salad'},
  ];

  //List of Users added
  @Output() shoppingList: ShoppingCart[] = [];
  @Output() shoppingListPrice: number = 0;

  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.initCart();
  }

  //Reactive form initialisation for shopping cart
  initCart() {
    if (!this.shoppingCart) {
      this.shoppingCart = new ShoppingCart();
      //Fake unique Id generated
      this.shoppingCart.id = Math.random();
    }
    this.shoppingCartForm = this.formBuilder.group({
      id: new FormControl({value: this.shoppingCart.id, disabled: false}),
      name: new FormControl({value: this.shoppingCart.name, disabled: false},
        [Validators.required]),
      quantity: new FormControl({value: this.shoppingCart.quantity, disabled: false},
        [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')]),
      price: new FormControl({value: this.shoppingCart.price, disabled: false},
        [Validators.required, Validators.pattern('^[0-9]+[0-9]*$')])
    });
  }

  // Add stuff in shopping cart
  add() {
    if (!this.shoppingCartForm.valid) {
      this.touchFormElements();
      return;
    }
    let price = 0;
    this.shoppingList.push(this.shoppingCartForm.getRawValue());
    this.shoppingList.forEach(shoppingCart => {
      price += (shoppingCart.price * shoppingCart.quantity);
    })
    this.shoppingListPrice = price;
    this.shoppingCart = new ShoppingCart();
    this.shoppingCartForm.reset();
  }

  // Cancel stuff being added in a cart
  cancel() {
    this.shoppingCart = new ShoppingCart();
    this.shoppingCartForm.reset();
  }

  //Touch form elements for validation
  touchFormElements(){
    this.shoppingCartForm.controls.name.markAsTouched();
    this.shoppingCartForm.controls.quantity.markAsTouched();
    this.shoppingCartForm.controls.price.markAsTouched();
  }


}
