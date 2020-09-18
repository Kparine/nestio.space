import React, { useContext, useRef } from "react";
import { getData } from "../../utils/utils";
import { StateContext } from "../../context/stateContext";
import { useInterval } from "../../custom-hooks/useInterval";
import { select } from "d3";

// const fakeData = [
// 	{ altitude: 134, time: "1203" },
// 	{ altitude: 167, time: "1204" },
// 	{ altitude: 154, time: "1205" },
// 	{ altitude: 145, time: "1206" },
// 	{ altitude: 187, time: "1207" },
// 	{ altitude: 198, time: "1208" },
// 	{ altitude: 121, time: "1209" },
// 	{ altitude: 135, time: "1210" },
// 	{ altitude: 123, time: "1211" },
// ];

// const svg = d3
// 	.select("#chart-content")
// 	.append("svg")
// 	.attr("width", 500)
// 	.attr("height", 500);

const DataCard = () => {
	const svgRef = useRef();
	const svg = select(svgRef.current);

	const { state, dispatch } = useContext(StateContext);

	/**
	const { data } = state;
	useInterval(async () => {
		const res = await getData();
		dispatch({ type: "SET_DATA", payload: res.data });
	}, 2000);
*/
	const formatData = (data) => {
		if (data) data = data.toFixed(2);

		if (data < 160) {
			validateAltitude(data);
		}

		return data;
	};

	const validateAltitude = () => {
		console.log("data ******------>>>>>>", data);
	};

	const data = [
		{ altitude: 134, last_updated: "2020-09-18T16:38:00" },
		{ altitude: 167, last_updated: "2020-09-18T16:38:01" },
		{ altitude: 154, last_updated: "2020-09-18T16:38:02" },
		{ altitude: 145, last_updated: "2020-09-18T16:38:03" },
		{ altitude: 187, last_updated: "2020-09-18T16:38:04" },
		{ altitude: 198, last_updated: "2020-09-18T16:38:05" },
		{ altitude: 121, last_updated: "2020-09-18T16:38:06" },
		{ altitude: 135, last_updated: "2020-09-18T16:38:07" },
		{ altitude: 123, last_updated: "2020-09-18T16:38:08" },
	];

	return (
		<div className="data-card-container">
			<div className="data-card-content">
				Altitude
				<>
					{data.map((datum) => {
						console.log("datum ******------>>>>>>", datum);

						return <div>{formatData(datum.altitude)}</div>;
					})}
				</>
			</div>
			<svg id="svg-content" ref={svgRef}></svg>
		</div>
	);
};

export default DataCard;
