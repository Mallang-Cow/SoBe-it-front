import axios from "axios";

export async function addNewChallnge(newData){
    console.log(newData);
    try {
        const data = await axios.post(`http://localhost:9000/profile/challenge/add`, newData, {
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