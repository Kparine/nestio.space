import React, { useContext } from "react";
import "./data-card.css";

import { StateContext } from "../../context/stateContext";
import moment from "moment";

const DataAvg = () => {
	const { state, dispatch } = useContext(StateContext);
	const { data, lowAvgStartTime } = state;

	const AvgAltitude = () => {
		if (data) {
			const totalDataEntries = data.length;

			let sum = data
				.map((datum) => datum.altitude)
				.reduce((prev, curr) => prev + curr, 0);
			let avg = sum / totalDataEntries;
			avg = avg.toFixed(2);

			// let avgPayload = {
			// 	avg,
			// 	time: moment(data.last_updated).format("hh:mm:ss"),
			// };

			// validateAvgAlt(avgPayload);

			if (avg === "NaN") return null;
			return <div>Avg Alt: {avg}</div>;
		}
	};

	// const validateAvgAlt = (currData) => {
	// 	const PARSE_FORMAT = "hh:mm:ss";
	// 	currData.time = moment(currData.time, PARSE_FORMAT);
	// 	if (currData.avg !== "NaN") {
	// 		if (
	// 			parseFloat(currData.avg) > 250 &&
	// 			Object.keys(lowAvgStartTime).length
	// 		) {
	// 			dispatch({ type: "SET_LOW_AVG_TIME", payload: {} });
	// 		}
	// 		if (
	// 			parseFloat(currData.avg) < 250 &&
	// 			!Object.keys(lowAvgStartTime).length
	// 		) {
	// 			console.log(" ******222------>>>>>>");
	// 			// dispatch({ type: "SET_LOW_AVG_TIME", payload: currData.time });
	// 		}
	// 		// 	const oneMinute = moment(lowAvgStartTime).add(5, "seconds");
	// 		// 	if (moment(currData.time, PARSE_FORMAT).isAfter(oneMinute)) {
	// 		// 		console.log(" ******---works--->>>>>>");
	// 		// 	}
	// 		// 	/** track time here and then trigger notification */
	// 	}
	// 	/**dispatch resume normal activities notification*/
	// };

	return <div>{AvgAltitude()}</div>;
};

export default DataAvg;
