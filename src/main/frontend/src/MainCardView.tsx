import { ScryfallCard } from './types';

type MainCardViewProps = {
  card: ScryfallCard;
};

function MainCardView({ card }: MainCardViewProps) {
  return (
    <div>
      {card.image_uris?.normal ? (
        <img
          src={card.image_uris.normal}
          alt={card.name}
          style={{ maxWidth: '300px', height: 'auto' }}
        />
      ) : (
        <div>No image available</div>
      )}
    </div>
  );
}

export default MainCardView;
