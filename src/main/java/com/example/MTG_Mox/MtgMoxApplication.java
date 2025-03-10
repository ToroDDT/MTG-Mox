package com.example.MTG_Mox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication()
public class MtgMoxApplication {

	public static void main(String[] args) {
		SpringApplication.run(MtgMoxApplication.class, args);
	}

}
