import { useState, useEffect } from 'react'
import { TextField, InputLabel, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Group() {

	const [sort, setSort] = useState('')
	const handleChange = (event: SelectChangeEvent) => {
		setSort(event.target.value as string);
	};
	return (
		<>
			<FormControl fullWidth>
				<InputLabel id="Sort-layout">Age</InputLabel>
				<Select
					labelId="list-of-sort"
					id="list-of-sort"
					value={sort}
					label="Sort"
					onChange={handleChange}
				>
					<MenuItem value={'Price'}>Price</MenuItem>
					<MenuItem value={'Name'}>Name</MenuItem>
					<MenuItem value={'Rarity'}>Rarity</MenuItem>
					<MenuItem value={'Mana-Value'}>Mana-Value</MenuItem>

				</Select>
			</FormControl>
		</>
	)
}

