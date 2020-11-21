pragma solidity >=0.6.0 <0.7.0;
//pragma experimental ABIEncoderV2;

contract IpfsInterface {

  mapping(address => string) public userFiles;
  mapping(address => string) public nftUriByOwner;


  function setUri(string memory uri)
    public
  {
    nftUriByOwner[msg.sender] = uri;
  }

  function sendHash(string memory x) public {
    userFiles[msg.sender] = x;
  }

  function getHash()  
    public 
    view 
    returns (string memory x) 
  {
      return userFiles[msg.sender];
  }

}