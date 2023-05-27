import axios from "axios";

export async function articeWrite(formData) {
    console.log(formData)
    const data = await axios.post(`http://localhost:9000/article/write`, formData, {
        headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${window.sessionStorage.getItem("ACCESS_TOKEN")}`,
        }
    });

  return data;
}
