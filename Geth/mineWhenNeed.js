var miningThreads = 1

function checkWork() {
    if (eth.getBlock("pending").transactions.length > 0) {
        if (eth.mining) return;
        console.log("--------------------------------------");
        console.log("Pending transactions! Mining...");
        miner.start(miningThreads);
    } else {
        miner.stop(0);
        console.log("No transactions! Mining stopped.");
        console.log("--------------------------------------");
    }
}

eth.filter("latest", function(err, block) { checkWork(); });
eth.filter("pending", function(err, block) { checkWork(); });
