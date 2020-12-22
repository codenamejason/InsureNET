const { ethers } = require('ethers');
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const config = require('./config.json');
const app = express();
const port = 7001;
const rpcUrl = 'https://mainnet.infura.io/v3/5c19088a9f804202b4fe954c029de555';
const web3 = new Web3(rpcUrl);
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

// ipfs.add(Buffer.from('this is a test string'), (error, result) => {
//     if(error){
//         console.error(error)
//     }
//     console.log(result)
// })

//const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000000000000000000000000000';
//const { addresses, abis } = require("./src"); 

const ipfsAbi = [
	{
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "x",
				"type": "string"
			}
		],
		"name": "sendHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const ipfsAddress = '';
// const ipfsContract = new ethers.Contract(
//     ipfsAddress,
//     ipfsAbi,
//     'https://mainnet.infura.io/v3/5c19088a9f804202b4fe954c029de555'
// )

// sample LINK Token stats
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
const address = '0x514910771AF9Ca656af840dff83E8264EcF986CA'
const contract = new web3.eth.Contract(abi, address)

let node;
// Initialize ipfs
const initIpfs = () => {
    
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Routes
 * 
 */
// Endpoints
app.get('/heartbeat', (req, res) => {
    res.json({ status: 'ok' })
 })

app.get('/block-number', async (req, res) => {
    const blockNumber = await web3.eth.getBlockNumber()
    res.json({
        status: 'ok',
        blockNumber: blockNumber
    })
})

// OMG Token details as example
app.get('/token-details', async (req, res) => {
    const totalSupply = await contract.methods.totalSupply().call()
    const name = await contract.methods.name().call()
    const symbol = await contract.methods.symbol().call()
    const balanceOf = await contract.methods.balanceOf('0xd26114cd6EE289AccF82350c8d8487fedB8A0C07').call()
  
    res.json({
      status: 'ok',
      name: name,
      symbol: symbol,
      totalSupply: totalSupply,
      balanceOf: balanceOf
    })
})

app.route('/name').get((req, res) => {

    // response
    return res.send({"name": "Jason Romero"});
});


app.route('/tokens/nft/:id').get((req, res) => {
    if(isNaN(req.params.id)){
        return res.sendStatus(400);
    }

    return res.send({ "imageUrl": "https://testimages.com/tokens/" + req.params.id});
});


// app.route('').get((req, res) => {

// });


// app.route('').get((req, res) => {

// });


app.listen(port, () => {
    // let's let em know were running...
    console.info(`API running on port ${port}`);
});