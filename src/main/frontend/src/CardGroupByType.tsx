import { useState, useEffect } from 'react';
import BasicList from './BasicList';
import { ScryfallCard } from './types';
import { initialCardState } from './App';

interface CardListProps {
  cards: ScryfallCard[];
  setCard: React.Dispatch<React.SetStateAction<ScryfallCard>>;
}

interface CardGroupByType {
  setCard: React.Dispatch<React.SetStateAction<ScryfallCard>>;
  cards: ScryfallCard[];
  commander: string;
}

interface CommanderProp {
  commander: ScryfallCard;
  setCard: React.Dispatch<React.SetStateAction<ScryfallCard>>;
}

function CardGroupByType({ cards, setCard, commander }: CardGroupByType) {
  const [creatures, setCreatures] = useState<ScryfallCard[]>([]);
  const [enchantments, setEnchantments] = useState<ScryfallCard[]>([]);
  const [artifacts, setArtifacts] = useState<ScryfallCard[]>([]);
  const [instants, setInstants] = useState<ScryfallCard[]>([]);
  const [sorceries, setSorceries] = useState<ScryfallCard[]>([]);
  const [lands, setLands] = useState<ScryfallCard[]>([]);
  const [commanderName, setCommanderName] = useState<string>('');
  const [commanderObject, setCommanderObject] =
    useState<ScryfallCard>(initialCardState);

  useEffect(() => {
    setCommanderName(commander);
  }, []);

  useEffect(() => {
    if (!commanderName || commanderName.trim() === '') return;

    const fetchCardData = async () => {
      try {
        console.log('Fetching commander:', commanderName);
        const response = await fetch(
          `http://localhost:8080/search-card?commanderName=${encodeURIComponent(commanderName)}`,
        );
        const card: ScryfallCard = await response.json();
        console.log(card);
        setCommanderObject(card);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCardData();
  }, [commanderName]);
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
    <div className="flex flex-col md:flex-col lg:flex-row flex-wrap w-full gap-10 items-start ml-10">
      <Commander commander={commanderObject} setCard={setCard} />
      <div className="flex flex-row gap-10 justify-center md:flex-col flex-1">
        <Creatures cards={creatures} setCard={setCard} />
        <Artifacts cards={artifacts} setCard={setCard} />
      </div>

      <div className="flex flex-row gap-10 justify-center md:flex-col flex-1">
        <Enchantments cards={enchantments} setCard={setCard} />
        <Instants cards={instants} setCard={setCard} />
      </div>

      <div className="flex flex-row gap-10 justify-center md:flex-col flex-1">
        <Sorceries cards={sorceries} setCard={setCard} />
        <Lands cards={lands} setCard={setCard} />
      </div>
    </div>
  );
}

function Commander({ commander, setCard }: CommanderProp) {
  return (
    <div>
      <div className="text-sm font-bold text-gray-800 ">Commander</div>
      <BasicList
        cardObject={commander}
        key={commander.id}
        card={commander.name}
        total={commander.total}
        setCard={setCard}
      />
    </div>
  );
}

function Enchantments({ cards, setCard }: CardListProps) {
  const total = cards.reduce((sum, card) => sum + card.total, 0);
  return (
    <div className="flex flex-col">
      <div className="text-sm font-bold text-gray-800 ">
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
      <div className="text-sm font-bold text-gray-800 border-gray-300">
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
      <div className="text-sm font-bold text-gray-800 border-gray-300">
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
      <div className="text-sm font-bold text-gray-800  border-gray-300 ">
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
      <div className="text-sm font-bold text-gray-800  border-gray-300 ">
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
      <div className="text-sm font-bold text-gray-800  border-gray-300">
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
