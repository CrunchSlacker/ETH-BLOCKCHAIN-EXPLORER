import { Utils } from "alchemy-sdk";
import { Link } from "react-router-dom";

function Transactions({ index, transaction }) {

  return (
    <div className="bg-gray-800 text-white p-4 mb-4 rounded-md">
      <h2 className="text-xl font-semibold">TXN Number: {index}</h2>
      <Link to={`/txn/${transaction.hash}`}>
        <button className="bg-papaya text-black px-2 py-1 rounded-md hover:bg-white hover:text-papaya transition-all duration-300">
          View Transaction Details
        </button>
      </Link>
      <h3 className="text-lg">Hash: {transaction.hash}</h3>
      <h3>From: {transaction.from}</h3>
      <h3>To: {transaction.to}</h3>
      <h3>
        Value: {Utils.formatUnits(transaction.value.toString(), "ether")} ETH
      </h3>
    </div>
  );
}

export default Transactions;
