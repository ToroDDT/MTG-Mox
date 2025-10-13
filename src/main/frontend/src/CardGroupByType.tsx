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
      <Creatures cardList={creatures} />
      <Enchantments cardList={enchantments} />
      <Instants cardList={instants} />
      <Sorceries cardList={sorceries} />
      <Artifacts cardList={artifacts} />
      <Lands cardList={lands} />
    </div>
  );
}

function Enchantments({ cardList }: CardListProps) {
  // Calculate card amount
  const calculateTotal = () => {
    let total = 0;
    cardList.forEach((card) => {
      total = card.total + total;
    });
    return total;
  };

  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Enchantments ({calculateTotal()})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Creatures({ cardList }: CardListProps) {
  // Calculate card amount
  const calculateTotal = () => {
    let total = 0;
    cardList.forEach((card) => {
      total = card.total + total;
    });
    return total;
  };
  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Creatures ({calculateTotal()})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Artifacts({ cardList }: CardListProps) {
  // Calculate card amount
  const calculateTotal = () => {
    let total = 0;
    cardList.forEach((card) => {
      total = card.total + total;
    });
    return total;
  };

  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Artifacts ({calculateTotal()})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Sorceries({ cardList }: CardListProps) {
  // Calculate card amount
  const calculateTotal = () => {
    let total = 0;
    cardList.forEach((card) => {
      total = card.total + total;
    });
    return total;
  };

  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Sorceries ({calculateTotal()})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}

function Instants({ cardList }: CardListProps) {
  // Calculate card amount
  const calculateTotal = () => {
    let total = 0;
    cardList.forEach((card) => {
      total = card.total + total;
    });
    return total;
  };

  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Instants ({calculateTotal()})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}
function Lands({ cardList }: CardListProps) {
  // Calculate card amount
  const calculateTotal = () => {
    let total = 0;
    cardList.forEach((card) => {
      total = card.total + total;
    });
    return total;
  };

  return (
    <div className="mb-4">
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 mb-1">
        Lands ({calculateTotal()})
      </div>
      {cardList.map((card) => (
        <BasicList key={card.id} card={card.name} total={card.total} />
      ))}
    </div>
  );
}
export default CardGroupByType;
