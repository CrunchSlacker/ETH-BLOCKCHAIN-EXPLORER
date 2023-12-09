// App.js
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import BlockViewer from "./components/blockViewer";
import { useParams } from "react-router-dom";

import "./App.css";
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
    let { blockNum } = useParams();
    let [blockNumber, setBlockNumber] = useState(parseInt(blockNum));
    const [isLatest, setIsLatest] = useState(false);

    async function getBlock() {
        setBlockNumber(await alchemy.core.getBlockNumber());
    }

    function getPrevBlock() {
        setBlockNumber((prevBlockNumber) => prevBlockNumber - 1);
    }

    function getNextBlock() {
        setBlockNumber((prevBlockNumber) => prevBlockNumber + 1);
    }

    useEffect(() => {
        async function checkIsLatest() {
            const latestBlock = await alchemy.core.getBlockNumber();
            setIsLatest(blockNumber === latestBlock);
        }

        checkIsLatest();
    }, [blockNumber]);

    return (
        <div className="App bg-black h-screen flex items-center justify-center text-white">
            <button
                onClick={getPrevBlock}
                className="border-2 text-white px-4 py-2 rounded-md mr-2"
            >
                {"<--"}
            </button>

            <BlockViewer blockNumber={blockNumber} getBlock={getBlock} isLatest={isLatest}/>
            <button
                onClick={getNextBlock}
                className="border-2 text-white px-4 py-2 rounded-md ml-2"
                disabled={isLatest}
            >
                {"-->"}
            </button>
        </div>
    );
}

export default App;
