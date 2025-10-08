package com.example.MTG_Mox;

import com.example.MTG_Mox.model.Role;
import com.example.MTG_Mox.model.User;
import com.example.MTG_Mox.model.TCG.Commander;
import com.example.MTG_Mox.model.TCG.MagicCard;
import com.example.MTG_Mox.repo.AccountRepository;
import com.example.MTG_Mox.repo.CommanderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication()
public class MtgMoxApplication {

  public static void main(String[] args) {
    SpringApplication.run(MtgMoxApplication.class, args);
  }

  @Bean
  CommandLineRunner commandLineRunnerDatabase(CommanderRepository commanderRepository) {
    // Create a new Commander
    Commander newCommander = new Commander("necrobloom", true);

    // Create a new card to add
    MagicCard magicCard = new MagicCard();
    return args -> {
      commanderRepository.save(newCommander);
    };
    // Add card to Commander

  }
}
