import { useState, useEffect } from "react";
import CardGroupBasedOnType from "./CardGroupBasedOnType";
import View from "./View";
import Group from "./Group";
import Sort from "./Sort"

function CardGallery() {
	const [cards, setCards] = useState<string[]>([])
	useEffect(() => {
		fetch('http://localhost:8080/commander-deck', {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((cardlist) => {
				if (cardlist.data?.length > 0) {
					setCards(cardlist.data);
				}
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []); // 
	return (
		<>
			<div>
				<View />
				<Group />
				<Sort />
			</div>
			<div>
				<CardGroupBasedOnType
					cards={cards}
				/>
			</div>

		</>)
}

export default CardGallery; 
