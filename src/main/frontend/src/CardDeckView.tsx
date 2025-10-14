import CardGroupByType from './CardGroupByType';
import { ScryfallCard, ListLayout } from './types';

type CardViewProps = {
  listLayout: ListLayout;
  cards: ScryfallCard[];
  setCard: React.Dispatch<React.SetStateAction<ScryfallCard | undefined>>;
};

function CardDeckView({ listLayout, cards, setCard }: CardViewProps) {
  if (listLayout.group == 'Type') {
    return <CardGroupByType cards={cards} setCard={setCard} />;
  }
}

export default CardDeckView;

// How do i make to seperate child elements effect one another
// one child componenet makes a change to the database
// I want the other child element to update its component after the othe child component makes the update
// How do i make one component trigger another component
// I can Have a parent component be responsible for that
// Have the parent component have the fetch function and pass the the values to the child component
