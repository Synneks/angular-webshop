import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
    cart: Cart = {
        items: [
            {
                product: "https://via.placeholder.com/150",
                name: "Sneakers",
                price: 200,
                quantity: 1,
                id: 1,
            },
            {
                product: "https://via.placeholder.com/150",
                name: "Pants",
                price: 340,
                quantity: 3,
                id: 2,
            },
        ],
    };

    dataSource: Array<CartItem> = [];
    displayedColumns: Array<string> = [
        "product",
        "name",
        "price",
        "quantity",
        "total",
        "action",
    ];

    constructor(
        private cartService: CartService,
        private httpClient: HttpClient
    ) {}

    ngOnInit(): void {
        this.cartService.cart.subscribe((_cart: Cart) => {
            this.cart = _cart;
            this.dataSource = this.cart.items;
        });
    }

    getTotal(items: CartItem[]): number {
        return this.cartService.getTotal(items);
    }

    onClearCart(): void {
        this.cartService.clearCart();
    }

    onRemoveFromCart(item: CartItem): void {
        this.cartService.removeFromCart(item);
    }

    onIncreaseQuantity(item: CartItem): void {
        this.cartService.addToCart(item);
    }

    onDecreaseQuantity(item: CartItem): void {
        this.cartService.decreaseQuantity(item);
    }

    onCheckout(): void {
        this.httpClient
            .post("http://localhost:4242/checkout", {
                items: this.cart.items,
            })
            .subscribe(async (res: any) => {
                let stripe = await loadStripe(
                    "pk_test_51M1v7SG6ECPXsCvzxdcIGXEE0mACUd2P6xip4oH6vyrzm1Tky8ZvAl6AF3YDLhfW0ulp1EKGr0sdSm5g628qZzQL00qopQnQpF"
                );
                stripe?.redirectToCheckout({
                    sessionId: res.id,
                });
            });
    }
}
