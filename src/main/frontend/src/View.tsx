import { useState } from 'react'
import { FormControl, MenuItem, OutlinedInput } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {  ListLayoutSetter } from './types';

function View({setListLayout} : ListLayoutSetter) {
	const [view, setView] = useState('Text')
	const handleChange = (event: SelectChangeEvent) => {
		setView(event.target.value as string);
	};
	return (
		<>
			<div className='flex'>
				<div className='flex flex-row'>
					<div className='pt-3'>View</div>
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
							labelId="list-of-views"
							id="list-of-view"
							input={<OutlinedInput notched={false} />}
							value={view}
							label="View"
							className="h-8 text-sm"
							onChange={handleChange}
						>
							<MenuItem value={'Text'}>Text</MenuItem>
							<MenuItem value={'Condensed Text'}>Condensed Text</MenuItem>
							<MenuItem value={'Visual Grid'}>Visual Grid</MenuItem>
							<MenuItem value={'Visual Stacks'}>Visual Stacks</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
		</>
	)
}

export default View; 
