const { ethers } = require('ethers');

const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const config = require('./config.json');
const app = express();
const port = 7001;
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


// Initialize ipfs
const initIpfs = () => {
    
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Routes
 * 
 */

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