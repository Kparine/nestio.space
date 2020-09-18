import React, { useContext, useRef } from "react";
import { getData } from "../../utils/utils";
import { StateContext } from "../../context/stateContext";
import { useInterval } from "../../custom-hooks/useInterval";
import { select } from "d3";
import moment from "moment";

// const svg = d3
// 	.select("#chart-content")
// 	.append("svg")
// 	.attr("width", 500)
// 	.attr("height", 500);

const DataCard = () => {
	const svgRef = useRef();
	const svg = select(svgRef.current);

	const { state, dispatch } = useContext(StateContext);
	const { data } = state;

	useInterval(async () => {
		const res = await getData();
		dispatch({ type: "SET_DATA", payload: res.data });
	}, 1000);

	const currentAltitude = () => {
		if (!data.length) return null;
		let currentAlt = data[data.length - 1].altitude.toFixed(2);
		if (data[data.length - 1].altitude === "NaN") return null;
		return <div>Current Alt: {currentAlt}</div>;
	};

	const AvgAltitude = () => {
		if (data) {
			const totalDataEntries = data.length;

			let sum = data
				.map((datum) => datum.altitude)
				.reduce((prev, curr) => prev + curr, 0);
			let avg = sum / totalDataEntries;
			avg = avg.toFixed(2);

			let avgPayload = { avg, time: moment().format("hh:mm:ss") };
			if (avgPayload.avg === "NaN") return null;
			return <div>Avg Alt: {avgPayload.avg}</div>;
		}
	};

	return (
		<div className="data-card-container">
			<div className="data-card-content">
				Altitude
				<>{currentAltitude()}</>
				<>{AvgAltitude()}</>
			</div>
			<svg id="svg-content" ref={svgRef}></svg>
		</div>
	);
};

export default DataCard;
