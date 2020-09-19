import React, { useContext } from "react";
import "./data-card.css";

import { StateContext } from "../../context/stateContext";
import { useInterval } from "../../custom-hooks/useInterval";

import { getData } from "../../utils/utils";

const DataCurr = () => {
	const { state, dispatch } = useContext(StateContext);
	const { data } = state;

	useInterval(async () => {
		const res = await getData();
		dispatch({ type: "SET_DATA", payload: res.data });
	}, 2000);

	const currentAltitude = () => {
		if (!data.length) return null;
		let currentAlt = data[data.length - 1].altitude.toFixed(2);
		if (data[data.length - 1].altitude === "NaN") return null;
		return <div>Current Alt: {currentAlt}</div>;
	};
	return <>{currentAltitude()}</>;
};

export default DataCurr;
