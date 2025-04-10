import { useState, useEffect } from 'react'
type autoCompleteList = {
  data: string[];
};

function App() {
  const [input, setInput] = useState("");
  const [cards, setCards] = useState<string[]>([]);
  const [card, setCard] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(`http://localhost:8080/autocomplete?card=${encodeURIComponent(card)}`, {
        method: "GET",
      })
        .then((response) => response.json() as Promise<autoCompleteList>)
        .then((cardList) => {
          if (cardList.data.length === 0) {
            setCards(["no cards found..."]);
          } else {
            setCards(cardList.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 1000); // Waits 1s after last keystroke

    return () => {
      clearTimeout(timeout); // cancel timeout if input changes
    };
  }, [input]);

  const cardList = cards.map((card, index) => (
    <li key={index}>
      <button onClick={() => setCard(card)}>{card}</button>
    </li>
  ));

  return (
    <>
      <div>
        HELLO
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>
        <div>{card}</div>
        <div>
          <ul>{cardList}</ul>
        </div>
      </div>
    </>
  );
}

export default App;
