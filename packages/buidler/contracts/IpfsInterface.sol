pragma solidity >=0.6.0 <0.7.0;
//pragma experimental ABIEncoderV2;

contract IpfsInterface {

 string ipfsHash;
 
 mapping(address => string) public userFiles;
 mapping(address => string) public nftUriByOwner;

 function setUri(string memory uri)
    public
{
    nftUriByOwner[msg.sender] = uri;
}






 
 function sendHash(string memory x) public {
   ipfsHash = x;
 }

 function getHash() public view returns (string memory x) {
   return ipfsHash;
 }

}