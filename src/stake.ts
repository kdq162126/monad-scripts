import Web3 from "web3";
import { config } from "dotenv";

config();

const AMOUNT = `${process.env.STAKE_AMOUNT || 0.01}`;

const abi = [
  {
    type: "function",
    name: "deposit",
    inputs: [
      {
        name: "assets",
        type: "uint256",
      },
      {
        name: "receiver",
        type: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];

// Configuration interface
interface Config {
  rpcUrl: string;
  privateKey: string;
  contractAddress: string;
}

export async function stake() {
  try {
    // Set up configuration
    const config: Config = {
      rpcUrl: "https://testnet-rpc.monad.xyz",
      privateKey: process.env.PRIVATE_KEY as string,
      contractAddress: "0x3a98250f98dd388c211206983453837c8365bdc1",
    };

    // Initialize Web3
    const web3 = new Web3(config.rpcUrl);

    // Add private key to wallet
    const account = web3.eth.accounts.privateKeyToAccount(config.privateKey);
    web3.eth.accounts.wallet.add(account);

    // Create contract instance
    const contract = new web3.eth.Contract(abi, config.contractAddress);
    const value = web3.utils.toWei(AMOUNT, "ether");
    const receiver = account.address;

    // Prepare transaction
    const tx = {
      from: account.address,
      to: config.contractAddress,
      data: contract.methods.deposit(value, receiver).encodeABI(), // Pass assets and receiver
      value: value, // Send Ether
      gas: "100000", // Initial estimate
      gasPrice: await web3.eth.getGasPrice(),
    };

    // Estimate gas (recommended for payable functions)
    const gasEstimate = await contract.methods
      .deposit(value, receiver)
      .estimateGas({
        from: account.address,
        value: value,
      });
    tx.gas = gasEstimate.toString();

    console.log(
      `Calling deposit method with ${web3.utils.fromWei(value, "ether")} MON...`
    );

    // Sign and send transaction
    const receipt = await web3.eth.sendTransaction(tx);

    console.log("Transaction successful!");
    console.log("Transaction hash:", receipt.transactionHash);
    console.log("Block number:", receipt.blockNumber);
    console.log("MON sent:", web3.utils.fromWei(value, "ether"));

    return receipt;
  } catch (error) {
    console.error("Error calling contract method:", error);
    throw error;
  }
}

// stake()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
