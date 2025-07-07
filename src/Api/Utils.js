import axios from "axios";

export const imageUpload = async(imageFile) =>{
    const imageFormData = new FormData();
    imageFormData.append("image" , imageFile)
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,imageFormData)
    return data?.data?.url ;
}