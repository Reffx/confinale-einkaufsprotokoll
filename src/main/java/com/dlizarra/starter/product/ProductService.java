package com.dlizarra.starter.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    //deleteProduct
    public ResponseEntity<String> deleteProduct(Long productId) {
        productRepository.delete(productId);
        return new ResponseEntity<String>(HttpStatus.OK); // response code: 204
    }

    //update Product
    public Product updateProduct(Product newProduct, Long productId) {
        Product tempProduct = productRepository.findById(productId);
        if (newProduct.getProductName() != null) {
            tempProduct.setProductName(newProduct.getProductName());
        }
        if (newProduct.getUserName() != null) {
            tempProduct.setUserName(newProduct.getUserName());
        }
        tempProduct.setPrice(newProduct.getPrice());
        if (newProduct.getPurchaseDate() != null) {
            tempProduct.setPurchaseDate(newProduct.getPurchaseDate());
        }
        productRepository.save(tempProduct);
        return newProduct;
    }

    public Product getProduct(long id) {
        Product tempProduct = productRepository.findById(id);
        return tempProduct;
    }
}
