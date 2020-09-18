import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import DataCard from "./components/Data-Card/data-card";

import StateContextProvider from "./context/stateContext";

function App() {
	return (
		<div className="App">
			<StateContextProvider>
				<Header />
				<DataCard />
			</StateContextProvider>
		</div>
	);
}

export default App;
