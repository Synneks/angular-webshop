import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";

const ROWS_HEIGHT: { [id: number]: number } = {
    1: 400,
    3: 335,
    4: 350,
};

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
    layoutCols: number = 3;
    layoutRowHeight: number = ROWS_HEIGHT[this.layoutCols];
    category!: string;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {}

    onLayoutChange(newLayoutCols: number): void {
        this.layoutCols = newLayoutCols;
        this.layoutRowHeight = ROWS_HEIGHT[this.layoutCols];
    }

    onShowCategory(selectedCategory: string): void {
        this.category = selectedCategory;
    }

    onAddToCart(product: Product): void {
        this.cartService.addToCart({
            product: product.image,
            name: product.title,
            price: product.price,
            quantity: 1,
            id: product.id,
        });
    }
}
