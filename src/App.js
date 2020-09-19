import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import DataCard from "./components/Data-Card/data-card";
import DataChart from "./components/Data-Chart/data-chart";

import StateContextProvider from "./context/stateContext";

function App() {
	return (
		<div className="App">
			<StateContextProvider>
				<Header />
				<DataCard />
				<DataChart />
			</StateContextProvider>
		</div>
	);
}

export default App;
