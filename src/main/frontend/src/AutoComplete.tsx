import { useState, useEffect } from 'react'
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
type autoCompleteList = {
  data: string[];
};

function AutoComplete() {
  const [input, setInput] = useState("");
  const [cards, setCards] = useState<string[]>([]);
  const [cardSelected, setCardSelected] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(1);
  useEffect(() => {
    const encodedValue = encodeURIComponent(cardSelected)
    fetch('http://localhost:8080/addCardToCommmaderDeck?card=' + encodedValue, {
      method: "POST",
    })
  }, [cardSelected]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(`http://localhost:8080/autocomplete?card=${encodeURIComponent(input)}`, {
        method: "GET",
      })
        .then((response) => response.json() as Promise<autoCompleteList>)
        .then((cardList) => {
          if (cardList.data.length === 0) {
            setCards(["no cards found..."]);
          } else {
            setCards(cardList.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 1000); // Waits 1s after last keystroke

    return () => {
      clearTimeout(timeout); // cancel timeout if input changes
    };
  }, [input]);
  return (
    <>
      <div>
        <div>
          <TextField
            id="outlined-controlled"
            placeholder="Find and add cards to main deck..."
            value={input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInput(event.target.value);
            }}
            size="small"
            sx={{
              mt: 2,
              mb: 1,
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 1,
              input: {
                padding: '7px',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#cccccc', // default border color
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                },
                '&:hover fieldset': {
                  borderColor: '#999999', // hover border
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(128, 0, 128, 0.7)', // purple with transparency
                  boxShadow: '0 0 0 2px rgba(128, 0, 128, 0.2)', // purple glow
                },
              },
            }}
          />
        </div>
        <Box
          sx={{
            width: '100%',
            maxWidth: 250,
            bgcolor: 'background.paper',
            maxHeight: 300,
            overflowY: 'auto', // makes it scrollable vertically
            borderRadius: 1,
            boxShadow: 1,
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
                }}
              >
                <ListItemText primary={card} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </div>
    </>
  );
}

export default AutoComplete;
