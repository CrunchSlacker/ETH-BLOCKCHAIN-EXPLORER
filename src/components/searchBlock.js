import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { Navigate } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function SearchBlock() {
  const [blockNumber, setBlockNumber] = useState();
  const [latestBlockNum, setLatestBlockNum] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setBlockNumber(document.getElementById("blockInput").value);
  };

  useEffect(() => {
    async function getLatestBlockNumber() {
      setLatestBlockNum(await alchemy.core.getBlockNumber());
    }

    getLatestBlockNumber();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-screen flex flex-col items-center border-white p-8">
        {blockNumber && <Navigate to={`/block/${blockNumber}`} />}
        <h1 className="text-4xl text-white mb-4">
          Let's Take a Look At <span className="text-papaya">Block</span>
        </h1>

        <form onSubmit={handleSubmit} className="w-1/3 border-2 border-white">
          <input
            type="number"
            pattern="[0-9]*"
            id="blockInput"
            max={latestBlockNum}
            className="p-4 bg-transparent outline-none text-white w-full"
            placeholder="Enter Block #"
          />
        </form>
      </div>
    </div>
  );
}

export default SearchBlock;
