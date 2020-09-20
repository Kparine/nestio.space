import React, { createContext, useReducer, useMemo } from "react";
import {
	INCREMENT_WARNING_ACTION,
	SET_NOTIFICATION_ACTION,
	SET_DATA_ACTION,
	SET_AVERAGE_ACTION,
	RESET_WARNING_TIME_ACTION,
} from "../constants/action-constants";

export const StateContext = createContext({});

const reducer = (state, action) => {
	switch (action.type) {
		case SET_DATA_ACTION: {
			return {
				...state,
				satData: [...state.satData, action.payload],
			};
		}
		case SET_NOTIFICATION_ACTION: {
			return {
				...state,
				notification: [...state.notification, action.payload],
			};
		}
		case INCREMENT_WARNING_ACTION:
			return {
				...state,
				warningTime: state.warningTime + action.payload,
			};
		case SET_AVERAGE_ACTION:
			return {
				...state,
				avg: action.payload,
			};
		case RESET_WARNING_TIME_ACTION:
			return {
				...state,
				warningTime: 0,
			};
		default:
			throw new Error();
	}
};

const initialState = {
	notification: [],
	satData: [],
	avg: NaN,
	warningTime: 0,
};

const StateContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const contextValue = useMemo(
		() => ({
			state,
			dispatch,
		}),
		[state, dispatch]
	);

	return (
		<StateContext.Provider value={contextValue}>
			{children}
		</StateContext.Provider>
	);
};
export default StateContextProvider;
