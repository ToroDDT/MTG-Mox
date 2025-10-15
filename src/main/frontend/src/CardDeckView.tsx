import CardGroupByType from './CardGroupByType';
import { ScryfallCard, ListLayout } from './types';

type CardViewProps = {
  listLayout: ListLayout;
  cards: ScryfallCard[];
  setCard: React.Dispatch<React.SetStateAction<ScryfallCard>>;
  commander: string;
};

function CardDeckView({
  listLayout,
  cards,
  setCard,
  commander,
}: CardViewProps) {
  if (listLayout.group == 'Type') {
    return (
      <CardGroupByType cards={cards} setCard={setCard} commander={commander} />
    );
  }
}

export default CardDeckView;
