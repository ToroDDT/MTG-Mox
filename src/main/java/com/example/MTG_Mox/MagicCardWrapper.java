package com.example.MTG_Mox;
import java.util.*;
import org.mapstruct.Mapper;
import com.example.MTG_Mox.dto.*;
import com.example.MTG_Mox.model.TCG.MagicCard;

@Mapper(componentModel = "spring")
public interface MagicCardWrapper {
    MagicCardDto toDto(MagicCard magicCard);
    List<MagicCardDto> toDtoList(List<MagicCard> magicCards);
}
