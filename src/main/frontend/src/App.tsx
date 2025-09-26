import { useState, useEffect } from "react";
import Profile from "./Profile";
import Nav from "./Nav";
import AutoComplete from "./AutoComplete";
import AdvanceSearch from "./AdvanceSearch";
import CardGallery from "./CardGallery";
import { ListLayout, ScryfallCard, CommanderDeckResponse } from "./types";
import CardDeckView from "./CardDeckView";

interface UserResponse {
	commander: string;
	userName: string;
}

function App() {
	const [listlayout, setListLayout] = useState<ListLayout>({ sort: "Price", group: "Type", view: "Text", card: "" })
	const [commander, setCommander] = useState<string>("Necrobloom");
	const [name, setName] = useState<string>("")
	const [cards, setCards] = useState<ScryfallCard[]>([]);

	const fetchCardDeck = async () => {
		try {
			const response = await fetch("http://localhost:8080/commander-deck", { method: "GET" });
			const cardList: CommanderDeckResponse = await response.json();
			setCards(cardList.data); // update state with the latest deck
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	useEffect(() => {
		// Make the HTTP request when the component mounts
		fetch('http://localhost:8080/user')
			.then((res) => res.json() as Promise<UserResponse>)
			.then((data) => {
				setCommander(data?.commander ?? "No Commander has been chosen");
				setName(data?.userName ?? "Unknown");
			})
			.catch((error) => {
				console.error('Error fetching users:', error);
			});
	}, [listlayout]); // <-- empty array = run only once when the component mounts
	return (
		<>
			<Nav />
			<Profile commander={commander} name={name} />
			<div className="flex flex-col text-left w-full">
				<div className="flex flex-row w-full justify-between">
					{/* Left side */}
					<div className="flex space-x-2">
						<AutoComplete setListLayout={setListLayout} />
						<AdvanceSearch fetchCards={fetchCardDeck} />
					</div>

					{/* Right side */}
					<div className="flex">
						<CardGallery setListLayout={setListLayout} />
					</div>
				</div>
			</div>
			<CardDeckView listLayout={listlayout} cards={cards} />
		</>
	)
}

export default App;
