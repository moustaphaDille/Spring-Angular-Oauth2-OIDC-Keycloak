package com.moustapha.inventoryservice;

import com.moustapha.inventoryservice.entities.Product;
import com.moustapha.inventoryservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.UUID;

@SpringBootApplication
public class InventoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository) {
        return args -> {
            productRepository.save(Product.builder().name("Computer").price(300).quantity(30).build());
            productRepository.save(Product.builder().name("Printer").price(100).quantity(10).build());
            productRepository.save(Product.builder().name("Phone").price(100).quantity(20).build());
        };
    }

}
