import React, { useContext } from "react";
import "./data-card.css";

import { StateContext } from "../../context/stateContext";

const DataCurr = () => {
	const { state } = useContext(StateContext);
	const { data } = state;

	const currentAltitude = () => {
		if (!data.length) return null;
		if (isNaN(data[data.length - 1].altitude)) return null;
		let currentAlt = data[data.length - 1].altitude.toFixed(2);
		return <div>Curr. Alt.: {currentAlt} km</div>;
	};
	return currentAltitude();
};

export default DataCurr;
