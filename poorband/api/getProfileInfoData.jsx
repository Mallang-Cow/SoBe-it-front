import axios from "axios";

export async function getProfileInfoData(userId) {
    try {
        const data = await axios.post(`http://localhost:9000/profile/profileinfo`, userId, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
        });
        return data.data;
    } catch (error) {
        console.log(error);
    }
    
}