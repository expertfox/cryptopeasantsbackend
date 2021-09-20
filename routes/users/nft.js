const express = require('express');
const router = express.Router();
const contract = require('../../config/web3');

// // mod.cjs
// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));

// //getting data
// const getdata = async () => {
//   let noOfTokensByWalletAddr = await contract.methods
//     .balanceOf('0xCFD494C85D410CE4994ba94E60dBDEC71e5a5135')
//     .call();

//   for (let i = 0; i < noOfTokensByWalletAddr; i++) {
//     let jFile = await contract.methods.tokenURI(i).call();

//     try {
//       const options = { method: 'GET' };
//       fetch(jFile, options)
//         .then((response) => response.json())
//         .then((response) => console.log(response))
//         .catch((err) => console.error(err));
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// };

// getdata();

// // @route GET users/nft
// // @desc  use to get all posts
// // @access Public
// router.get('/:walletAddress', async (request, response) => {
//   try {
//     const options = { method: 'GET' };
//     fetch(request.params.walletAddress, options)
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));

//     response.json();
//   } catch (error) {
//     console.log(error.message);
//     return response.status(500).send('Server Error');
//   }
// });

//fetch nft metadata using walletaddress

module.exports = router;
