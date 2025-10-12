import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';

export default function BasicList({ card }: { card: string }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 250, // narrower
        bgcolor: 'background.paper',
        fontSize: '0.85rem', // smaller text
      }}
    >
      <nav aria-label="main mailbox folders">
        <List disablePadding>
          <ListItem disablePadding sx={{ minHeight: 32, maxWidth: 170 }}>
            <ListItemButton sx={{ py: 0.5, px: 1.0 }}>
              <ListItemText
                primary={card}
                primaryTypographyProps={{
                  fontSize: '0.8rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider sx={{ my: 0.5, maxWidth: 170 }} />{' '}
      {/* smaller spacing around divider */}
    </Box>
  );
}
