import axios from "axios";

export async function getProfileInfoData(userId) {
    console.log(userId);
    try {
        const data = await axios.post(`http://localhost:9000/profile/profileInfo`, userId, {
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