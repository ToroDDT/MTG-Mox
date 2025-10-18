import { ScryfallCard } from './types';

type MainCardViewProps = {
  card: ScryfallCard;
};

function MainCardView({ card }: MainCardViewProps) {
  return (
    <div>
      {card.image_uris?.normal ? (
        <div
          style={{
            borderRadius: '10px',
            overflow: 'hidden', // ✅ this clips the image to the rounded shape
          }}
        >
          <img
            src={card.image_uris.normal}
            alt={card.name}
            style={{
              width: '299.7px',
              height: '100%',
              objectFit: 'cover',
              display: 'block', // removes small gap below image
            }}
          />
        </div>
      ) : (
        <div>No image available</div>
      )}
    </div>
  );
}

export default MainCardView;
