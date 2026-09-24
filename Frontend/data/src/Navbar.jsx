import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            {/* =========================
                LOGO
            ========================= */}
            <h2>Hari.</h2>

            {/* =========================
                NAVIGATION
            ========================= */}
            <ul>

                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <a href="#about">About</a>
                </li>

                <li>
                    <a href="#skills">Skills</a>
                </li>

                <li>
                    <a href="#projects">Projects</a>
                </li>

                <li>
                    <a href="#contact">Contact</a>
                </li>

            </ul>

        </nav>
    );
}

export default Navbar;
