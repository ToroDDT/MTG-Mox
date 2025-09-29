import { useState } from "react";
import BasicList from "./BasicList";
import { ScryfallCard } from "./types";

interface CardListProps {
	cardList: ScryfallCard[];
	editCardList: (revisedCardList: ScryfallCard[]) => void;
}

function CardGroupByType({ cards }: { cards: ScryfallCard[] }) {

	const [cardList, setCardList] = useState<ScryfallCard[]>(cards)

	const editCardList = (revisedCardList: ScryfallCard[]) => {
		setCardList(revisedCardList)
	}

	return (
		<>
			<Creatures cardList={cardList} editCardList={editCardList} />
			<Enchantments cardList={cardList} editCardList={editCardList} />
			<Artifacts cardList={cardList} editCardList={editCardList} />
			<Instants cardList={cardList} editCardList={editCardList} />
		</>
	)
}



function Creatures({ cardList, editCardList }: CardListProps) {

	const checkForCreatures = (cards: ScryfallCard[]) => {
		// make a shallow copy of cards in order not to mutate prop value
		let cardList = [...cards]
		let revisedCardList: ScryfallCard[] = [];
		let card;


		// Create a loop that starts at the end of the array
		// continues until the array length is zero
		// if array length is zero return
		for (let i = cardList.length - 1; i >= 0; i--) {
			if (cardList.length == 0) {
				return
			}
			// store the pop value 
			card = cardList.pop()!

			revisedCardList.push(card)


			//if pop value is equal to ..
			if (card?.type_line.includes("Creature")) {

				<div>
					<div>Creatures ({cardList.length})</div>
					{cardList.map(card => <BasicList card={card.name} />)}

				</div>

			}
		}
		editCardList(cardList)

	}

	return (
		<>
			{checkForCreatures(cardList)}
		</>
	)

}

function Enchantments({ cardList, editCardList }: CardListProps) {
	const checkForEnchantments = (cards: ScryfallCard[]) => {
		// make a shallow copy of cards in order not to mutate prop value
		let cardList = [...cards]
		let revisedCardList: ScryfallCard[] = [];
		let card;


		// Create a loop that starts at the end of the array
		// continues until the array length is zero
		// if array length is zero return
		for (let i = cardList.length - 1; i >= 0; i--) {
			if (cardList.length == 0) {
				return
			}
			// store the pop value 
			card = cardList.pop()!

			revisedCardList.push(card)


			//if pop value is equal to ..
			if (card?.type_line.includes("Enchantment")) {

				<div>
					<div>Enchantments ({cardList.length})</div>
					{cardList.map(card => <BasicList card={card.name} />)}

				</div>

			}
		}
		editCardList(cardList)

	}

	return (
		<>
			{checkForEnchantments(cardList)}
		</>
	)



}

function Artifacts({ cardList, editCardList }: CardListProps) {
	const checkForArtifacts = (cards: ScryfallCard[]) => {
		// make a shallow copy of cards in order not to mutate prop value
		let cardList = [...cards]
		let revisedCardList: ScryfallCard[] = [];
		let card;


		// Create a loop that starts at the end of the array
		// continues until the array length is zero
		// if array length is zero return
		for (let i = cardList.length - 1; i >= 0; i--) {
			if (cardList.length == 0) {
				return
			}
			// store the pop value 
			card = cardList.pop()!

			revisedCardList.push(card)


			//if pop value is equal to ..
			if (card?.type_line.includes("Artifact")) {

				<div>
					<div>Artifacts ({cardList.length})</div>
					{cardList.map(card => <BasicList card={card.name} />)}

				</div>

			}
		}
		editCardList(cardList)

	}

	return (
		<>
			{checkForArtifacts(cardList)}
		</>
	)

}


function Sorceries({ cardList, editCardList }: CardListProps) {
	const checkForSorceries = (cards: ScryfallCard[]) => {
		// make a shallow copy of cards in order not to mutate prop value
		let cardList = [...cards]
		let revisedCardList: ScryfallCard[] = [];
		let card;


		// Create a loop that starts at the end of the array
		// continues until the array length is zero
		// if array length is zero return
		for (let i = cardList.length - 1; i >= 0; i--) {
			if (cardList.length == 0) {
				return
			}
			// store the pop value 
			card = cardList.pop()!

			revisedCardList.push(card)


			//if pop value is equal to ..
			if (card?.type_line.includes("Sorcery")) {

				<div>
					<div>Sorceries ({cardList.length})</div>
					{cardList.map(card => <BasicList card={card.name} />)}

				</div>

			}
		}
		editCardList(cardList)

	}
	return (
		<>
			{checkForSorceries(cardList)}
		</>
	)



}

function Instants({ cardList, editCardList }: CardListProps) {

	const checkForInstants = (cards: ScryfallCard[]) => {
		// make a shallow copy of cards in order not to mutate prop value
		let cardList = [...cards]
		let revisedCardList: ScryfallCard[] = [];
		let card;


		// Create a loop that starts at the end of the array
		// continues until the array length is zero
		// if array length is zero return
		for (let i = cardList.length - 1; i >= 0; i--) {
			if (cardList.length == 0) {
				return
			}
			// store the pop value 
			card = cardList.pop()!

			revisedCardList.push(card)


			//if pop value is equal to ..
			if (card?.type_line.includes("Instant")) {

				<div>
					<div>Instants ({cardList.length})</div>
					{cardList.map(card => <BasicList card={card.name} />)}

				</div>

			}
		}
		editCardList(cardList)

	}

	return (
		<>
			{checkForInstants(cardList)}
		</>
	)

}


export default CardGroupByType; 
