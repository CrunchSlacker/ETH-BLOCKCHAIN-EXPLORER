// blockViewer.js
import Block from "../classes/block";
import Transactions from "./transactionAll";
import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { Link } from "react-router-dom";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function BlockViewer({ blockNumber, getBlock, isLatest}) {
    const [isBlock, setIsBlock] = useState(false);
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
            fetchedBlock && setIsBlock(true);
        }
        init();
    }, [blockNumber]);

    if (!isBlock) {
        return <h1>Loading...</h1>;
    }

    const handleClick = () => {
        setShowTransactions(!showTransactions);
    };

    return (
        <div className="font-sans bg-black text-white flex flex-col items-center justify-center w-full min-h-screen p-4">
            <div className="text-7xl mb-2 text-left">
                Block <span className="text-papaya">_{blockNumber}</span>
            </div>
            <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <h3 className="font-semibold">Timestamp:</h3>
                    <div>{timestamp}</div>
                </div>
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <h3 className="font-semibold">Gas Used:</h3>
                    <div>
                        {gasUsed} ({gasUsedPercent}%)
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                    <h3 className="font-semibold">Transaction Count:</h3>
                    <div>{transactionCount}</div>
                </div>
            </div>
            <Link to="/">
                <button className="mb-4 border-2 text-white px-4 py-2 rounded-md hover:bg-papaya hover:border-papaya">
                    Search Again
                </button>
            </Link>

            {!isLatest && <button onClick={getBlock} className="mt-4 bg-papaya text-black px-4 py-2 rounded-md hover:bg-white hover:text-papaya transition-all duration-300">

                Get Latest Block
            </button>}
            <button
                onClick={handleClick}
                className="mt-4 bg-papaya text-black px-4 py-2 rounded-md hover:bg-white hover:text-papaya transition-all duration-300"
            >
                {showTransactions ? "Hide All" : "Show All"}
            </button>
            {showTransactions && (
                <div className="flex flex-col mt-4 overflow-y-auto max-h-96 border-2 rounded-sm">
                    {transactions.map((txn) => (
                        <Transactions
                            key={txn.transactionIndex}
                            index={txn.transactionIndex}
                            transaction={txn}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BlockViewer;
