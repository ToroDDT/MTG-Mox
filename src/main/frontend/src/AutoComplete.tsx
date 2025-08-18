import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useDebounce from './Hook';

type AutoCompleteList = {
	data: string[];
};

function AutoComplete() {
	const [input, setInput] = useState('');
	const [cards, setCards] = useState<string[]>([]);
	const [cardSelected, setCardSelected] = useState<string>('');
	const [selectedIndex, setSelectedIndex] = useState(1);
	
	const debouncedInput = useDebounce(input, 1000);

	useEffect(() => {
		const encodedValue = encodeURIComponent(cardSelected);
		fetch('http://localhost:8080/addCardToCommmaderDeck?card=' + encodedValue, {
			method: 'POST',
		});
	}, [cardSelected]);

	// 4️⃣ Fetch cards when debouncedInput changes
	useEffect(() => {
		if (!debouncedInput.trim()) return; // skip empty or whitespace-only input

		const fetchCards = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/autocomplete?card=${encodeURIComponent(debouncedInput)}`
				);
				const cardList: AutoCompleteList = await response.json();
				setCards(cardList.data || []);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchCards();
	}, [debouncedInput]);

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
							mt: 1,
							ml: 1,
							'& input::placeholder': {
								fontSize: '0.8rem', // Smaller placeholder text
								color: 'black', // Optional: custom color
							},
							fontSize: '0.7rem', // Make text smaller
							backgroundColor: 'white',
							borderRadius: 2,
							input: {
								padding: '4px',
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
						maxHeight: 200,
						overflowY: 'auto', // makes it scrollable vertically
						borderRadius: 1,
						boxShadow: 1,
						position: 'absolute',
					}}
				>
					{cards.length > 0 ? (
						<List component="nav" aria-label="secondary mailbox folder">
							{cards.map((card, index) => (
								<ListItemButton
									key={index}
									sx={{ py: 0.5, px: 1 }}
									selected={selectedIndex === index}
									onClick={() => {
										setSelectedIndex(index);
										setCardSelected(card);
									}}
								>
									<ListItemText
										primary={card}
										primaryTypographyProps={{ fontSize: '0.4' }}
									/>
								</ListItemButton>
							))}
						</List>
					) : null}
				</Box>
			</div>
		</>
	);
}

export default AutoComplete;
