import React, { useContext } from "react";
import "./data-card.css";

import { StateContext } from "../../context/stateContext";


const DataCurr = () => {
	const { state} = useContext(StateContext);
	const { data } = state;

	const currentAltitude = () => {
		if (!data.length) return null;
		let currentAlt = data[data.length - 1].altitude.toFixed(2);
		if (data[data.length - 1].altitude === "NaN") return null;
		return <div>Current Alt: {currentAlt}</div>;
	};
	return <div>{currentAltitude()}</div>;
};

export default DataCurr;
