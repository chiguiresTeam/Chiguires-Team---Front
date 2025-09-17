import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
export default function StandardLayout() {
    return (<>

        <header>
            <Navbar></Navbar>
        </header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer>
            <Footer></Footer>
        </footer>


    </>);
}