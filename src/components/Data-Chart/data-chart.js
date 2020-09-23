import React, { useContext } from "react";
import { StateContext } from "../../context/stateContext";
import { LOW_AVG_PARAM } from "../../constants/param-constants";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ReferenceLine,
	Label,
} from "recharts";

const DataChart = () => {
	const { state } = useContext(StateContext);
	const { satData } = state;

	return (
		<div className="data-chart-container">
			<div className="data-chart-content">
				<LineChart
					width={750}
					height={500}
					data={satData}
					margin={{
						top: 5,
						right: 30,
						left: 30,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="last_updated" name="time" interval="preserveEnd" />
					<YAxis domain={["dataMin - 40", "dataMax + 40"]}>
						<Label
							label={{
								value: "Altitude",
								angle: -90,
								position: "insideLeft",
							}}
						/>
					</YAxis>
					<Tooltip />
					<Legend />
					<ReferenceLine
						y={LOW_AVG_PARAM}
						label="Low Earth Orbit Threshold ~160 km"
						stroke="red"
					/>
					<Line
						type="monotone"
						dataKey="altitude"
						stroke="#087fff"
						activeDot={{ r: 5 }}
					/>
				</LineChart>
			</div>
		</div>
	);
};

export default DataChart;
