import { useState, useEffect } from 'react';
import Profile from './Profile';
import Nav from './Nav';
import AutoComplete from './AutoComplete';
import AdvanceSearch from './AdvanceSearch';
import CardGallery from './CardGallery';
import { ListLayout, ScryfallCard, CommanderDeckResponse } from './types';
import CardDeckView from './CardDeckView';
import DeckFooter from './DeckFooter';
import CardActions from './CardPrices';
import MainCardView from './MainCardView';

interface UserResponse {
  commander: string;
  userName: string;
}

export interface DeckInformation {
  total: number;
  sideBoard: number;
  price: number;
}

function App() {
  const [card, setCard] = useState<ScryfallCard>(initialCardState);
  const [deckInformation, setDeckInformation] = useState<DeckInformation>({
    total: 0,
    sideBoard: 0,
    price: 0,
  });
  const [listlayout, setListLayout] = useState<ListLayout>({
    sort: 'Price',
    group: 'Type',
    view: 'Text',
    card: '',
  });
  const [commander, setCommander] = useState<string>('Necrobloom');
  const [name, setName] = useState<string>('');
  const [cards, setCards] = useState<ScryfallCard[]>([]);

  const fetchCardDeck = async () => {
    try {
      const response = await fetch('http://localhost:8080/commander-deck', {
        method: 'GET',
      });
      const cardList: CommanderDeckResponse = await response.json();
      setCards(cardList.data); // update state with the latest deck
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    // Make the HTTP request when the component mounts
    fetch('http://localhost:8080/user')
      .then((res) => res.json() as Promise<UserResponse>)
      .then((data) => {
        setCommander(data?.commander ?? 'No Commander has been chosen');
        setName(data?.userName ?? 'Unknown');
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
            <AutoComplete fetchCards={fetchCardDeck} />
            <AdvanceSearch fetchCards={fetchCardDeck} />
          </div>

          {/* Right side */}
          <div className="flex">
            <CardGallery setListLayout={setListLayout} />
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div>
          <MainCardView card={card} />
          <CardActions />
        </div>

        <CardDeckView listLayout={listlayout} cards={cards} setCard={setCard} />
      </div>
      <DeckFooter deck={deckInformation} />
    </>
  );
}

export const initialCardState: ScryfallCard = {
  object: '',
  id: '',
  oracle_id: '',
  total: 0,
  multiverse_ids: [],
  mtgo_id: 0,
  tcgplayer_id: 0,
  cardmarket_id: 0,
  name: '',
  lang: '',
  released_at: '',
  uri: '',
  scryfall_uri: '',
  layout: '',
  highres_image: false,
  image_status: '',
  image_uris: {
    small: '',
    normal: '',
    large: '',
    png: '',
    art_crop: '',
    border_crop: '',
  },
  mana_cost: '',
  cmc: 0,
  type_line: '',
  oracle_text: '',
  colors: [],
  color_identity: [],
  keywords: [],
  legalities: {},
  games: [],
  reserved: false,
  game_changer: false,
  foil: false,
  nonfoil: false,
  finishes: [],
  oversized: false,
  promo: false,
  reprint: false,
  variation: false,
  set_id: '',
  set: '',
  set_name: '',
  set_type: '',
  set_uri: '',
  set_search_uri: '',
  scryfall_set_uri: '',
  rulings_uri: '',
  prints_search_uri: '',
  collector_number: '',
  digital: false,
  rarity: '',
  card_back_id: '',
  artist: '',
  artist_ids: [],
  illustration_id: '',
  border_color: '',
  frame: '',
  security_stamp: '',
  full_art: false,
  textless: false,
  booster: false,
  story_spotlight: false,
  edhrec_rank: 0,
  penny_rank: 0,
  prices: {
    usd: '',
    usd_foil: '',
    usd_etched: '',
    eur: '',
    eur_foil: '',
    tix: '',
  },
  related_uris: {},
  purchase_uris: {},
};
export default App;
