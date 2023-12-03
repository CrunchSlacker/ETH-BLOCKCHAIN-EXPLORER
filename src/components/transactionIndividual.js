import { useParams } from "react-router-dom";
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
    }, []);

    return (
        <div>
            <h3>TXN Hash: {txnHash}</h3>
            <h3>Status: {status}</h3>
            <h3>Block: {blockNumber}</h3>
            <h3>Confirmations: {confirmations}</h3>
            <h3>From: {from}</h3>
            <h3>To: {to}</h3>
            <h3>Value: {value} ETH</h3>
            <h3>---Gas Information---</h3>
            <div>
                <h5>Gas Used: {gasUsed}</h5>
                <h5>Gas Limit: {gasLimit}</h5>
                <h5>Percent Used: {((gasUsed / gasLimit) * 100).toFixed(2)}%</h5>
            </div>
        </div>
    );
}

export default TransactionDetailed;
