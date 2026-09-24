import { useState } from "react";

import logo1 from "./assets/logo1.jpg";
import logo2 from "./assets/logo2-new.jpg";
import logo3 from "./assets/logo3.jpg";
import logo4 from "./assets/logo4.jpg";
import logo5 from "./assets/logo5.jpg";





const logos = [logo1, logo2, logo3, logo4, logo5];

function Hero() {
    const [logo] = useState(
        logos[Math.floor(Math.random() * logos.length)]
    );

    return (
        <section className="hero">

            <div className="left">

                <h1>
                    Hi, I'm <span>Hari</span>
                </h1>

                <h3>Frontend & Backend Developer</h3>

                <p>
                    I build modern websites using React, Node.js
                    and MongoDB.
                </p>

                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-btn"
                >
                    View Resume
                </a>

            </div>

            <div className="right">
                <img src={logo} alt="Hari Logo" />
            </div>

        </section>
    );
}

export default Hero;