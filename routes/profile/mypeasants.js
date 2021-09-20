const express = require('express');
const router = express.Router();
const contract = require('../../config/web3');
const Profile = require('../../models/Profile');

// mod.cjs
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// //getting data
// const getdata = async () => {
//   let noOfTokensByWalletAddr = await contract.methods
//     .balanceOf('0xCFD494C85D410CE4994ba94E60dBDEC71e5a5135')
//     .call();

//   const addMarketPlaceLink = (jsonFile, index) => {
//     let jData = jsonFile;
//     jData.marketPlace =
//       'https://testnets.opensea.io/assets/0x83724f33098dcdf8eb269682d3a58748654f4eea/' +
//       index;
//     return jData;
//   };
//   //getting all nft data
//   for (let i = 0; i < noOfTokensByWalletAddr; i++) {
//     //metadata URI
//     let jFile = await contract.methods.tokenURI(i).call();

//     try {
//       const options = { method: 'GET' };
//       fetch(jFile, options)
//         .then((res) => res.json())
//         .then((res) => {

//           ///here
//         })
//         .catch((err) => console.error(err));
//       console.log(mypeasantsData);
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// };

// getdata();

const addMarketPlaceLink = (jsonFile, tokenindex) => {
  let jData = jsonFile;
  jData.marketURL =
    'https://testnets.opensea.io/assets/0x83724f33098dcdf8eb269682d3a58748654f4eea/' +
    tokenindex;
  return jData;
};

// @route GET profile/mypeasants
// @desc  use to get all posts
// @access Public
router.get('/:walletAddress', async (request, response) => {
  try {
    let noOfTokensByWalletAddr = await contract.methods
      .balanceOf(request.params.walletAddress)
      .call();

    //getting all nft data
    for (let i = 0; i < noOfTokensByWalletAddr; i++) {
      let tokenIDtoQuery = await contract.methods
        .tokenOfOwnerByIndex(request.params.walletAddress, i)
        .call();

      //metadata URI
      let jURL = await contract.methods.tokenURI(tokenIDtoQuery).call();

      try {
        const optionsfetch = { method: 'GET' };
        fetch(jURL, optionsfetch)
          .then((res) => res.json())
          .then(async (res) => {
            //add here db calls
            let tokenObject = {};
            tokenObject.tokenID = tokenIDtoQuery;
            tokenObject.metadata = res;
            //addMarketPlaceLink(res, tokenIDtoQuery);

            //checking if the profile exists in the DB
            let profileFound = await Profile.findOne({
              walletID: request.params.walletAddress,
            });
            if (profileFound) {
              profileFound.tokens = profileFound.tokens.map((u) => {
                u.tokenID !== tokenObject.tokenID ? tokenObject : u;
              });
              profileUpdated = await Profile.findOneAndUpdate(
                { walletID: request.params.walletAddress },
                { $set: profileFound },
                { new: true }
              );
            } else {
              //if profile not found for the user ID
              //CREATE PROFILE

              console.log(tokenObject);
              let profileCreate = {};
              profileCreate.walletID = request.params.walletAddress;
              profileCreate.tokens = [];
              profileCreate.tokens.push(tokenObject);

              await new Profile(profileCreate).save();
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error.message);
      }
    }

    return response.send('asdasd');
  } catch (error) {
    console.log(error.message);
    return response.status(500).send('Server Error');
  }
});

//fetch nft metadata using walletaddress

module.exports = router;
