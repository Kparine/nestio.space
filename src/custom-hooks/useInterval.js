import { useEffect, useRef } from "react";

export const useInterval = (callback, delay) => {
	const savedCallback = useRef();
	let pollInterval = null;

	if (delay !== null) {
		pollInterval = process.env.NODE_ENV === "test" ? 0 : delay;
	}

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);
	useEffect(() => {
		const tick = () => {
			savedCallback.current();
		};
		if (pollInterval !== null) {
			const id = setInterval(tick, pollInterval);
			return () => {
				clearInterval(id);
			};
		}
	}, [callback, pollInterval]);
};
