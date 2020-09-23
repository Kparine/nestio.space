import React from "react";
import { StateContext, StateContextProvider } from "./context/stateContext";
import { render, wait } from "@testing-library/react";
import DataCard from "./components/Data-Card/data-card";
import NotificationList from "./components/Notification/notification-list";

const responses = [
	{ data: { altitude: 123, last_updated: "2020-09-23T02:19:37.860Z" } },
	{ data: { altitude: 123, last_updated: "2020-09-23T02:19:47.860Z" } },
	{ data: { altitude: 173, last_updated: "2020-09-23T02:19:57.860Z" } },
	{ data: { altitude: 113, last_updated: "2020-09-23T02:20:07.860Z" } },
	{ data: { altitude: 113, last_updated: "2020-09-23T02:20:17.860Z" } },
	{ data: { altitude: 123, last_updated: "2020-09-23T02:20:27.860Z" } },
	{ data: { altitude: 123, last_updated: "2020-09-23T02:20:37.860Z" } },
	{ data: { altitude: 123, last_updated: "2020-09-23T02:20:47.860Z" } },
	{ data: { altitude: 123, last_updated: "2020-09-23T02:20:57.860Z" } },
];

function mockGetData() {
	return responses.shift();
}

const TestDataCardComponent = () => {
	return (
		<StateContextProvider value={StateContext}>
			<DataCard getData={mockGetData} />
		</StateContextProvider>
	);
};

describe("<DataCard />", () => {
	it("accepts and processes Current Altitude data from api", async () => {
		const { getByText } = render(<TestDataCardComponent />);
		await wait();
		expect(getByText("Current Altitude: 123 km")).toBeInTheDocument();
		await wait();
		expect(getByText("Current Altitude: 123 km")).toBeInTheDocument();
	});
	it("accepts and calculates Average Altitude data from api", async () => {
		const { getByText } = render(<TestDataCardComponent />);
		await wait();
		expect(getByText("Current Altitude: 113 km")).toBeInTheDocument();
		await wait();
		expect(getByText("Average Altitude: 113 km")).toBeInTheDocument();
	});
	it("load spinner if data is not yet recieved", async () => {
		const { container } = render(<TestDataCardComponent />);
		expect(container.querySelector(".spinner")).toBeInTheDocument();
	});
});

const TestNotifcationsComponent = () => {
	return (
		<StateContextProvider value={StateContext}>
			<NotificationList />
		</StateContextProvider>
	);
};

describe("<NotificationList />", () => {
	it("renders on initial mount", async () => {
		const { getByText } = render(<TestNotifcationsComponent />);
		expect(getByText("Status Log")).toBeInTheDocument();
	});
});
