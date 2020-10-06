import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';


import { Product } from "./../product.model";
import { ProductService } from "./../product.service";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  product: Product;

  namePattern = "^[a-zA-Z0-9_-]{3,15}$";
  pricePattern = "[0-9]+(\.[0-9][0-9])?";

  isValidFormSubmitted = false;


  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }

  updateProduct(form: NgForm): void {
    this.isValidFormSubmitted = false;
     if (form.invalid) {
        return;
     }
    this.productService.update(this.product).subscribe(() => {
      this.isValidFormSubmitted = true;
      form.resetForm();
      this.productService.showMessage("Produto atualizado com sucesso!");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}