import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Login from "../SignIn/Login";
import Register from "../SignIn/Register";
export default function StandardLayout() {

    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);

    const handleOpenLogin = () => setLoginOpen(true);
    const handleCloseLogin = () => setLoginOpen(false);

    const handleOpenRegister = () => setRegisterOpen(true);
    const handleCloseRegister = () => setRegisterOpen(false);

    const switchToRegister = () => {
        handleCloseLogin();
        handleOpenRegister();
    };

    const switchToLogin = () => {
        handleCloseRegister();
        handleOpenLogin();
    };
    return (<>

        <header>
            <Navbar
                onLoginClick={handleOpenLogin}
                onRegisterClick={handleOpenRegister}
            ></Navbar>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer>
            <Footer></Footer>
        </footer>


        {isLoginOpen && (
            <Login
                open={isLoginOpen}
                onClose={handleCloseLogin}
                onSwitchToRegister={switchToRegister}
            />
        )}

        {isRegisterOpen && (
            <Register
                open={isRegisterOpen}
                onClose={handleCloseRegister}
                onSwitchToLogin={switchToLogin}
            />
        )}


    </>);
}