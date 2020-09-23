import React from "react";
import { mount } from "enzyme";
import { StateContext, StateContextProvider } from "./context/stateContext";
import DataCard from "./components/Data-Card/data-card";
import DataAvg from "./components/Data-Card/avg-data";
import DataCurr from "./components/Data-Card/curr-data";

describe("<DataCard />", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(
			<StateContextProvider>
				<DataCard />
			</StateContextProvider>
		);
	});
	console.log("StateContext ******------>>>>>>", StateContext);

	it("should exist and load context", () => {
		expect(wrapper).not.toBeNull();
		expect(wrapper).toHaveLength(1);
	});
	it("match snapshot", () => {
		expect(wrapper).toMatchSnapshot();
	});
	it("should exist and render DataAvg Component", () => {
		expect(wrapper.find(DataAvg)).not.toBeNull();
		expect(wrapper.find(DataAvg)).toHaveLength(1);
	});
	it("should exist and render DataCurr Component", () => {
		expect(wrapper.find(DataCurr)).not.toBeNull();
		expect(wrapper.find(DataCurr)).toHaveLength(1);
	});
});
