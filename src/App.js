import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import BlockViewer from "./components/blockViewer";

import "./App.css";
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
    const [blockNumber, setBlockNumber] = useState();

    async function getBlockNumber() {
        setBlockNumber(await alchemy.core.getBlockNumber());
    }

    useEffect(() => {
        getBlockNumber();
    }, []);

    return (
        <div className="App">
            <h3>Block Number: {blockNumber}</h3>
            <button onClick={getBlockNumber}>Get New Block</button>
            <BlockViewer blockNumber={blockNumber} />
        </div>
    );
}

export default App;
