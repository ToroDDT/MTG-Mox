import { createContext } from 'react';
import { ListLayout } from './types';

let layout: ListLayout = { 
	view: "text",
	sort: "price",
	group: "type",
	card: "", 
	setGroup: 
}

const CardLayoutAndInfoContext= createContext(layout);
 
export default CardLayoutAndInfoContext; 
