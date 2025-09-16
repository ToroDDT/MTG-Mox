import { ListLayoutSetter } from "./types";
import View from "./View";
import Sort from "./Sort";
import Group from "./Group";

function CardGallery({ setListLayout }: ListLayoutSetter) {
		return (
		<>
			<div className="flex flex-row justify-between">
				<View setListLayout={setListLayout} />
				<Sort setListLayout={setListLayout} />
				<Group setListLayout={setListLayout} />
			</div>
		</>
	)
}

export default CardGallery; 
