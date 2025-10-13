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
    <div className="flex flex-row gap-20">
      <Creatures cardList={creatures} />
      <Enchantments cardList={enchantments} />
      <Instants cardList={instants} />
      <Sorceries cardList={sorceries} />
      <Artifacts cardList={artifacts} />
    </div>
  );
}

function Enchantments({ cardList }: CardListProps) {
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Enchantments ({cardList.length})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Creatures({ cardList }: CardListProps) {
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Creatures ({cardList.length})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Artifacts({ cardList }: CardListProps) {
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Artifacts ({cardList.length})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Sorceries({ cardList }: CardListProps) {
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Sorceries ({cardList.length})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Instants({ cardList }: CardListProps) {
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Instants ({cardList.length})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

export default CardGroupByType;
