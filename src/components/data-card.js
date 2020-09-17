import React, { useContext, useEffect } from "react";
import { getData } from "../utils/utils";
import { StateContext } from "../context/stateContext";

const DataCard = () => {
	const { state, dispatch } = useContext(StateContext);
	const { data } = state;

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await getData();
				dispatch({ type: "SET_LOADING", payload: false });
				dispatch({ type: "SET_DATA", payload: res.data });
			} catch (err) {
				return console.log("err ******------>>>>>>", err);
			}
		}
		fetchData();
	}, [dispatch]);

	const formatData = (data) => {
		console.log("data ******------>>>>>>", data);
		if (data) data = data.toFixed(2);

		if (data > 180) {
			console.log(" ******---hey--->>>>>>");
		}
		return data;
	};

	return (
		<div className="data-card-container">
			<div className="data-card-content">
				Altitude {data !== "undefined" ? formatData(data.altitude) : ""}
			</div>
		</div>
	);
};

export default DataCard;
