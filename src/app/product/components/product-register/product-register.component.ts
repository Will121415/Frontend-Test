import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/product/product.service';
import { SupplierService } from 'src/app/core/supplier/supplier.service';
import { Product } from 'src/app/models/product_model';
import { Supplier } from 'src/app/models/supplier_model';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit{

  productForm: FormGroup;
  supplierForm: FormGroup;

  product: Product;
  suppliers: Supplier[];
  supplier: Supplier;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private productService: ProductService
    ) {}

  measures: string[]= ['Kg'];

  ngOnInit(): void {
    this.getSuppliers();
    this.buldForm();
  }

  change(value) {
    this.supplier =  this.suppliers.find(s => s.nit = value);
    console.log(this.supplier);
  }

  onSubmit() {

    if(this.productForm.invalid || this.supplierForm.invalid) {return; }
    this.product = this.productForm.value;
    this.product.supplier = this.supplier;
    console.log(this.product);
    this.productService.post(this.product).subscribe(p => {
      if (p != null)
      {
        alert("Producto guardado...!");
        this.productForm.reset();
        this.supplierForm.reset();
      }
    });
  }

  get enabled(): boolean {
    return this.productForm.invalid || this.supplierForm.invalid;
  }

  getSuppliers() {
    this.supplierService.get().subscribe(c => {
      if(c != null)
      {
        console.log(c);
        this.suppliers = c;
      }
    });
  }

  private buldForm()
  {
    this.product = new Product();
    this.product.status = 'Active';

    this.productForm = this.fb.group({
      idProduct: [this.product.idProduct, Validators.required],
      name: [this.product.name, Validators.required],
      status: [this.product.status, Validators.required],
      salePrice: [this.product.salePrice, Validators.required],
      purchasePrice: [this.product.purchasePrice, Validators.required],
      unitMeasure: [this.product.unitMeasure, Validators.required],
      quantityStock: [this.product.quantityStock, Validators.required],
      iva: [this.product.iva, Validators.required],
      description: [this.product.description, Validators.required],
    });

    this.supplierForm = this.fb.group({
      suppliertxt: [null, Validators.required]
    });



  }

  get controlProduct() {
    return this.productForm.controls;
  }



}
