import BasicList from "./BasicList";
import { ScryfallCard } from "./types";

function CardGroupByType({ cards }: { cards: ScryfallCard[] }) {
	const listOfCard = cards.map(card => <BasicList card={card.name} />)
	return (
		<>
			{listOfCard}
		</>
	)
}

export default CardGroupByType; 
