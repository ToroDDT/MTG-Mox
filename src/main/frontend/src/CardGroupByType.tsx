import { useState, useEffect } from 'react';
import BasicList from './BasicList';
import { ScryfallCard } from './types';

interface CardListProps {
  cards: ScryfallCard[];
}

function CardGroupByType({ cards }: CardListProps) {
  const [creatures, setCreatures] = useState<ScryfallCard[]>([]);
  const [enchantments, setEnchantments] = useState<ScryfallCard[]>([]);
  const [artifacts, setArtifacts] = useState<ScryfallCard[]>([]);
  const [instants, setInstants] = useState<ScryfallCard[]>([]);
  const [sorceries, setSorceries] = useState<ScryfallCard[]>([]);
  const [lands, setLands] = useState<ScryfallCard[]>([]);

  useEffect(() => {
    if (!cards || cards.length === 0) return;

    setCreatures(cards.filter((card) => card.type_line.includes('Creature')));
    setEnchantments(
      cards.filter((card) => card.type_line.includes('Enchantment')),
    );
    setArtifacts(cards.filter((card) => card.type_line.includes('Artifact')));
    setInstants(cards.filter((card) => card.type_line.includes('Instant')));
    setSorceries(cards.filter((card) => card.type_line.includes('Sorcery')));
    setLands(cards.filter((card) => card.type_line.includes('Land')));
  }, [cards]);

  return (
    <div className="flex flex-row gap-20 ml-140">
      <Creatures cards={creatures} />
      <Enchantments cards={enchantments} />
      <Instants cards={instants} />
      <Sorceries cards={sorceries} />
      <Artifacts cards={artifacts} />
      <Lands cards={lands} />
    </div>
  );
}

function Enchantments({ cards }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Enchantments ({total})
      </div>
      {cards.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Creatures({ cards }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Creatures ({total})
      </div>
      {cards.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Artifacts({ cards }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Artifacts ({total})
      </div>
      {cards.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Sorceries({ cards }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Sorceries ({total})
      </div>
      {cards.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Instants({ cards }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Instants ({total})
      </div>
      {cards.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Lands({ cards }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Lands ({total})
      </div>
      {cards.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

export default CardGroupByType;
