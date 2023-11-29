class Block {
    constructor(_block) {
        this.block = _block;
    }

    getTimestamp() {
        let date = new Date(this.block.timestamp * 1000);
        return date.toString();
    }

    getTransactions() {
        return this.block.transactions;
    }

    getTransactionCount() {
        return this.block.transactions.length;
    }

    getGasUsed() {
        return parseInt(this.block.gasUsed);
    }

    getGasUsedPercentage() {
        return ((parseInt(this.block.gasUsed) / parseInt(this.block.gasLimit)) * 100).toFixed(2);
    }
}

export default Block;
