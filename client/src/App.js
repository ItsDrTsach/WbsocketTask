import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bitcoinPrice, setbitcoinPrice] = useState(null);
  const [ethereumPrice, setethereumPrice] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker"
    );
    ws.onmessage = (event) => {
      let { data: stockObject } = JSON.parse(event.data);
      let { s: symbol, c: lastPrice } = stockObject;
      console.log(symbol, lastPrice);
      symbol === "BTCUSDT"
        ? setbitcoinPrice(lastPrice)
        : setethereumPrice(lastPrice);
    };
  }, []);
  return (
    <div className="App">
      {bitcoinPrice && <h2>Bitcoin Price is {bitcoinPrice} $</h2>}
      {ethereumPrice && <h2>Ethereum Price is {ethereumPrice} $</h2>}
    </div>
  );
}

export default App;
