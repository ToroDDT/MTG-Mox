import { useState } from 'react'
import { InputLabel, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Group() {
	const [group, setGroupView] = useState('')
	const handleChange = (event: SelectChangeEvent) => {
		setGroupView(event.target.value as string);
	};
	return (
		<>
			<FormControl fullWidth>
				<InputLabel id="Group-layout">Age</InputLabel>
				<Select
					labelId="list-of-groups"
					id="list-of-groups"
					value={group}
					label="Group"
					onChange={handleChange}
				>
					<MenuItem value={'Type'}>Type</MenuItem>
					<MenuItem value={'Sub-Type'}>Sub-Type</MenuItem>
					<MenuItem value={'Rarity'}>Rarity</MenuItem>
					<MenuItem value={'Set'}>Set</MenuItem>
					<MenuItem value={'Color-Identity'}>Color-Identity</MenuItem>
					<MenuItem value={'Mana-Value'}>Mana-Value</MenuItem>
					<MenuItem value={'Rarity'}>Rarity</MenuItem>
					<MenuItem value={'Color'}>Color</MenuItem>

				</Select>
			</FormControl>
		</>
	)
}


export default Group;

