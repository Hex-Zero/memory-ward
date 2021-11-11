import { useEffect, useState } from "react";
import "./App.css";

function shuffle(array: cardModel[]) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

interface indexedCard{
  card: cardModel;
  index: number;
}

interface cardModel {
  src : number,
  visible : boolean,
  disabled : boolean
}

function App() {
  const imageArray: cardModel[] = [
    { 'src': 1, 'visible': false , 'disabled': false },
    { 'src': 2, 'visible': false , 'disabled': false },
    { 'src': 3, 'visible': false , 'disabled': false },
    { 'src': 4, 'visible': false , 'disabled': false },
    { 'src': 5, 'visible': false , 'disabled': false },
    { 'src': 6, 'visible': false , 'disabled': false },
    { 'src': 1, 'visible': false , 'disabled': false },
    { 'src': 2, 'visible': false , 'disabled': false },
    { 'src': 3, 'visible': false , 'disabled': false },
    { 'src': 4, 'visible': false , 'disabled': false },
    { 'src': 5, 'visible': false , 'disabled': false },
    { 'src': 6, 'visible': false , 'disabled': false },
  ];


  const [cards, setCards] = useState(shuffle([...imageArray]));
  const [firstChoise, setFirstChoise] = useState<indexedCard | null>(null);
  const [secondChoise, setSecondChoise] = useState<indexedCard | null>(null);
  const [turns, setTurns] = useState(0);
  
  const resetSelection = () => {
    setFirstChoise(null);
    setSecondChoise(null);
    setTurns(turns + 1);
  };

  const handleReset = () => {
    setCards(shuffle([...imageArray]));
    setFirstChoise(null);
    setSecondChoise(null);
    setTurns(0);
  };

  const disableCard = async (index: number) => {
    const newCards = [...cards];
    newCards[index].disabled = true;
    setCards(newCards); 
  };

  
  const enableCard = (index: number) => {
    const newCards = [...cards];
    newCards[index].disabled = false;
    setCards(newCards);
  };

  const flipCard = async (index: number) => {
    const cardArray = [...cards];
    cardArray[index].visible = !cardArray[index].visible;
    await setCards(cardArray);
  }

  const hangleCardClick = async (card: cardModel, index: number) => {
    if(!firstChoise) {
      setFirstChoise({card, index});
    } else if(!secondChoise) {
      setSecondChoise({card, index});
    }
    
    await flipCard(index);
    await disableCard(index);

    console.log(card);
  };
  

  useEffect(() => {
    if(secondChoise && firstChoise?.card.src === secondChoise?.card.src){
      resetSelection();
    }else if(secondChoise && firstChoise){
      setTimeout(() => {
      flipCard(secondChoise.index);
      flipCard(firstChoise.index);
      enableCard(firstChoise.index);
      enableCard(secondChoise.index);
    }, 400);
      resetSelection();

    }
  }, [ secondChoise ]);


  return <div className="App">
        <div className="card-grid">
        {cards.map((card,index) => (
          <div id={(index + card.src + index).toString()} 
              className="card" onClick={ ()=> card.disabled ? null : hangleCardClick(card, index)}>{card.visible? card.src : '-'} 
          </div>
        ))}
        </div>

        <div className="button-container">
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>;
}

export default App;
