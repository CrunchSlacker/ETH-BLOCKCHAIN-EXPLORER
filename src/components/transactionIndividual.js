// TransactionDetailed.js
import { Link, useParams } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import Transaction from "../classes/transaction.js";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function TransactionDetailed() {
    const { txnHash } = useParams();
    const [status, setStatus] = useState();
    const [gasUsed, setGasUsed] = useState();
    const [gasLimit, setGasLimit] = useState();
    const [blockNumber, setBlockNumber] = useState();
    const [confirmations, setConfirmations] = useState();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [value, setValue] = useState();

    useEffect(() => {
        async function getTransactionDetails() {
            const txnDetails = await alchemy.core.getTransaction(txnHash);
            const receipt = await alchemy.core.getTransactionReceipt(txnHash);
            const txn = new Transaction(txnDetails);
            setStatus(txn.getStatus(receipt.status));
            setGasUsed(txn.getGasUsed(receipt.gasUsed));
            setBlockNumber(txn.getBlockNumber());
            setGasLimit(txn.getGasLimit());
            setConfirmations(txn.getConfirmations());
            setFrom(txn.getSender());
            setTo(txn.getRecipient());
            setValue(txn.getValue());
        }
        getTransactionDetails();
    }, [txnHash]);

    return (
        <div className="font-sans bg-black text-white flex flex-col items-center justify-center w-full min-h-screen p-4">
            <div className="text-2xl mb-2">
                <span className="text-papaya font-semibold">
                    Transaction Hash:{" "}
                </span>
                {txnHash}
            </div>
            <div className="text-lg mb-2">
                <span className="text-papaya font-semibold">Status:</span>{" "}
                {status}
            </div>
            <div className="text-lg mb-2">
                <span className="text-papaya font-semibold">Block:</span>{" "}
                {blockNumber}
            </div>
            <div className="text-lg mb-2">
                <span className="text-papaya font-semibold">
                    Confirmations:
                </span>{" "}
                {confirmations}
            </div>
            <div className="text-lg mb-2">
                <span className="text-papaya font-semibold">From:</span> {from}
            </div>
            <div className="text-lg mb-2">
                <span className="text-papaya font-semibold">To:</span> {to}
            </div>
            <div className="text-lg mb-2">
                <span className="text-papaya font-semibold">Value:</span>{" "}
                {value} ETH
            </div>
            <div className="text-lg font-semibold mb-2">
                ---Gas Information---
            </div>
            <div className="text-lg">
                <span className="text-papaya font-semibold">Gas Used:</span>{" "}
                {gasUsed}
            </div>
            <div className="text-lg">
                <span className="text-papaya font-semibold">Gas Limit:</span>{" "}
                {gasLimit}
            </div>
            <div className="text-lg">
                <span className="text-papaya font-semibold">Percent Used:</span>{" "}
                {((gasUsed / gasLimit) * 100).toFixed(2)}%
            </div>
            <Link to={`/block/${blockNumber}`}>
                <button className="mt-4 px-4 py-2 bg-papaya rounded-md text-black">
                    Back
                </button>
            </Link>
        </div>
    );
}

export default TransactionDetailed;
