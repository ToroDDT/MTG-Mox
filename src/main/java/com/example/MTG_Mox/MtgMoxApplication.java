package com.example.MTG_Mox;

import com.example.MTG_Mox.model.Role;
import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.repo.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication()
public class MtgMoxApplication {

	public static void main(String[] args) {
		SpringApplication.run(MtgMoxApplication.class, args);
	}

	@Autowired
	PasswordEncoder passwordEncoder;

	@Bean
	CommandLineRunner commandLineRunner(AccountRepository accountRepository) {
		Set<Role> roles = new HashSet<>();
		Role role1 = new Role("USER");
		roles.add(role1);
		return args -> {

			accountRepository.save(new User("Deltoro1999@icloud.com", passwordEncoder.encode("password123"),
					roles));
		};

	}
}
