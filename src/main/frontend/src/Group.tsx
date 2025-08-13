import { useState } from 'react'
import { FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';
function Group() {
	const [group, setGroupView] = useState('Type')
	const handleChange = (event: SelectChangeEvent) => {
		setGroupView(event.target.value as string);
	};
	return (
		<>
			<div className='flex '>
			<div className='pt-3'>Group</div>
			<FormControl sx={{
				width: '70%',
				margin: '10px',
				mt: 1,
				ml: 1,
				backgroundColor: 'white',
				borderRadius: 2,
				'& .MuiOutlinedInput-root': {
					fontSize: '0.8rem', // Make text smaller
					input: {
						padding: '4px',
					},
					'& fieldset': {
						borderColor: '#cccccc',
						transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
					},
					'&:hover fieldset': {
						borderColor: '#999999',
					},
					'&.Mui-focused fieldset': {
						borderColor: 'rgba(128, 0, 128, 0.7)', // purple focus
						boxShadow: '0 0 0 2px rgba(128, 0, 128, 0.2)',
					},
				},
			}}>
				<Select
					labelId="list-of-groups"
					id="list-of-groups"
					value={group}
					label="Group"
					input={<OutlinedInput notched={false} />}
					onChange={handleChange}
					className="h-8 text-sm"

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
			</div>

		</>
	)
}


export default Group;

