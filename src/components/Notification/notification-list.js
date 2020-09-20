import React from "react";
import Notification from "./notification";
import "./notification.css";

const NotificationList = () => {
	return (
		<div className="notification-container">
			<div className="notification-header">Status Log</div>
			<div className="notification-list-container">
				<Notification />
			</div>
		</div>
	);
};
export default NotificationList;
