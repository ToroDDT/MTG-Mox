package com.example.MTG_Mox.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import com.example.MTG_Mox.model.TCG.Commander;
import com.example.MTG_Mox.model.TCG.MagicCard;
import com.example.MTG_Mox.repo.CommanderRepository;

@Service
public class CommanderService {
    private final CommanderRepository commanderRepository;

    @Autowired
    public CommanderService(CommanderRepository commanderRepository) {
        this.commanderRepository = commanderRepository;
    }

    public void addCommander(String name) {
        Commander newCommander = new Commander(name, true);
        commanderRepository.save(newCommander);
    }

    public String getCurrentCommander() {
        Optional<Commander> getCurrentCommander = commanderRepository.findByCurrentTrue();
        return getCurrentCommander.get().getName();
    }
}
