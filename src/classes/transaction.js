import { Utils } from "alchemy-sdk";

class Transaction {
    constructor(_txn) {
        this.txn = _txn;
    }

    getStatus(status) {
        console.log(status);
        if (status === 1) {
            return "Success";
        } else {
            return "Failed";
        }
    }

    getGasUsed(gas) {
        return parseInt(gas);
    }

    getGasLimit() {
        return parseInt(this.txn.gasLimit);
    }

    getBlockNumber() {
        return this.txn.blockNumber;
    }

    getConfirmations() {
        return this.txn.confirmations;
    }

    getSender() {
        return this.txn.from;
    }

    getRecipient() {
        return this.txn.to;
    }

    getValue() {
        return Utils.formatUnits((parseInt(this.txn.value)).toString(), "ether");
    }

    contractInteraction() {}

    display() {
        return this.txn;
    }
}

export default Transaction;
