import React, { useContext } from "react";
import "./data-card.css";
import DataCurr from "./curr-data";
import DataAvg from "./avg-data";

import { StateContext } from "../../context/stateContext";

const DataCard = () => {
	const { state } = useContext(StateContext);
	const { data } = state;

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
