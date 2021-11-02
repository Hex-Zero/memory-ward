import "./App.css";

const imageArray = [
  { src: 1 },
  { src: 2 },
  { src: 3 },
  { src: 4 },
  { src: 5 },
  { src: 6 },
];

const shuffleCards = () => {
  const shuffledCards = [...imageArray, ...imageArray]
    .sort(() => Math.random() - 0.5)
    .map((c) => ({ ...c, id: Math.random() }));
  console.log(shuffledCards);
};

shuffleCards();

function App() {
  return <div className="App"></div>;
}

export default App;
