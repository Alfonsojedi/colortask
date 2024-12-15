import { fire_auth } from "@/FirebaseConf";

 export default function User(){
    return fire_auth.currentUser?.email?.slice(0,fire_auth.currentUser?.email?.lastIndexOf('.'));  
 }