import React from "react";
import "./App.css";
import Header from "./components/header";
import DataCard from "./components/data-card";

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
