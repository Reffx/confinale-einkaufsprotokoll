package com.dlizarra.starter.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Iterable<Product> getProduct() {
        return this.productRepository.findAll();
    }

    //addProduct
    public Product createProduct(Product newProduct) {
        //PurchaseDate set to today if null
        if (newProduct.getPurchaseDate() == null) {
            newProduct.setPurchaseDate((LocalDate.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"))));
        }
        productRepository.save(newProduct);
        return newProduct;
    }

    public Product getProduct(long id) {
        Product tempProduct = productRepository.findById(id);
        return tempProduct;
    }
}
