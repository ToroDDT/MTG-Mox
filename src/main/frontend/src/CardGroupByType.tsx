import { useState } from 'react';
import BasicList from './BasicList';
import { ScryfallCard } from './types';

interface CardListProps {
  cardList: ScryfallCard[];
  editCardList: (revisedCardList: ScryfallCard[]) => void;
}

function CardGroupByType({ cards }: { cards: ScryfallCard[] }) {
  const [cardList, setCardList] = useState<ScryfallCard[]>(cards);

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
  const checkForEnchantments = (cards: ScryfallCard[]) => {
    // make a shallow copy of cards in order not to mutate prop value
    let cardList = [...cards];
    let revisedCardList: ScryfallCard[] = [];
    let EnchantmentsList: ScryfallCard[] = [];

    for (let i = cardList.length - 1; i >= 0; i--) {
      if (cardList.length == 0) {
        return;
      }

      if (cardList[i].type_line.includes('Enchantment')) {
        let card = cardList.pop()!;
        EnchantmentsList.push(card);
      } else {
        let card = cardList.pop()!;
        revisedCardList.push(card);
      }
    }

    editCardList(revisedCardList);

    return (
      <div>
        <div>Enchantments ({EnchantmentsList.length})</div>
        {EnchantmentsList.map((card) => (
          <BasicList card={card.name} />
        ))}
      </div>
    );
  };

  return <>{checkForEnchantments(cardList)}</>;
}

function Creatures({ cardList, editCardList }: CardListProps) {
  const checkForCreatures = (cards: ScryfallCard[]) => {
    let cardList = [...cards];
    let revisedCardList: ScryfallCard[] = [];
    let creaturesList: ScryfallCard[] = [];

    for (let i = cardList.length - 1; i >= 0; i--) {
      const card = cardList.pop()!;
      if (card.type_line.includes('Creature')) {
        creaturesList.push(card);
      } else {
        revisedCardList.push(card);
      }
    }

    editCardList(revisedCardList);

    return (
      <div>
        <div>Creatures ({creaturesList.length})</div>
        {creaturesList.map((card) => (
          <BasicList key={card.id} card={card.name} />
        ))}
      </div>
    );
  };

  return <>{checkForCreatures(cardList)}</>;
}

function Artifacts({ cardList, editCardList }: CardListProps) {
  const checkForArtifacts = (cards: ScryfallCard[]) => {
    let cardList = [...cards];
    let revisedCardList: ScryfallCard[] = [];
    let artifactsList: ScryfallCard[] = [];

    for (let i = cardList.length - 1; i >= 0; i--) {
      const card = cardList.pop()!;
      if (card.type_line.includes('Artifact')) {
        artifactsList.push(card);
      } else {
        revisedCardList.push(card);
      }
    }

    editCardList(revisedCardList);

    return (
      <div>
        <div>Artifacts ({artifactsList.length})</div>
        {artifactsList.map((card) => (
          <BasicList key={card.id} card={card.name} />
        ))}
      </div>
    );
  };

  return <>{checkForArtifacts(cardList)}</>;
}

function Sorceries({ cardList, editCardList }: CardListProps) {
  const checkForSorceries = (cards: ScryfallCard[]) => {
    let cardList = [...cards];
    let revisedCardList: ScryfallCard[] = [];
    let sorceriesList: ScryfallCard[] = [];

    for (let i = cardList.length - 1; i >= 0; i--) {
      const card = cardList.pop()!;
      if (card.type_line.includes('Sorcery')) {
        sorceriesList.push(card);
      } else {
        revisedCardList.push(card);
      }
    }

    editCardList(revisedCardList);

    return (
      <div>
        <div>Sorceries ({sorceriesList.length})</div>
        {sorceriesList.map((card) => (
          <BasicList key={card.id} card={card.name} />
        ))}
      </div>
    );
  };

  return <>{checkForSorceries(cardList)}</>;
}

function Instants({ cardList, editCardList }: CardListProps) {
  const checkForInstants = (cards: ScryfallCard[]) => {
    let cardList = [...cards];
    let revisedCardList: ScryfallCard[] = [];
    let instantsList: ScryfallCard[] = [];

    for (let i = cardList.length - 1; i >= 0; i--) {
      const card = cardList.pop()!;
      if (card.type_line.includes('Instant')) {
        instantsList.push(card);
      } else {
        revisedCardList.push(card);
      }
    }

    editCardList(revisedCardList);

    return (
      <div>
        <div>Instants ({instantsList.length})</div>
        {instantsList.map((card) => (
          <BasicList key={card.id} card={card.name} />
        ))}
      </div>
    );
  };

  return <>{checkForInstants(cardList)}</>;
}
export default CardGroupByType;
