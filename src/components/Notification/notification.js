import React, { useContext } from "react";
import { StateContext } from "../../context/stateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckCircle,
	faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "./notification.css";

const Notification = () => {
	const { state } = useContext(StateContext);
	const { notification } = state;

	const message = {
		warn: "WARNING: RAPID ORBITAL DECAY IMMINENT",
		safe: "Sustained Low Earth Orbit Resumed",
	};

	const styles = {
		warn: { border: "1px solid red" },
		safe: { border: "1px solid green" },
	};

	if (!notification.length) return null;

	return (
		<>
			{notification.map((item) => {
				return (
					<div
						className="notification-content"
						style={item.msg === "safe" ? styles.safe : styles.warn}
					>
						<FontAwesomeIcon
							className="notice-icon"
							size="sm"
							icon={item.msg === "safe" ? faCheckCircle : faExclamationTriangle}
							color={item.msg === "safe" ? "green" : "red"}
						/>
						{item.msg === "safe" ? message.safe : message.warn} ({item.time})
					</div>
				);
			})}
		</>
	);
};
export default Notification;
