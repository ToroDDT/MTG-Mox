import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { ScryfallCard } from './types';

export default function BasicList({
  card,
  total,
  setCard,
  cardObject,
}: {
  card: string;
  total: number;
  setCard: React.Dispatch<React.SetStateAction<ScryfallCard>>;
  cardObject: ScryfallCard;
}) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        bgcolor: 'background.paper',
      }}
    >
      <nav aria-label="card list">
        <Divider
          sx={{
            my: 0.25,
            width: {
              xs: '70%',
              sm: '70%',
              md: '470px',
              lg: '200px', // large desktops
              xl: '270px', // very large / ultra-wide
            },
            alignSelf: 'center',
          }}
        />
        <List disablePadding>
          <ListItem
            onMouseEnter={() => setCard(cardObject)}
            disablePadding
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              minHeight: 28,
              maxWidth: 170,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                fontWeight: 500,
                minWidth: 16,
              }}
            >
              {total}
            </Typography>
            <ListItemText
              primary={card}
              primaryTypographyProps={{
                fontSize: '0.95rem',
                fontWeight: 400,
              }}
            />
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
