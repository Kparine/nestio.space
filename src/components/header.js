import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
	return (
		<div className="header-container">
			<div className="header-content">
				Nestio Space Program
				<FontAwesomeIcon id="wx-icon" size="lg" icon={faRocket} />
			</div>
		</div>
	);
};

export default Header;
