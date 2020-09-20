import React, { useContext, useEffect } from "react";
import "./data-card.css";
import DataCurr from "./curr-data";
import DataAvg from "./avg-data";
import { getData } from "../../utils/utils";
import { useInterval } from "../../custom-hooks/useInterval";
import moment from "moment";
import {
	SET_DATA_ACTION,
	SET_AVERAGE_ACTION,
	INCREMENT_WARNING_ACTION,
	RESET_WARNING_TIME_ACTION,
	SET_NOTIFICATION_ACTION,
	SET_PREV_LOW_ACTION,
} from "../../constants/action-constants";
import {
	LOW_AVG_PARAM,
	POLLING_INTERVAL_PARAM,
	WARNING_TIME_PARAM,
} from "../../constants/param-constants";
import { StateContext } from "../../context/stateContext";

const avgAltitude = (prevData) => {
	const totalDataEntries = prevData.length;
	if (prevData.length) {
		let sum = prevData
			.map((datum) => datum.altitude)
			.reduce((prev, curr) => prev + curr, 0);

		let avg = sum / totalDataEntries;
		avg = parseFloat(avg.toFixed(2));
		return avg;
	}
};
const processData = (datum) => {
	let processed = {
		altitude: parseFloat(datum.altitude.toFixed(2)),
		last_updated: moment(datum.last_updated).format("hh:mm:ss"),
	};
	return processed;
};

const DataCard = () => {
	const { state, dispatch } = useContext(StateContext);
	const { satData, warningTime, prevLow } = state;

	useEffect(() => {
		async function asyncEffect() {
			const { data } = await getData();
			const processed = processData(data);
			dispatch({ type: SET_DATA_ACTION, payload: processed });
		}
		asyncEffect();
	}, []);

	useInterval(async () => {
		const { data } = await getData();
		const processed = processData(data);
		const avg = avgAltitude(satData);

		dispatch({ type: SET_AVERAGE_ACTION, payload: avg });
		dispatch({ type: SET_DATA_ACTION, payload: processed });

		if (avg < LOW_AVG_PARAM || prevLow) {
			dispatch({
				type: INCREMENT_WARNING_ACTION,
				payload: POLLING_INTERVAL_PARAM,
			});
		} else if (warningTime !== 0) {
			dispatch({ type: RESET_WARNING_TIME_ACTION });
		}

		if (WARNING_TIME_PARAM <= warningTime && !prevLow) {
			dispatch({
				type: SET_NOTIFICATION_ACTION,
				payload: { msg: "warn", time: processed.last_updated },
			});
			dispatch({ type: RESET_WARNING_TIME_ACTION });
			dispatch({ type: SET_PREV_LOW_ACTION, payload: true });
		} else if (WARNING_TIME_PARAM <= warningTime && prevLow) {
			dispatch({
				type: SET_NOTIFICATION_ACTION,
				payload: { msg: "safe", time: processed.last_updated },
			});
			dispatch({ type: RESET_WARNING_TIME_ACTION });
			dispatch({ type: SET_PREV_LOW_ACTION });
		}
	}, POLLING_INTERVAL_PARAM);

	return (
		<div className="data-card-container">
			<div className="data-card-content">
				{!satData.length ? (
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
