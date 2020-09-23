import React from "react";
import { StateContext, StateContextProvider } from "./context/stateContext";
import { render, wait } from "@testing-library/react";
import DataCard from "./components/Data-Card/data-card";

const responses = [
	{ data: { altitude: 123, last_updated: "2020-09-23T02:19:37.860Z" } },
	{ data: { altitude: 126, last_updated: "2020-09-23T02:19:47.860Z" } },
	{ data: { altitude: 173, last_updated: "2020-09-23T02:19:57.860Z" } },
	{ data: { altitude: 173, last_updated: "2020-09-23T02:19:57.860Z" } },
];

function mockGetData() {
	return responses.shift();
}

const TestComponent = () => {
	return (
		<StateContextProvider value={StateContext}>
			<DataCard getData={mockGetData} />
		</StateContextProvider>
	);
};

describe("<DataCard />", () => {
	it("accept and process data from api", async () => {
		const { getByText } = render(<TestComponent />);
		await wait();
		expect(getByText("Current Altitude: 123 km")).toBeInTheDocument();
		await wait();
		expect(getByText("Current Altitude: 126 km")).toBeInTheDocument();
	});
});
