import React, { useContext } from "react";
import "./data-card.css";

import { StateContext } from "../../context/stateContext";

const DataCurr = () => {
	const { state } = useContext(StateContext);
	const { satData } = state;

	const currentAltitude = () => {
		if (!satData.length) return null;
		if (isNaN(satData[satData.length - 1].altitude)) return null;
		let currentAlt = satData[satData.length - 1].altitude;
		return <div>Current Altitude: {currentAlt} km</div>;
	};
	return currentAltitude();
};

export default DataCurr;
