import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import DataCard from "./components/Data-Card/data-card";
import DataChart from "./components/Data-Chart/data-chart";
import NotificationList from "./components/Notification/notification-list";

import StateContextProvider from "./context/stateContext";

function App() {
	return (
		<div className="App">
			<StateContextProvider>
				<Header />
				<div className="app-container">
					<div className="app-data-row">
						<DataCard />
					</div>
					<div className="app-data-row">
						<DataChart />
						<NotificationList />
					</div>
				</div>
			</StateContextProvider>
		</div>
	);
}

export default App;
