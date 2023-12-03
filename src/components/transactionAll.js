import { Utils } from "alchemy-sdk";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

function Transactions({ index, transaction }) {
    const [status, setStatus] = useState();
    const [gasUsed, setGasUsed] = useState();
    const [contractInteraction, setContractInteraction] = useState();

    

    return (
        <div>
            <h2>TXN Number: {index}</h2>
            <Link to={`/txn/${transaction.hash}`}>
                <button>View Transaction Details</button>
            </Link>
            <h3>Hash: {transaction.hash}</h3>
            <h3>From: {transaction.from}</h3>
            <h3>To: {transaction.to}</h3>
            <h3>Value: {Utils.formatUnits((parseInt(transaction.value)).toString(), "ether")} ETH</h3>
        </div>
    );
}

export default Transactions;
