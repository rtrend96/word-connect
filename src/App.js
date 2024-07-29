// create home component
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [selectedWords, setSelectedWords] = useState([]);
	const [selectedIndices, setSelectedIndices] = useState([]);
	const [isFull, setIsFull] = useState(false);
	const [level1] = useState([
		"left",
		"right",
		"up",
		"down",
		"ball",
		"bat",
		"stumps",
		"umpire",
		"tyre",
		"seats",
		"mirrors",
		"engine",
		"judge",
		"clark",
		"attorney",
		"clients",
	]);
	const [level2] = useState(["coming soon..!"]);
	const [level3] = useState(["coming soon..!"]);
	const [level4] = useState(["coming soon..!"]);
	const [originalWords, setOriginalWords] = useState([]);
	const [words, setWords] = useState([]);
	const [flashMessage, setFlashMessage] = useState(null);
	const checkWords = [
		["left", "right", "up", "down"],
		["ball", "bat", "stumps", "umpire"],
		["tyre", "seats", "mirrors", "engine"],
		["judge", "clark", "attorney", "clients"],
		["fish", "shells", "sand", "boat"],
		["leaves", "fruits", "flower", "brach"],
	];

	const handleWordClick = (word, index) => {
		if (selectedIndices.includes(index)) {
			setSelectedWords(
				selectedWords.filter((selectedWord) => selectedWord !== word),
			);
			setSelectedIndices(
				selectedIndices.filter((selectedIndex) => selectedIndex !== index),
			);
			return;
		}
		if (selectedWords.length === 4) {
			setIsFull(true);
			setTimeout(() => {
				setIsFull(false);
			}, 1000);
			console.log("Array full");
			return;
		} else if (selectedWords.includes(word)) {
			console.log("Word already exists");
			return;
		} else {
			setSelectedWords([...selectedWords, word]);
			setSelectedIndices([...selectedIndices, index]);
		}
	};

	const shuffle = (array) => {
		let currentIndex = array.length,
			randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}
		return array;
	};
	const handleCheck = () => {
		const selectedWordsString = selectedWords.join(", ");
		const isCorrect = checkWords.some((words) =>
			words.every((word) => selectedWordsString.includes(word)),
		);
		if (isCorrect) {
			setFlashMessage("Correct.!");
			setTimeout(() => {
				setFlashMessage(null);
			}, 1000);
			setSelectedWords([]);
			setSelectedIndices([]);
			const newWords = words.filter((word) => !selectedWords.includes(word));
			setWords(newWords);
		} else {
			setIsFull(true);
			setTimeout(() => {
				setIsFull(false);
			}, 1000);
		}
	};
	const handleShuffle = () => {
		const shuffledWords = shuffle([...words]);
		const newSelectedIndices = selectedIndices.map((index) => {
			const word = selectedWords[selectedIndices.indexOf(index)];
			return shuffledWords.indexOf(word);
		});
		setSelectedIndices(newSelectedIndices);
		setWords(shuffledWords);
	};
	const handleReset = () => {
		setSelectedWords([]);
		setSelectedIndices([]);
		setWords(originalWords);
	};
	const getColorClass = (index) => {
		switch (index) {
			case 0:
				return "pink";
			case 1:
				return "green";
			case 2:
				return "blue";
			case 3:
				return "orange";
			default:
				return "";
		}
	};
	const handleLevelClick = (index) => {
		let newWords;
		switch (index) {
			case 0:
				newWords = shuffle(level1);
				break;
			case 1:
				newWords = shuffle(level2);
				break;
			case 2:
				newWords = shuffle(level3);
				break;
			case 3:
				newWords = shuffle(level4);
				break;
			default:
				newWords = shuffle(level1);
		}
		setWords(newWords);
		setOriginalWords(newWords);
		setSelectedWords([]);
		setSelectedIndices([]);
	};

	useEffect(() => {
		const level1Words = level1;
		const newWords = shuffle(level1Words);
		setWords(newWords);
		setOriginalWords(level1Words);
	}, []);

	return (
		<div className="main-div">
			{flashMessage && (
				<div className="flash-message">
					<p>{flashMessage}</p>
				</div>
			)}
			<div className="header-wrapper">
				<h1>Word Connection</h1>
			</div>
			<div className="line-separation"></div>
			<div className="box-heading">
				<p>Create four groups of four!</p>
			</div>
			<div className="main-wrapper">
				{words.map((word, index) => (
					<div
						key={index}
						className={`box ${
							selectedIndices.includes(index) ? "selected" : ""
						} ${isFull ? "full" : ""}`}
						onClick={() => handleWordClick(word, index)}
					>
						{word.toUpperCase()}
					</div>
				))}
			</div>
			<div className="levels">
				{[...Array(4)].map((_, index) => (
					<button
						key={index}
						className={`level-button ${getColorClass(index)}`}
						onClick={() => handleLevelClick(index)}
					>
						&#8226;
					</button>
				))}
			</div>
			<div className="button-group">
				<button className="button" onClick={handleCheck}>
					Check
				</button>
				<button className="button" onClick={handleShuffle}>
					Shuffle
				</button>
				<button className="button" onClick={handleReset}>
					Reset
				</button>
			</div>
			<div className="footer">
				<p>&copy; 2023 Word Connection v1.0.0 @rtrend96</p>
			</div>
		</div>
	);
}

export default App;
