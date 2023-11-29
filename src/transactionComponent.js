import { Utils } from "alchemy-sdk";

function Transactions({ index, transaction }) {
    console.log(transaction)
    return (
        <div>
            <h2>TXN Number: {index}</h2>
            <h3>Hash: {transaction.hash}</h3>
            <h3>From: {transaction.from}</h3>
            <h3>To: {transaction.to}</h3>
            <h3>Value: {Utils.formatUnits((parseInt(transaction.value)).toString(), "ether")} ETH</h3>
        </div>
    );
}

export default Transactions;
