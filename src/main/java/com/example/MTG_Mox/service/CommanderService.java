package com.example.MTG_Mox.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import com.example.MTG_Mox.model.TCG.Commander;
import com.example.MTG_Mox.repo.CommanderRepository;

@Service
public class CommanderService {
    private final CommanderRepository commanderRepository;

    public CommanderService(CommanderRepository commanderRepository) {
        this.commanderRepository = commanderRepository;
    }

    @Autowired
    public CommanderService(CommanderRepository commanderRepository) {
        this.commanderRepository = commanderRepository;
    }

    public void addCommander(String name) {
        Commander newCommander = new Commander(name);
        commanderRepository.save(newCommander);
    }
}
