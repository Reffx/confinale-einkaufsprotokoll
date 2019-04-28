package com.dlizarra.starter.product;

import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    private final ProductService service;

    ProductController(ProductService service) {
        this.service = service;
    }

    //get all products
    @GetMapping("/products")
    Iterable<Product> all() {
        return service.getProduct();
    }

    //create a product
    @PostMapping("/products")
    Product createProduct(@RequestBody Product newProduct) {
        return this.service.createProduct(newProduct);
    }

    //get product with a specific ID
    @GetMapping("/products/{productId}")
    Product getProduct(@PathVariable String productId) {
        return this.service.getProduct(Long.parseLong(productId));
    }

    //update a product,
    @CrossOrigin
    @PutMapping("/products/{productId}")
    Product updateProduct(@RequestBody Product newProduct, @PathVariable Long productId) {
        return this.service.updateProduct(newProduct, productId);
    }
}
