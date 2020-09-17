import axios from "axios";

export const getData = async () => {
	try {
		const res = await axios.get(`http://nestio.space/api/satellite/data`);
		return res;
	} catch (err) {
		console.log("err ******------>>>>>>", err);
	}
};
