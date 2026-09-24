import { useState } from "react";
import { Link } from "react-router-dom";
import "./Weather.css";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Apni OpenWeatherMap API key yaha paste karo
    const API_KEY = "50a9c1b780a7e7a3f530631a91e18819";

    const getWeather = async () => {
        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }

        setLoading(true);
        setError("");
        setWeather(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                    city.trim()
                )}&appid=${API_KEY}&units=metric`
            );

            const data = await response.json();

            console.log("Status:", response.status);
            console.log("API Response:", data);

            if (response.status === 401) {
                setError(
                    "Invalid API key. Please check your OpenWeather API key."
                );
                return;
            }

            if (response.status === 404) {
                setError("City not found. Try Delhi, Mumbai or Bhopal.");
                return;
            }

            if (!response.ok) {
                setError(data.message || "Weather API error");
                return;
            }

            setWeather(data);

        } catch (error) {
            console.error("Weather Error:", error);
            setError("Internet connection problem. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-page">

            {/* Back to Home Button */}
            <Link to="/" className="back-home-btn">
                ← Back to Home
            </Link>

            <div className="weather-card">

                <h1>🌤️ Weather App</h1>

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Enter city name..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                getWeather();
                            }
                        }}
                    />

                    <button onClick={getWeather}>
                        Search
                    </button>

                </div>

                {loading && (
                    <p className="loading">
                        Loading weather...
                    </p>
                )}

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {weather && !loading && (
                    <div className="weather-info">

                        <h2>
                            {weather.name}, {weather.sys.country}
                        </h2>

                        <img
                            className="weather-icon"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />

                        <h3>
                            {Math.round(weather.main.temp)}°C
                        </h3>

                        <p className="description">
                            {weather.weather[0].description}
                        </p>

                        <div className="weather-details">

                            <div className="detail">
                                <span>🌡️</span>
                                <strong>Feels Like</strong>
                                <p>
                                    {Math.round(weather.main.feels_like)}°C
                                </p>
                            </div>

                            <div className="detail">
                                <span>💧</span>
                                <strong>Humidity</strong>
                                <p>
                                    {weather.main.humidity}%
                                </p>
                            </div>

                            <div className="detail">
                                <span>💨</span>
                                <strong>Wind</strong>
                                <p>
                                    {weather.wind.speed} m/s
                                </p>
                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Weather;