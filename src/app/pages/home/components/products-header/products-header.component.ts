import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-products-header",
    templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
    @Output() layoutChange = new EventEmitter<number>();
    @Output() itemsCountChange = new EventEmitter<number>();
    @Output() sortChange = new EventEmitter<string>();

    sort = "desc";
    itemsShowCount = 12;

    constructor() {}

    ngOnInit(): void {}

    onSortOrderChange(newSort: string): void {
        this.sort = newSort;
        this.sortChange.emit(newSort);
    }

    onItemsCountShownChange(newCount: number): void {
        this.itemsShowCount = newCount;
        this.itemsCountChange.emit(newCount);
    }

    onLayoutChange(colsNum: number): void {
        this.layoutChange.emit(colsNum);
    }
}
