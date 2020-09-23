import React, { createContext, useReducer, useMemo } from "react";
import {
	SET_DATA_ACTION,
	SET_NOTIFICATION_ACTION,
	SET_AVERAGE_ACTION,
	INCREMENT_WARNING_ACTION,
	RESET_WARNING_TIME_ACTION,
	INCREMENT_SAFE_ACTION,
	RESET_SAFE_TIME_ACTION,
	SET_PREV_LOW_ACTION,
} from "../constants/action-constants";

const initialState = {
	notification: [],
	satData: [],
	avg: NaN,
	warningTime: 0,
	safeTime: 0,
	prevLow: false,
};
const StateContext = createContext(initialState);
export { StateContext };

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
		case SET_AVERAGE_ACTION:
			return {
				...state,
				avg: action.payload,
			};
		case INCREMENT_WARNING_ACTION:
			return {
				...state,
				warningTime: state.warningTime + action.payload,
			};
		case RESET_WARNING_TIME_ACTION:
			return {
				...state,
				warningTime: 0,
			};
		case INCREMENT_SAFE_ACTION:
			return {
				...state,
				safeTime: state.safeTime + action.payload,
			};
		case RESET_SAFE_TIME_ACTION:
			return {
				...state,
				safeTime: 0,
			};
		case SET_PREV_LOW_ACTION:
			return {
				...state,
				prevLow: action.payload,
			};
		default:
			throw new Error();
	}
};

export const StateContextProvider = ({ children }) => {
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
