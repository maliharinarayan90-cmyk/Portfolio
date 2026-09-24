import { useState } from "react";
import axios from "axios";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/contact",
                {
                    name,
                    email,
                    phone,
                    message
                }
            );

            alert(res.data.message);

            setName("");
            setEmail("");
            setPhone("");
            setMessage("");

        } catch (error) {
            console.log(error);
            alert("Message save nahi hua");
        }
    };

    return (
        <section className="contact" id="contact">

            <h2>Contact Me</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Phone Number */}
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>

                <button type="submit">
                    Send
                </button>

            </form>

        </section>
    );
}

export default Contact;