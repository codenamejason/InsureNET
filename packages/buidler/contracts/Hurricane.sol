// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@nomiclabs/buidler/console.sol";

contract Hurricane {
    using SafeMath for uint256;

    address payable owner;    
    address payable oracle;
    address payable insured;

    uint public seasonStart = 6;
    uint public seasonEnd = 11;

    uint256 policyCount;   

    //mapping(address => uint256) public policyHolders;
    mapping(address => uint256) insuredZipCodes;
    mapping(uint256 => Policy) public policies;
    mapping(address => Policy) public policyHolders;
    
    modifier onlyOwner {
        require(msg.sender == owner, "You need to be the owner.");
        _;
    }

    modifier onlyOracle {
        require(msg.sender == oracle, "You need to be the oaracle.");
        _;
    }
    
    /**
    * @dev Outcome of the hurricane or named event
    */
    enum Outcome { NONE, VOID, OTHER, CAT_3, CAT_4, CAT_5 }
    // 0, 1, 2, 3, 4, 5


    /** @dev Events */
    event PolicyCreated (
        uint256 id,
        address indexed owner,
        uint256 indexed zipCode,
        uint256 season,
        uint256 premium,
        uint256 timestamp
    );

    event OutcomeReported (
        address oracle,
        Outcome indexed outcome,
        uint256 indexed zipCodeAffected,
        uint256 timestamp
    );

    struct Insured {
        address payable id;
        mapping(address => Policy) policies;
    }

    /** @dev Policy Stuct */
    struct Policy {
        uint256 id;
        uint256 season;
        uint256 zipCodeCovered;
        uint256 premium;
        address payable owner;
        uint256 possiblePayout3;
        uint256 possiblePayout4;
        uint256 possiblePayout5;
        bool voided;
    }

    // Internal policy array
    //Policy[] public policyArray;

    /**
    * @dev Constructor function
    */
    constructor(address payable _owner, address payable _oracle)
        public
    {
        owner = _owner;
        oracle = _oracle;
    }

    function purchasePolicy( 
        uint256 _season,
        uint256 _zipCode
    )
        public
        payable
        returns (uint256, address, uint256, uint256)   
    {
        createPolicy(_season, _zipCode);
    }

    function voidPolicy(
        uint256 policyId        
    )
        public
        onlyOwner
        returns(bool)        
    {
        policies[policyId].voided = true;

        return true;
    }

    /**
    * @dev create a hurricane policy
    * @param _season the year of coverage. ex: 2020
    * @param _zipCode the zip code of covered home
    */
    function createPolicy (
        uint256 _season,
        uint256 _zipCode
    )   
        internal         
        returns (uint256, address, uint256, uint256)
    {
        // ToDo: Checks

        uint256 policyId = policyCount ++;

        policies[policyId].id = policyId;
        policies[policyId].season = _season;
        policies[policyId].zipCodeCovered = _zipCode;
        policies[policyId].premium = msg.value;
        policies[policyId].owner = msg.sender;
        policies[policyId].possiblePayout3 = msg.value.mul(10);
        policies[policyId].possiblePayout4 = msg.value.mul(20);
        policies[policyId].possiblePayout5 = msg.value.mul(30);
        policies[policyId].voided = false; // backup to deactivate/activate a policy
        
        emit PolicyCreated(policyId, msg.sender, _zipCode, _season, msg.value, block.timestamp);
        console.log("Policy Created");

        // return the policy id and owner
        return (policyId, msg.sender, msg.value, _season);
    }

    function getPolicy(uint256 _id)
        public
        view
        returns(Policy memory)
    {
        return policies[_id];
    }

    function getPoliciesForInsured(address payable _insured)
        public
        returns(Policy[] memory)
    {
        Policy[] memory userPolicies;

        return userPolicies;
    }

    // Called by oracle to report the outcome
    // ToDo: figure out how to apply to the correct policies...
    function reportOutcome(Outcome _outcome, uint256 _zipCodeAffected)
        external
        onlyOracle
    {
        require(msg.sender == oracle, 'only oracle can report outcome');
        require(msg.sender != address(0), 'cannot call from zero address');
        // ToDo: figure out...
        //require(now >= seasonStart, 'too early, out of season');
        //require(now <= seasonEnd, 'too late, out of season');
        // ToDo: need to figure out how to handle the outcomes
        

        // set the principal amount before sending or amount will be 0
        uint principal = 0;

        emit OutcomeReported(oracle, _outcome, _zipCodeAffected, block.timestamp);

        // Send payment based on outcome
        if(_outcome == Outcome.CAT_3) {
            // transfer to sponser
            insured.transfer(principal);
            
        } if(_outcome == Outcome.CAT_4) {
            // transfer to sponser
            insured.transfer(principal);
            
        } if(_outcome == Outcome.CAT_5) {
            // transfer to sponser
            insured.transfer(principal);
            
        } else if(_outcome == Outcome.VOID) {
            // give back to insured
            insured.transfer(principal);

        } else {
            // default to insured
            insured.transfer(principal);
        }
    }


    function withdrawBalance() 
        public
    {
        msg.sender.transfer(address(this).balance);        
    }

    // fallback function can accept msg.data as an argument. Then, it returns any payload provided with the call.
    fallback() external payable {}
}