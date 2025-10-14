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
        maxWidth: 250,
        bgcolor: 'background.paper',
      }}
    >
      <nav aria-label="card list">
        <Divider sx={{ my: 0.25, maxWidth: 170 }} />
        <List disablePadding>
          <ListItem
            onMouseEnter={() => setCard(cardObject)}
            disablePadding
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              minHeight: 28, // slightly tighter
              maxWidth: 170,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }, // responsive font sizes
                fontWeight: 500,
                minWidth: 16,
              }}
            >
              {total}
            </Typography>
            <ListItemText
              primary={card}
              primaryTypographyProps={{
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                fontWeight: 400,
              }}
            />
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
