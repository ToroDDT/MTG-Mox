import { useState, useEffect } from 'react';
import BasicList from './BasicList';
import { ScryfallCard } from './types';

interface CardListProps {
  cards: ScryfallCard[];
  setCard: React.Dispatch<React.SetStateAction<ScryfallCard>>;
}

function CardGroupByType({ cards, setCard }: CardListProps) {
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
    <div className="flex flex-col md:flex-row flex-wrap gap-20 md:gap-10 ml-40 md:ml-60 items-start">
      <div className="flex flex-row gap-10 justify-center md:flex-col">
        <Creatures cards={creatures} setCard={setCard} />
        <Artifacts cards={artifacts} setCard={setCard} />
      </div>

      <div className="flex flex-row gap-10 justify-center md:flex-col">
        <Enchantments cards={enchantments} setCard={setCard} />
        <Instants cards={instants} setCard={setCard} />
      </div>

      <div className="flex flex-row gap-10 justify-center md:flex-col">
        <Sorceries cards={sorceries} setCard={setCard} />
        <Lands cards={lands} setCard={setCard} />
      </div>
    </div>
  );
}

function Enchantments({ cards, setCard }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div>
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300">
        Enchantments ({total})
      </div>
      {cards.map((card) => (
        <BasicList
          cardObject={card}
          key={card.id}
          card={card.name}
          total={card.total}
          setCard={setCard}
        />
      ))}
    </div>
  );
}

function Creatures({ cards, setCard }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div>
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300">
        Creatures ({total})
      </div>
      {cards.map((card) => (
        <BasicList
          cardObject={card}
          key={card.id}
          card={card.name}
          total={card.total}
          setCard={setCard}
        />
      ))}
    </div>
  );
}

function Artifacts({ cards, setCard }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div>
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300">
        Artifacts ({total})
      </div>
      {cards.map((card) => (
        <BasicList
          cardObject={card}
          key={card.id}
          card={card.name}
          total={card.total}
          setCard={setCard}
        />
      ))}
    </div>
  );
}

function Sorceries({ cards, setCard }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div>
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 ">
        Sorceries ({total})
      </div>
      {cards.map((card) => (
        <BasicList
          cardObject={card}
          key={card.id}
          card={card.name}
          total={card.total}
          setCard={setCard}
        />
      ))}
    </div>
  );
}

function Instants({ cards, setCard }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div>
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300 ">
        Instants ({total})
      </div>
      {cards.map((card) => (
        <BasicList
          cardObject={card}
          key={card.id}
          card={card.name}
          total={card.total}
          setCard={setCard}
        />
      ))}
    </div>
  );
}

function Lands({ cards, setCard }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div>
      <div className="text-lg font-semibold text-gray-800 border-b border-gray-300">
        Lands ({total})
      </div>
      {cards.map((card) => (
        <BasicList
          cardObject={card}
          key={card.id}
          card={card.name}
          total={card.total}
          setCard={setCard}
        />
      ))}
    </div>
  );
}

export default CardGroupByType;
