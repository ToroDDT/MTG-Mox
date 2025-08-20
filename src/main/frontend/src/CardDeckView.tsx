import { useState, useEffect } from "react";
import CardGroupByType from "./CardGroupByType";
import { ScryfallCard, CommanderDeckResponse, ListLayout } from "./types";

type CardViewProps = {
	listLayout: ListLayout
}
function CardDeckView({ listLayout }: CardViewProps) {
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
	}, [listLayout]);

	if (listLayout.group == "Type") {
		return (<CardGroupByType cards={cards} />)
	}
}

// what is the problem that im having right now
// so I need to list out the cards based on these charateristics such as view, group, and sort
// The backend to sort the cards, the logic can reside there. 
// the frontend can deal with how they cards are displayed and and the grouping 
// So the key values would be Group and View
// Should i create a component for each of these 


// Create a component Called CardGroup, this will be a reusable component 
// Create an array /

// I need to create a sorting algorithmn for 
// Problem: I have an array of [instant, sorcery, instant, land, enchantment, artifact, instant]
// My Goal: to be sorted in this way [instant, instant, instant, sorcery, enchantment, artifact]
// Create a varaiable called type
// Create a varialbe called OrderGroupList = []
// Create a variable called group intialized as this let group = []
// loop through array, check first element and assign the element to variable 
// remove element form array add it to group []
// continue loop and add each element that mathces type variable and remove from list 
// when loop is over add group array to OrdergroupList


// what props will this component have? it wll take in group and view
// it will also take in an array of objects. 
// loop through each of array of objects
// check group type 
// add objects type to a specific type component  for exmample subtype component, each of these components will have a list 
//

export default CardDeckView; 
