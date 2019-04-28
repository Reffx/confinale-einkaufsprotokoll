package com.dlizarra.starter.product;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private final ProductService service;

    ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/products")
    Iterable<Product> all() {
        return service.getProduct();
    }

    @PostMapping("/products")
    Product createProduct(@RequestBody Product newProduct) {
        return this.service.createProduct(newProduct);
    }
}
