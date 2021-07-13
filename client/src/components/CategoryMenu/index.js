import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import {
	UPDATE_CATEGORIES,
	UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

function CategoryMenu() {
	const [state, dispatch] = useStoreContext();

	const { categories } = state;

	const { data: categoryData } = useQuery(QUERY_CATEGORIES);

	useEffect(() => {
		// if categoryData exists or has been changed from the response of useQuery, then run dispatch()
		if (categoryData) {
			// execute dispatch function with action object indicating the type of action and the data to set the state for categories to
			dispatch({
				type: UPDATE_CATEGORIES,
				categories: categoryData.categories,
			});
		}
	}, [categoryData, dispatch]);

	const handleClick = (id) => {
		dispatch({
			type: UPDATE_CURRENT_CATEGORY,
			currentCategory: id,
		});
	};

	return (
		<div>
			<h2>Choose a Category:</h2>
			{categories.map((item) => (
				<button
					key={item._id}
					onClick={() => {
						handleClick(item._id);
					}}
				>
					{item.name}
				</button>
			))}
		</div>
	);
}

export default CategoryMenu;
