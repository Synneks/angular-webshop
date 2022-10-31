import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
    selector: "app-product-box",
    templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
    @Input() fullWidthMode = false;
    @Output() addToCart = new EventEmitter<Product>();
    product: Product | undefined = {
        id: 1,
        title: "Jordani",
        price: 250,
        categroy: "Shoes",
        description: "Good shoes",
        image: "https://via.placeholder.com/150",
    };

    constructor() {}

    ngOnInit(): void {}

    onAddToCart(): void {
        this.addToCart.emit(this.product);
    }
}
