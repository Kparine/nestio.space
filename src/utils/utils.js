import axios from "axios";

export const getData = async () => {
	try {
		const res = await axios.get(`http://nestio.space/api/satellite/data`);
		console.log("res.data ******------>>>>>>", res);
		return res;
	} catch (err) {
		console.error("err ******------>>>>>>", err);
	}
};
