import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-products-header",
    templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
    @Output() changeLayout = new EventEmitter<number>();

    sort = "desc";
    itemsShowCount = 12;

    constructor() {}

    ngOnInit(): void {}

    onSortOrderChange(newSort: string): void {
        this.sort = newSort;
    }

    onItemsCountShownChange(newCount: number): void {
        this.itemsShowCount = newCount;
    }

    onLayoutChange(colsNum: number): void {
        this.changeLayout.emit(colsNum);
    }
}
