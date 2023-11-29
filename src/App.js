import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import BlockViewer from "./blockViewer";

import "./App.css";
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
    const [blockNumber, setBlockNumber] = useState();

    useEffect(() => {
        async function getBlockNumber() {
            setBlockNumber(await alchemy.core.getBlockNumber());
        }

        getBlockNumber();
    }, []);

    return (
        <div className="App">
            <h3>Block Number: {blockNumber}</h3>
            <BlockViewer blockNumber={blockNumber} />
        </div>
    );
}

export default App;
