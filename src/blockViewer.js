import Block from "./functions/block";
import Transactions from "./transactionComponent";
import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockViewer({ blockNumber }) {
    const [isBlock, setisBlock] = useState(false);
    const [transactions, setTransactions] = useState();
    const [timestamp, setTimestamp] = useState();
    const [transactionCount, setTransactionCount] = useState();
    const [gasUsed, setGasUsed] = useState();
    const [gasUsedPercent, setGasUsedPercent] = useState();
    const [showTransactions, setShowTransactions] = useState(false);

    useEffect(() => {
        async function init() {
            const fetchedBlock = await alchemy.core.getBlockWithTransactions(
                blockNumber
            );
            const newBlock = new Block(fetchedBlock);
            setTimestamp(newBlock.getTimestamp());
            setTransactionCount(newBlock.getTransactionCount());
            setGasUsed(newBlock.getGasUsed());
            setGasUsedPercent(newBlock.getGasUsedPercentage());
            setTransactions(newBlock.getTransactions());
            setisBlock(true);
        }

        init();
    }, []);

    if (!isBlock) {
        return <h1>Loading...</h1>;
    }

    const handleClick = () => {
        setShowTransactions(!showTransactions);
    }

    return (
        <div>
            <h3>Timestamp: {timestamp}</h3>
            <h3>Gas Used: {gasUsed} ({gasUsedPercent}%)</h3>
            <h3>Transactions: {transactionCount}</h3>
            <button onClick={handleClick}>Show All</button>
            {showTransactions ? transactions.map((txn, index) => {
                return <Transactions index={index} transaction={txn}/>
            }) : <></>}

        </div>
    );
}

export default BlockViewer;
