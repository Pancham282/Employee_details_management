
export function SignoutClick(removeCookies, navigate) {
    removeCookies("userName");  
    navigate("/login");
}



