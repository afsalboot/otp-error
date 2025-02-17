import { storeUser } from './Redux/AuthSlice';
import { publicRequest,tokenRequest } from './Axioscreate';




export const signupDetails = async (data) => {
    console.log("Signup request data:", data);

    try {
        const response = await publicRequest.post("/api/postData", data);
        console.log("Signup API response:", response);

        return response.data; // ✅ Ensure valid return
    } catch (error) {
        console.error("Signup API error:", error.message);

        // ✅ Return a default response to prevent undefined errors
        return { status: "error", message: error.response?.data?.message || "Server error. Try again later." };
    }
};

export const loginDetails = async (data,dispatch) => {
    try {
        const response = await publicRequest.post("/api/loginData", data);
        console.log("Login response:", response.data);
        dispatch(storeUser(response.data));

        return response.data; // ✅ Ensure we return response data
    } catch (err) {
        console.error("Login API error:", err.message);
        return null; // ✅ Prevent app crash by returning null on error
    }
};

export const getProfileData = async (id) => {
    try {
        const response = await tokenRequest.get(`/api/getDataById/${id}`);
        console.log("getProfilebyId API response:", response.data);
        return response.data
    }catch (err){
        console.log(err.message);
        
    }
}

console.log("profiledata value: ",getProfileData);


export const removeProfile = async (id) => {
    try {
        const response = await tokenRequest.delete(`/api/removeDataById/${id}`)
        console.log("removeProfile API response:", response.data);
        return response.data
        
    }catch(err){
        console.log(err.message);
        
    }
}

export const updateProfile = async (id,updatedProfile) => {
    try {
        const response = await tokenRequest.put(`/api/updateDataById/${id}`,updatedProfile,{headers: { "Content-Type": "application/json" },});
        console.log("updateProfile API response:", response.data);
        
        return response.data
    }catch(err){
        console.log(err.message);
    }
}