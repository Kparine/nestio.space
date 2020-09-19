import React, { useContext, useEffect } from "react";
import "./data-card.css";
import DataCurr from "./curr-data";
import DataAvg from "./avg-data";
import { getData } from "../../utils/utils";
import { useInterval } from "../../custom-hooks/useInterval";
import {
	SET_DATA_ACTION,
	SET_AVERAGE_ACTION,
	INCREMENT_WARNING_ACTION,
	RESET_WARNING_TIME_ACTION,
} from "../../constants/action-constants";
import {
	LOW_AVG_PARAM,
	POLLING_INTERVAL_PARAM,
} from "../../constants/param-constants";
import { StateContext } from "../../context/stateContext";

const avgAltitude = (data) => {
	const totalDataEntries = data.length;
	if (data.length) {
		let sum = data
			.map((datum) => datum.altitude)
			.reduce((prev, curr) => prev + curr, 0);
		let avg = sum / totalDataEntries;
		avg = avg.toFixed(2);

		return avg;
	}
};

const DataCard = () => {
	const { state, dispatch } = useContext(StateContext);
	const { data } = state;

	useEffect(() => {
		async function asyncEffect() {
			const res = await getData();
			dispatch({ type: SET_DATA_ACTION, payload: res.data });
		}
		asyncEffect();
	}, []);

	useInterval(async () => {
		const res = await getData();
		const avg = avgAltitude(data);
		dispatch({ type: SET_AVERAGE_ACTION, payload: avg });
		dispatch({ type: SET_DATA_ACTION, payload: res.data });

		if (avg < LOW_AVG_PARAM) {
			console.log("is low");
			dispatch({
				type: INCREMENT_WARNING_ACTION,
				payload: POLLING_INTERVAL_PARAM,
			});
		} else if (data.warningTime !== 0) {
			dispatch({ type: RESET_WARNING_TIME_ACTION });
		}
	}, POLLING_INTERVAL_PARAM);

	return (
		<div className="data-card-container">
			<div className="data-card-content">
				{!data.length ? (
					<div className="spinner">
						<div className="bar1"></div>
						<div className="bar2"></div>
						<div className="bar3"></div>
						<div className="bar4"></div>
						<div className="bar5"></div>
					</div>
				) : null}
				<DataCurr />
				<DataAvg />
			</div>
		</div>
	);
};

export default DataCard;
