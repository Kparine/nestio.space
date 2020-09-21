import React, { useContext } from "react";
import { render } from "enzyme";
import { StateContext, StateContextProvider } from "./context/stateContext";
import DataCard from "./components/Data-Card/data-card";

describe("<DataCard />", () => {
	let wrapper;
	beforeEach(() => {
		const TestComp = () => {
			const { state } = useContext(StateContext);
			return <>{state.satData}</>;
		};
		wrapper = render(
			<StateContextProvider>
				<TestComp />
			</StateContextProvider>
		);
	});

	it("should exist and load context", () => {
		expect(wrapper).toHaveLength(1);
	});
	it("match snapshot", () => {
		expect(wrapper).toMatchSnapshot();
	});
});
