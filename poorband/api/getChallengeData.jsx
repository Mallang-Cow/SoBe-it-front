import axios from "axios";

export async function getChallengeData(userId){
    console.log("겟챌린치!!!!")
    console.log(userId);
    try {
        const data = await axios.post(`http://localhost:9000/profile/challenge/list`, userId, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
    
}