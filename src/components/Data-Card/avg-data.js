import React, { useContext } from "react";
import { StateContext } from "../../context/stateContext";
import "./data-card.css";

const DataAvg = () => {
	const { state } = useContext(StateContext);
	const { avg } = state;
	if (isNaN(avg)) return null;
	return <div>Average Altitude: {avg} km</div>;
};

export default DataAvg;
