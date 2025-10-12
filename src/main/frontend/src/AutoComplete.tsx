import { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useDebounce from './Hook';

type AutoCompleteList = {
  data: string[];
};

type AutoCompleteProps = {
  fetchCards: () => void;
};

function AutoComplete({ fetchCards }: AutoCompleteProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [input, setInput] = useState('');
  const [cards, setCards] = useState<string[]>([]);
  const [cardSelected, setCardSelected] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddCard = async (card: string) => {
    try {
      // Wait for the backend call to finish
      await sendCardSelectedToDatabase(card);

      // Only after it's done, fetch the updated deck
      await fetchCards();
    } catch (error) {
      console.error('Error adding card or fetching deck:', error);
    }
  };

  async function sendCardSelectedToDatabase(card: string) {
    console.log('Form Submitted');
    try {
      const response = await fetch(
        'http://localhost:8080/addCardToCommmaderDeck',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(card),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Failed to retrieve card data from advance search:', error);
    }
  }

  const debouncedInput = useDebounce(input, 1000);

  // Send card selection to backend
  useEffect(() => {
    if (cardSelected == '') {
      return;
    }
    handleAddCard(cardSelected);
  }, [cardSelected]);

  // Fetch autocomplete list
  useEffect(() => {
    if (!debouncedInput.trim()) return;
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/autocomplete?card=${encodeURIComponent(debouncedInput)}`,
        );
        const cardList: AutoCompleteList = await response.json();
        setCards(cardList.data || []);
        setShowDropdown(true); // show dropdown when new results come in
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCards();
  }, [debouncedInput]);

  // Hide dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    if (cards.length > 0) {
      setShowDropdown(true);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <TextField
        id="outlined-controlled"
        placeholder="Find and add cards to main deck..."
        value={input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInput(event.target.value);
        }}
        onFocus={handleInputFocus}
        size="small"
        sx={{
          mt: 1,
          ml: 1,
          '& input::placeholder': {
            fontSize: '0.8rem',
            color: 'black',
          },
          fontSize: '0.7rem',
          backgroundColor: 'white',
          borderRadius: 2,
          input: { padding: '4px' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#cccccc',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            },
            '&:hover fieldset': { borderColor: '#999999' },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(128, 0, 128, 0.7)',
              boxShadow: '0 0 0 2px rgba(128, 0, 128, 0.2)',
            },
          },
        }}
      />

      {showDropdown && cards.length > 0 && (
        <Box
          sx={{
            width: '100%',
            maxWidth: 250,
            bgcolor: 'background.paper',
            maxHeight: 200,
            overflowY: 'auto',
            borderRadius: 1,
            boxShadow: 1,
            position: 'absolute',
            zIndex: 1,
          }}
        >
          <List component="nav" aria-label="secondary mailbox folder">
            {cards.map((card, index) => (
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                  setCardSelected(card);
                  setShowDropdown(false); // hide after selection
                }}
              >
                <ListItemText primary={card} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </div>
  );
}

export default AutoComplete;
