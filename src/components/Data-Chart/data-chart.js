import React, { useRef } from "react";
import "./data-chart.css";

import { select } from "d3";

const DataChart = () => {
	const svgRef = useRef();
	const svg = select(svgRef.current);
	return (
		<div className="data-chart-container">
			<div className="data-chart-content">
				<svg id="svg-content" ref={svgRef}></svg>
			</div>
		</div>
	);
};
export default DataChart;
