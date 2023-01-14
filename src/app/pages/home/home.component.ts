import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = {
    1: 400,
    3: 335,
    4: 350,
};

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
    layoutCols: number = 3;
    layoutRowHeight: number = ROWS_HEIGHT[this.layoutCols];
    category!: string;

    products: Product[] = [];
    sort = "desc";
    itemCount = 12;
    productsSubscription: Subscription | undefined;

    constructor(
        private cartService: CartService,
        private storeService: StoreService
    ) {}

    ngOnInit(): void {
        this.getProducts();
    }

    ngOnDestroy(): void {
        if (this.productsSubscription) {
            this.productsSubscription.unsubscribe();
        }
    }

    getProducts(): void {
        this.productsSubscription = this.storeService
            .getAllProducts(this.itemCount, this.sort, this.category)
            .subscribe((_products) => (this.products = _products));
    }

    onLayoutChange(newLayoutCols: number): void {
        this.layoutCols = newLayoutCols;
        this.layoutRowHeight = ROWS_HEIGHT[this.layoutCols];
    }

    onSortChange(newSort: string): void {
        this.sort = newSort;
        this.getProducts();
    }

    onItemsCountChange(newItemCount: number): void {
        this.itemCount = newItemCount;
        this.getProducts();
    }

    onShowCategory(selectedCategory: string): void {
        if (this.category !== selectedCategory) {
            this.category = selectedCategory;
            this.getProducts();
        }
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
