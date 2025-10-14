import React from 'react';
import { Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

interface VendorButtonProps {
  url: string;
  price: string;
  label: string;
  outlined?: boolean;
}

const VendorButton: React.FC<VendorButtonProps> = ({
  url,
  price,
  label,
  outlined,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`flex justify-between items-center px-4 py-2 w-full text-left rounded ${
        outlined
          ? 'border border-blue-500 text-blue-500 hover:bg-blue-50'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      <span className="truncate">{label}</span>
      <span className="ml-2">{price}</span>
    </a>
  );
};

const CardActions: React.FC = () => {
  return (
    <div className="grid gap-2 mt-4 max-w-[230px]">
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
        url="https://partner.tcgplayer.com/c/4949650/1830156/21018"
        price="$0.26"
        label="Buy @ TCGplayer"
      />
      <VendorButton
        url="https://www.cardkingdom.com/mtg/commander-masters/all-that-glitters"
        price="$0.69"
        label="Buy @ Card Kingdom"
        outlined
      />
      <VendorButton
        url="https://starcitygames.com/all-that-glitters-sgl-mtg-cmm-009-enn"
        price="$0.75"
        label="Buy @ StarCityGames"
        outlined
      />

      <hr className="my-2 border-gray-300" />

      {/* Sell Button */}
      <VendorButton
        url="#"
        price="$0.09"
        label="Sell @ Card Kingdom"
        outlined
      />
    </div>
  );
};

export default CardActions;
