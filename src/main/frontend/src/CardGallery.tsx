import { useState, useEffect } from "react";
import CardGroupByType from "./CardGroupByType";
import { CommanderDeckResponse, ScryfallCard } from "./types";


function CardGallery() {
	const [cards, setCards] = useState<ScryfallCard[]>([]);

	useEffect(() => {
		fetch(
			`http://localhost:8080/commander-deck`,
			{
				method: 'GET',
			},
		)
			.then((response) => response.json() as Promise<CommanderDeckResponse>)
			.then((cardList) => {
				setCards(cardList.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});

	}, []);

	return (
		<>
			<div>
				<CardGroupByType cards={cards} />
			</div>
		</>
	)
}

export default CardGallery
