require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/DappWorldNFT.sol/DappWorldNFT.json");

console.log(JSON.stringify(contract.abi)); 

const contractAddress = "0x5C2EeaA1Ced5573C414F4a8d785186afbe0e10F4";
const nftContract = new web3.eth.Contract(contract.abi , contractAddress);

async function mint(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mint(PUBLIC_KEY, tokenURI).encodeABI(),
    };
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              );
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        );
      })
      .catch((err) => {
        console.log(" Promise failed:", err);
      });
  }
  mint("https://gateway.pinata.cloud/ipfs/QmWvsmJXRuess862dwspEVJ6xsxNjqy3bskPCHDdMhMCwy?_gl=1*1eviclo*rs_ga*ZmJhMzAxN2YtYjBjNy00MzBkLWE1MjAtYmY2NmNmNmEyM2Rm*rs_ga_5RMPXG14TE*MTY4Mjc0NDc1MS4yLjEuMTY4Mjc0NTMzNi42MC4wLjA.");

  //Hash of the transaction:
  //0x49f646836d6b4bd247999a282c4babfb06262ef6f0ace55e5f99c871b68fe029