class SessionHelper{
    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken(){
        return localStorage.getItem("token");
    }

    setEmail(Email){
        localStorage.setItem("Email",Email)
    }
    getEmail(){
        return localStorage.getItem("Email")
    }

    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }

    getOTP(){
        return localStorage.getItem('OTP');
    }

    setRenterDetails(RenterDetails){
        localStorage.setItem("RenterDetails",JSON.stringify(RenterDetails));
    }
    getRenterDetails(){
        return JSON.parse(localStorage.getItem("RenterDetails"));
    }

    removeSessions(){
        localStorage.clear();
        window.location.href="/RentersLogin"
    }

    


}

export const {setToken,getToken,setEmail,getEmail,setRenterDetails,getRenterDetails,setOTP,getOTP,removeSessions}=new SessionHelper();