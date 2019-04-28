package com.dlizarra.starter.product;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.dlizarra.starter.product.Product;

@Repository("productRepository")
interface ProductRepository extends CrudRepository<Product, Long> {
    public Product findById(long id);
}
