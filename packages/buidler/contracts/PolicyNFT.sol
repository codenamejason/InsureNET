pragma solidity >=0.6.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@nomiclabs/buidler/console.sol";

contract PolicyNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public owner;

    constructor(address _owner)
        public
        ERC721("InsureNET Policy", "iNETP")
    {
        owner = _owner;
    }

    event PolicyTokenIssued(
        uint256 tokenId,
        address insured,
        string tokenUri
    );

    function issuePolicy(address insured, string memory tokenUri)
        public
        returns(uint256)
    {
        _tokenIds.increment();

        uint256 newPolicyId = _tokenIds.current();
        _mint(insured, newPolicyId);
        _setTokenURI(newPolicyId, tokenUri);

        emit PolicyTokenIssued(newPolicyId, msg.sender, tokenUri);

        return newPolicyId;
    }
}