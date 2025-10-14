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
          style={{
            width: '251.7px',
            height: '350px',
            borderRadius: '12px', // rounded corners
            objectFit: 'cover', // ensures the image fills the box without distortion
          }}
        />
      ) : (
        <div>No image available</div>
      )}
    </div>
  );
}

export default MainCardView;
