import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  namePattern = "^[a-zA-Z0-9_-]{3,15}$";
  pricePattern = "[0-9]+(\.[0-9][0-9])?";

  isValidFormSubmitted = false;

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    ) { }

  ngOnInit(): void {
          
  }

  createProduct(form: NgForm): void {
    this.isValidFormSubmitted = false;
     if (form.invalid) {
        return;
     }
    this.productService.create(this.product).subscribe(() => {
      this.isValidFormSubmitted = true;
      form.resetForm();
      this.productService.showMessage('Produto criado.');
      this.router.navigate(['/products']);
    });

    
  }
  cancel(): void {
    this.router.navigate(['/products']);
  }

}
