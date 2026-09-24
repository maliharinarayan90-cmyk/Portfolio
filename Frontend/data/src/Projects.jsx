import { useNavigate } from "react-router-dom";

function Projects() {
    const navigate = useNavigate();

    const projects = [
        "Portfolio Website",
        "Weather App",
        "Todo App",
        "E-Commerce Website",
        "Blog Website",
    ];

    const viewProject = (project) => {

        if (project === "Portfolio Website") {
            navigate("/");
        }

        if (project === "Weather App") {
            navigate("/weather");
        }

        if (project === "Todo App") {
            navigate("/todo");
        }

        if (project === "E-Commerce Website") {
            window.open("http://localhost:5174", "_blank");
        }

        if (project === "Blog Website") {
            // Blog project ka URL baad mein add kar sakte hain
            console.log("Blog Website project");
        }
    };

    return (
        <section className="projects" id="projects">

            <h2>Projects</h2>

            <div className="project-box">

                {projects.map((project) => (

                    <div
                        className="project-card"
                        key={project}
                    >

                        <h3>{project}</h3>

                        <p>
                            React + Node.js + MongoDB
                        </p>

                        <button
                            onClick={() => viewProject(project)}
                        >
                            View Project
                        </button>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default Projects;