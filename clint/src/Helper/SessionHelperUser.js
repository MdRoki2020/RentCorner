class SessionHelper{
    userSetToken(token){
        localStorage.setItem("token",token)
    }
    userGetToken(){
        return localStorage.getItem("token");
    }

    userSetEmail(Email){
        localStorage.setItem("Email",Email)
    }
    userGetEmail(){
        return localStorage.getItem("Email")
    }

    userSetOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }

    userGetOTP(){
        return localStorage.getItem('OTP');
    }

    setUserDetails(UsersDetails){
        localStorage.setItem("UsersDetails",JSON.stringify(UsersDetails));
    }
    getUserDetails(){
        return JSON.parse(localStorage.getItem("UsersDetails"));
    }

    removeUserSessions(){
        localStorage.clear();
        window.location.href="/"
    }
}

export const {userSetToken,userGetToken,userSetEmail,userGetEmail,userSetOTP,userGetOTP,setUserDetails,getUserDetails,removeUserSessions}=new SessionHelper();