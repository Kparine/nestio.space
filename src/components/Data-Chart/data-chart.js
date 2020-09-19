import React, { useRef, useEffect, useContext } from "react";
import "./data-chart.css";
import { StateContext } from "../../context/stateContext";
import moment from "moment";

import { select } from "d3";

const DataChart = () => {
	const { state } = useContext(StateContext);
	const { data } = state;
	const svgRef = useRef();

	useEffect(() => {
		const svg = select(svgRef.current);
		if (data.length) {
			svg
				.selectAll("circle")
				.data(data)
				.join(
					(enter) =>
						enter
							.append("circle")
							.attr("r", 10)
							.attr("cx", (value) =>
								moment(value.last_updated).format("hh:mm:ss")
							)
							.attr("cy", (value) => value.altitude.toFixed(2))
							.attr("fill", "white")
							.attr("stroke", "black"),
					(update) => update.attr("class", "updated"),
					(exit) => exit.remove()
				);
		}
	}, [data]);

	return (
		<div className="data-chart-container">
			<div className="data-chart-content">
				<svg id="svg-content" ref={svgRef}></svg>
			</div>
		</div>
	);
};
export default DataChart;
