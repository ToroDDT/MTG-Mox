import { useState } from 'react'
import { FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';
import { ListLayoutSetter } from './types';
function Sort({ setListLayout }: ListLayoutSetter) {

	const [sort, setSort] = useState('Price')
	const handleChange = (event: SelectChangeEvent) => {
		setSort(event.target.value as string);
		setListLayout(prev => ({
			...prev,
			sort: event.target.value as "Price" | "Name" | "Rarity" | "Mana-Value"
		}));
	};
	return (
		<>
			<div className='flex'>
				<div className='pt-3'>Sort</div>
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
						labelId="list-of-sort"
						id="list-of-sort"
						value={sort}
						label="Sort"
						onChange={handleChange}
						input={<OutlinedInput notched={false} />}
						className="h-8 text-xs"

					>
						<MenuItem value={'Price'}>Price</MenuItem>
						<MenuItem value={'Name'}>Name</MenuItem>
						<MenuItem value={'Rarity'}>Rarity</MenuItem>
						<MenuItem value={'Mana-Value'}>Mana-Value</MenuItem>

					</Select>
				</FormControl>
			</div>

		</>
	)
}


export default Sort; 
