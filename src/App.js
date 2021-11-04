import userEvent from "@testing-library/user-event";
import { useState } from "react";
import "./App.css";

function App() {
  const imageArray = [
    { src: 1 },
    { src: 2 },
    { src: 3 },
    { src: 4 },
    { src: 5 },
    { src: 6 },
  ];

  const [cards, setCards] = useState([]);
  const [truns, setTurns] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...imageArray, ...imageArray]
      .sort(() => Math.random() - 0.5)
      .map((c) => ({ ...c, id: Math.random() }));
    setCards(shuffledCards);
    console.log(cards);
  };

  shuffleCards();
  return <div className="App"></div>;
}

export default App;
