function Skills() {

    const skills = [
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
        "React",
        "Node",
        "Express",
        "MongoDB"
    ];

    return (
        <section className="skills" id="skills">

            <h2>Skills</h2>

            <div className="skill-box">

                {skills.map((item) => (
                    <div className="card" key={item}>
                        {item}
                    </div>
                ))}

            </div>

        </section>
    );
}

export default Skills;