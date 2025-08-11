
//Get the amount of each type to be passed down to CardGroupbasedOnType 
//We need to pass card array to this specif group 
//List all types: Instand, Sorcery, Land, Artifact, Enchantment
// Get number of each category 

function CardGroupBasedOnType({ cards }: { cards: string[] }) {
	return <div>{cards}</div>;
}
export default CardGroupBasedOnType; 
