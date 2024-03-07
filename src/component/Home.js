import React from "react";
import moment from "moment";
import Card from "./Card.js";
import "./home.css";

function Home({ weatherData, city, setCity, handleCity, userData }) {
	const handleChange = (event) => {
		setCity(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		setCity("");
	};

	return (
		<div className="home">
			<div className="home-header">
				<h3>Check Your City Weather</h3>
			</div>
			<div className="home-content">
				<form onSubmit={handleSubmit}>
					<label htmlFor="city" />
					<input
						name="city"
						id="name"
						type="text"
						placeholder="city name..."
						onChange={handleChange}
						onKeyDown={handleCity}
						value={city}
					></input>
				</form>
			</div>
			<div className="home-card">
				<div className="span-div">
					<span>City : {weatherData.name}</span>
					<span>Temp : {weatherData.main.temp}</span>
					<span>Description : {weatherData.weather[0].description}</span>
					<span>Day : {moment().format("dddd")}</span>
					<span>Date : {moment().format("LL")}</span>
				</div>
				<Card userData={userData} />
			</div>
		</div>
	);
}

export default Home;
