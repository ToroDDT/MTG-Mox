import React from 'react';
import { Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { ScryfallCard } from './types';

interface VendorButtonProps {
  url: string;
  price: string;
  label: string;
  outlined?: boolean;
}

interface CardActionsProps {
  card: ScryfallCard;
}

function VendorButton({ url, price, label, outlined }: VendorButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`flex justify-between items-center px-4 py-2 w-full text-left rounded ${
        outlined
          ? 'border border-purple-500 text-purple-500 hover:bg-purple-50'
          : 'bg-purple-500 text-white hover:bg-purple-600'
      }`}
    >
      <span className="truncate">{label}</span>
      <span className="ml-2">{price}</span>
    </a>
  );
}

function CardActions({ card }: CardActionsProps) {
  console.log(card);
  return (
    <div className="grid gap-2 ml-3 mt-4 max-w-[230px]">
      {/* Add to Wish List Button */}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ShoppingBagIcon />}
        className="w-full"
      >
        Add to Wish List
      </Button>

      {/* Vendor Buttons */}
      <VendorButton
        url={card.purchase_uris.tcgplayer}
        price={card.prices.usd}
        label="Buy @ TCGplayer"
      />
      <VendorButton
        url={card.purchase_uris.cardmarket}
        price=""
        label="Buy @ Card Market"
        outlined
      />
      <VendorButton
        url={card.purchase_uris.cardhoarder}
        price=""
        label="Buy @ Cardhoarder"
        outlined
      />

      <hr className="my-2 border-gray-300" />
    </div>
  );
}
export default CardActions;
