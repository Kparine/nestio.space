import React, { useContext, useEffect, useCallback } from "react";
import "./data-card.css";
import DataCurr from "./curr-data";
import DataAvg from "./avg-data";
import { useInterval } from "../../custom-hooks/useInterval";

import { getData } from "../../utils/utils";
import { StateContext } from "../../context/stateContext";

const DataCard = () => {
	const { state, dispatch } = useContext(StateContext);
	const { data } = state;

	const stableDispatch = useCallback(dispatch, []);

	useEffect(() => {
		async function getData() {
			const res = await getData();
			stableDispatch({ type: "SET_DATA", payload: res.data });
		}
		getData();
	}, [stableDispatch]);

	const POLLING_INTERVAL = 10000;

	useInterval(async () => {
		const res = await getData();
		stableDispatch({ type: "SET_DATA", payload: res.data });
	}, POLLING_INTERVAL);

	return (
		<div className="data-card-container">
			<div className="data-card-content">
				{!data.length ? (
					<div class="spinner">
						<div class="rect1"></div>
						<div class="rect2"></div>
						<div class="rect3"></div>
						<div class="rect4"></div>
						<div class="rect5"></div>
					</div>
				) : null}
				<DataCurr />
				<DataAvg />
			</div>
		</div>
	);
};

export default DataCard;
