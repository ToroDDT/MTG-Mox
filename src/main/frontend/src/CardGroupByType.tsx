import { useState, useEffect } from 'react';
import BasicList from './BasicList';
import { ScryfallCard } from './types';

interface CardListProps {
  cardList: ScryfallCard[];
}

function CardGroupByType({ cards }: { cards: ScryfallCard[] }) {
  const [creatures, setCreatures] = useState<ScryfallCard[]>([]);
  const [enchantments, setEnchantments] = useState<ScryfallCard[]>([]);
  const [artifacts, setArtifacts] = useState<ScryfallCard[]>([]);
  const [instants, setInstants] = useState<ScryfallCard[]>([]);
  const [sorceries, setSorceries] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    if (!cards || cards.length === 0) return;

    setCreatures(cards.filter((card) => card.type_line.includes('Creature')));
    setEnchantments(
      cards.filter((card) => card.type_line.includes('Enchantment')),
    );
    setArtifacts(cards.filter((card) => card.type_line.includes('Artifact')));
    setInstants(cards.filter((card) => card.type_line.includes('Instant')));
    setSorceries(cards.filter((card) => card.type_line.includes('Sorcery')));
  }, [cards]);

  return (
    <>
      <Creatures cardList={creatures} />
      <Enchantments cardList={enchantments} />
      <Artifacts cardList={artifacts} />
      <Instants cardList={instants} />
      <Sorceries cardList={sorceries} />
    </>
  );
}

function Enchantments({ cardList }: CardListProps) {
  return (
    <div>
      <div>Enchantments ({cardList.length})</div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}

function Creatures({ cardList }: CardListProps) {
  return (
    <div>
      <div>Creatures ({cardList.length})</div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}

function Artifacts({ cardList }: CardListProps) {
  return (
    <div>
      <div>Artifacts ({cardList.length})</div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}

function Sorceries({ cardList }: CardListProps) {
  return (
    <div>
      <div>Sorceries ({cardList.length})</div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}

function Instants({ cardList }: CardListProps) {
  return (
    <div>
      <div>Instants ({cardList.length})</div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} />
      ))}
    </div>
  );
}

export default CardGroupByType;

export default CardGroupByType;
