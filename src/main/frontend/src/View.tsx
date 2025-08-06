import { useState, useEffect } from 'react'
import { TextField, InputLabel, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function View() {
	const [view, setView] = useState('')
	const handleChange = (event: SelectChangeEvent) => {
		setView(event.target.value as string);
	};
	return (
		<>
			<div>
				<div>View</div>
				<FormControl fullWidth>
					<InputLabel id="View-layout">Age</InputLabel>
					<Select
						labelId="list-of-views"
						id="list-of-view"
						value={view}
						label="View"
						onChange={handleChange}
					>
						<MenuItem value={'Text'}>Text</MenuItem>
						<MenuItem value={'Condensed Text'}>Condensed Text</MenuItem>
						<MenuItem value={'Visual Grid'}>Visual Grid</MenuItem>
						<MenuItem value={'Visual Stacks'}>Visual Stacks</MenuItem>
					</Select>
				</FormControl>
			</div>
		</>
	)
}

export default View; 
