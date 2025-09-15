import { useState } from "react";

const diceFaces = [
  "/images/dice1.png",
  "/images/dice2.png",
  "/images/dice3.png",
  "/images/dice4.png",
  "/images/dice5.png",
  "/images/dice6.png",
];

const App = () => {
  const [player1, setPlayer1] = useState("Player 1");
  const [dice1, setDice1] = useState(0); // Index 0'dan başlıyor
  const [dice2, setDice2] = useState(0);
  const [result, setResult] = useState("");
  const [rolling, setRolling] = useState(false);

  // Ses dosyaları
  const diceSound = new Audio("/sounds/dice.mp3");
  const winSound = new Audio("/sounds/win.mp3");
  const loseSound = new Audio("/sounds/lost.mp3");
  const drawSound = new Audio("/sounds/draw.mp3");

  const rollDice = () => {
    // zar atıldığında zar sesini çal
    diceSound.play();
    setRolling(true);
    setResult("");

    let rollInterval = setInterval(() => {
      // Rastgele zar yüzleri göster
      setDice1(Math.floor(Math.random() * 6)); // Array'deki index 0-5 arasında
      setDice2(Math.floor(Math.random() * 6));
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalDice1 = Math.floor(Math.random() * 6);
      const finalDice2 = Math.floor(Math.random() * 6);
      setDice1(finalDice1);
      setDice2(finalDice2);

      if (finalDice1 > finalDice2) {
        setResult("You Win! 👑");
        // win sesi ve diğerleri...
        winSound.play();
      } else if (finalDice1 < finalDice2) {
        setResult("You Lose! 😞");
        loseSound.play();
      } else {
        setResult("It's a Draw! 🤝🏻");
        drawSound.play();
      }

      setRolling(false);
    }, 1500);
  };

  return (
    <div className="App">
      <h1>{result ? result : "Roll the Dice!"}</h1>

      <div className="dice-container">
        <div className="player">
          <h2>{player1}</h2>
          {/* Zar görseli dinamik olarak array'den render ediliyor */}
          <img
            src={diceFaces[dice1]}
            alt={`Dice ${dice1 + 1}`}
            className={`dice ${rolling ? "rolling" : ""}`}
          />
        </div>

        <div className="player">
          <h2>Player 2</h2>
          <img
            src={diceFaces[dice2]}
            alt={`Dice ${dice2 + 1}`}
            className={`dice ${rolling ? "rolling" : ""}`}
          />
        </div>
      </div>

      <button onClick={rollDice} disabled={rolling}>
        {rolling ? "Rolling..." : "Roll Dice!"}
      </button>

      <div>
        <p className="change-name">Change Name:</p>
        <input
          type="text"
          placeholder="Change Player 1 name"
          onChange={(e) => setPlayer1(e.target.value)}
          value={player1}
        />
      </div>
    </div>
  );
};

export default App;
