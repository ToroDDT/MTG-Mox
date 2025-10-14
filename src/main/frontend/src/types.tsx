export type CommanderDeckResponse = {
  data: ScryfallCard[];
};

export interface CardAPI {
  id: string;
  name: string;
  object: string;
  lang: string;
  uri: string;
  layout: string;
  highresImage: boolean;
  cmc: number;
  colors: string[];
  keywords: string[];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set: string;
  digital: boolean;
  rarity: string;
  artist: string;
  frame: string;
  fullArt: boolean;
  textless: boolean;
  booster: boolean;
  storySpotlight: boolean;
  imageUris: Record<string, string>;
  legalities: {
    standard: string;
    future: string;
    historic: string;
    timeless: string;
    gladiator: string;
    pioneer: string;
    modern: string;
    legacy: string;
    pauper: string;
    vintage: string;
    penny: string;
    commander: string;
    oathbreaker: string;
    standardbrawl: string;
    brawl: string;
    alchemy: string;
    paupercommander: string;
    duel: string;
    oldschool: string;
    premodern: string;
    predh: string;
  };
  prices: {
    usd: string | null;
    usd_foil: string | null;
    eur: string | null;
    eur_foil: string | null;
    tix: string | null;
  };
  relatedUris: Record<string, string>;
  purchaseUris: Record<string, string>;
  tcgplayer_id: number;
  cardmarket_id: number;
  released_at: string;
  scryfall_uri: string;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
}
export type ListLayoutSetter = {
  setListLayout: React.Dispatch<React.SetStateAction<ListLayout>>;
};
export type ListLayout = {
  view: 'Text' | 'Condensed Text' | 'Visual Grid' | 'Visual Stacks';
  sort: 'Price' | 'Name' | 'Rarity' | 'Mana-Value';
  group:
    | 'Type'
    | 'Sub-Type'
    | 'Rarity'
    | 'Set'
    | 'Color-Identity'
    | 'Mana-Value'
    | 'Color';
  card: string;
};

export type ScryfallCard = {
  object: string;
  id: string;
  oracle_id: string;
  total: number;
  multiverse_ids?: number[];
  mtgo_id?: number;
  tcgplayer_id?: number;
  cardmarket_id?: number;
  name: string;
  lang: string;
  released_at: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  image_uris?: {
    small?: string;
    normal?: string;
    large?: string;
    png?: string;
    art_crop?: string;
    border_crop?: string;
  };
  mana_cost?: string;
  cmc: number;
  type_line: string;
  oracle_text?: string;
  colors?: string[];
  color_identity: string[];
  keywords?: string[];
  legalities: Record<string, string>;
  games: string[];
  reserved: boolean;
  game_changer?: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: string;
  card_back_id: string;
  artist: string;
  artist_ids: string[];
  illustration_id?: string;
  border_color: string;
  frame: string;
  security_stamp?: string;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank?: number;
  penny_rank?: number;
  prices: {
    usd: string;
    usd_foil?: string;
    usd_etched: string;
    eur?: string | null;
    eur_foil?: string | null;
    tix?: string | null;
  };
  related_uris: Record<string, string>;
  purchase_uris: Record<string, string>;
};
