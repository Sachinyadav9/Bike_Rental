import {create} from 'zustand';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axios';


const useAuth = create((set)=>
({
    user : null,
    admin : false , 
    loading : true,
    change : ()=>{
        set({user : null})
    },

    checkAuth : async()=>{
        try {
            console.log("CheckAuth is Running");
            
            const res = await axiosInstance.get("/authenticate" , {withCredentials : true});
            console.log(res.data)
            if(res?.data?.authenticated && res?.data?.user ){
                
                set({ user : res.data.user._id,loading : false , admin : res.data.isAdmin})
                return res
            }
            else{
                set({user : null , loading : false , admin : false})
            }
        } catch (error) {
                    set({user : null , loading : false})
        }
         
    },
    login : async ({email , password})=>{
        try {
            console.log("Login RUnned")
        const res = await axiosInstance.post("/login" , {email , password},  {withCredentials : true})
       console.log(res.data)
        set({user : res?.data?.user._id|| null })
       
        
        return res

        }catch (error) {

           console.log("Error : " , error?.response?.data || error.message);
           alert(error?.response?.data || error.message); 
           return false  

        } 
    },
    logout : async()=>{
        try {

        const res = await axiosInstance.post("/logout" , {} , {withCredentials : true})
        set({user : null , admin : false})

        }catch (error) {

            console.log("Error : " , error?.response?.data || error.message);
            alert(error?.response?.data || error.message);

        }
        
    },
    signup : async({email , fullname , password})=>{
        try {

        const res = await axiosInstance.post('/signup' , {email , fullname , password} , {withCredentials:true});
        set({user : res.data.user._id})
        return res

        }catch (error) {

            console.log("Error : " , error?.response?.data.message || error.message);
            alert(error?.response?.data.message || error.message);
            return false
        }
        
    }

})
)
export default useAuth;