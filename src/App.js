// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import Home from "./component/Home.js";

function App() {
	const [lat, setLat] = useState([]);
	const [long, setLong] = useState([]);
	const [data, setData] = useState([]);
	const [city, setCity] = useState(["delhi"]);
	const [userData, setUserData] = useState([]);

	const userCity = useMemo(() => {
		return city;
	}, [city]);

	const handleCity = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			// console.log(city);
		}
	};

	useEffect(() => {
		const fetchCity = async () => {
			await fetch(
				`http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=1a5946b2a8203e88bafb92ea5f41800f`
			)
				.then((res) => res.json())
				.then((result) => {
					setUserData(result);
					console.log(result);
				});
		};
		fetchCity();
	}, [userCity]);

	let cityLat = 0;
	let cityLon = 0;
	if (userData[0]) {
		cityLat = userData[0].lat;
		cityLon = userData[0].lon;
	}

	useEffect(() => {
		const fetchData = async () => {
			navigator.geolocation.getCurrentPosition(function (position) {
				setLat(position.coords.latitude);
				setLong(position.coords.longitude);
			});

			await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=metric&appid=1a5946b2a8203e88bafb92ea5f41800f`
			)
				.then((res) => res.json())
				.then((result) => {
					setData(result);
					console.log(result);
				});
		};
		fetchData();
	}, [cityLat, cityLon]);

	useEffect(() => {
		const fetchData = async () => {
			navigator.geolocation.getCurrentPosition(function (position) {
				setLat(position.coords.latitude);
				setLong(position.coords.longitude);
			});

			await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=1a5946b2a8203e88bafb92ea5f41800f`
			)
				.then((res) => res.json())
				.then((result) => {
					setData(result);
					console.log(result);
				});
		};
		fetchData();
	}, [lat, long]);

	return (
		<div className="App">
			<div className="header">
				<h1>React Open Weather Application</h1>
			</div>
			{typeof data.main != "undefined" ? (
				<Home
					weatherData={data}
					city={city}
					setCity={setCity}
					handleCity={handleCity}
					userData={userData}
				/>
			) : (
				<div>Error</div>
			)}
		</div>
	);
}

export default App;
