import { useState, useEffect } from 'react';
import BasicList from './BasicList';
import { ScryfallCard } from './types';

interface CardListProps {
  cardList: ScryfallCard[];
  editCardList: (revisedCardList: ScryfallCard[]) => void;
}

function CardGroupByType({ cards }: { cards: ScryfallCard[] }) {
  const [cardList, setCardList] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    setCardList(cards);
  }, [cards]);

  const editCardList = (revisedCardList: ScryfallCard[]) => {
    setCardList(revisedCardList);
  };

  return (
    <>
      <Creatures cardList={cardList} editCardList={editCardList} />
      <Enchantments cardList={cardList} editCardList={editCardList} />
      <Artifacts cardList={cardList} editCardList={editCardList} />
      <Instants cardList={cardList} editCardList={editCardList} />
      <Sorceries cardList={cardList} editCardList={editCardList} />
    </>
  );
}
function Enchantments({ cardList, editCardList }: CardListProps) {
  const [enchantmentsList, setEnchantmentsList] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    const originalList = [...cardList];
    const revisedList: ScryfallCard[] = [];
    const matchedList: ScryfallCard[] = [];

    for (let i = originalList.length - 1; i >= 0; i--) {
      if (originalList.length == 0) {
        return;
      }
      let card = originalList.pop()!;
      if (card.type_line.includes('Enchantment')) {
        matchedList.push(card);
      } else {
        revisedList.push(card);
      }
    }
    editCardList(revisedList);

    setEnchantmentsList(matchedList); // ✅ Local state for rendering
  }, []);

  return (
    <div>
      <div>Enchantments ({enchantmentsList.length})</div>
      {enchantmentsList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}

function Creatures({ cardList, editCardList }: CardListProps) {
  const [creaturesList, setCreaturesList] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    const originalList = [...cardList];
    const revisedList: ScryfallCard[] = [];
    const matchedList: ScryfallCard[] = [];

    for (let i = originalList.length - 1; i >= 0; i--) {
      if (originalList.length == 0) {
        return;
      }
      let card = originalList.pop()!;
      if (card.type_line.includes('Creature')) {
        matchedList.push(card);
      } else {
        revisedList.push(card);
      }
    }
    editCardList(revisedList);

    setCreaturesList(matchedList);
  }, []);

  return (
    <div>
      <div>Creatures ({creaturesList.length})</div>
      {creaturesList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}

function Artifacts({ cardList, editCardList }: CardListProps) {
  const [artifactsList, setArtifactsList] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    const originalList = [...cardList];
    const revisedList: ScryfallCard[] = [];
    const matchedList: ScryfallCard[] = [];

    for (let i = originalList.length - 1; i >= 0; i--) {
      if (originalList.length == 0) {
        return;
      }
      let card = originalList.pop()!;
      if (card.type_line.includes('Artifact')) {
        matchedList.push(card);
      } else {
        revisedList.push(card);
      }
    }
    editCardList(revisedList);

    setArtifactsList(matchedList);
  }, []);

  return (
    <div>
      <div>Artifacts ({artifactsList.length})</div>
      {artifactsList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}

function Sorceries({ cardList, editCardList }: CardListProps) {
  const [sorceriesList, setSorceriesList] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    const originalList = [...cardList];
    const revisedList: ScryfallCard[] = [];
    const matchedList: ScryfallCard[] = [];

    for (let i = originalList.length - 1; i >= 0; i--) {
      if (originalList.length == 0) {
        return;
      }
      const card = originalList.pop()!;
      if (card.type_line.includes('Sorcery')) {
        matchedList.push(card);
      } else {
        revisedList.push(card);
      }
    }

    editCardList(revisedList);
    setSorceriesList(matchedList);
  }, []);

  return (
    <div>
      <div>Sorceries ({sorceriesList.length})</div>
      {sorceriesList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}
function Instants({ cardList, editCardList }: CardListProps) {
  const [instantsList, setInstantsList] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    const originalList = [...cardList];
    const revisedList: ScryfallCard[] = [];
    const matchedList: ScryfallCard[] = [];

    for (let i = originalList.length - 1; i >= 0; i--) {
      if (originalList.length == 0) {
        return;
      }
      const card = originalList.pop()!;
      if (card.type_line.includes('Instant')) {
        matchedList.push(card);
      } else {
        revisedList.push(card);
      }
    }

    editCardList(revisedList);
    setInstantsList(matchedList);
  }, []);

  return (
    <div>
      <div>Instants ({instantsList.length})</div>
      {instantsList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}
export default CardGroupByType;
