pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@nomiclabs/buidler/console.sol";

contract Hurricane {
    using SafeMath for uint256;

    address payable owner;
    
    uint public coupon;
    address payable oracle;
    address payable insured;
    address payable investor;

    uint public seasonStart;
    uint public seasonEnd;

    mapping(address => uint256) public policyHolders;
    mapping(address => uint256) insuredZipCodes;

    
    /**
    * @dev Outcome of the hurricane or named event
    */
    enum Outcome { NONE, CAT_3, CAT_4, CAT_5, VOID, OTHER }


    /** @dev Events */
    event PolicyCreated (
        uint256 id,
        address owner,
        uint256 season
    );

    event OutcomeReported (
        address oracle,
        Outcome outcome
    )


    /** @dev Policy Stuct */
    struct Policy {
        uint256 id;
        
    }

    Outcome outcome;

    /**
    * @dev Constructor function
    */
    constructor(address payable _owner, address payable _oracle)
        public
    {
        owner = _owner;
        oracle = _oracle;
    }

    /** @dev Functions */

    /**
    * @dev create a hurricane policy
    * @param _premium the amount of total premium. ex: .5 ETH
    * @param _season the year of coverage. ex: 2020
    */
    function createPolicy (
        uint256 _premium,
        uint256 _season
    )   
        public
        payable 
        returns (uint256, address)
    {
        // ToDo: Checks


        // return the policy id and owner
        return (1, 0xa0df350d2637096571F7A701CBc1C5fdE30dF76A);
    }

        // Called by oracle to report the outcome
    function reportOutcome(Outcome _outcome)
        external
    {
        require(msg.sender == oracle, 'only oracle can report outcome');
        require(now > seasonStart, 'too early, out of season');
        require(now < seasonEnd, 'too late, out of season');

        outcome = _outcome;

        // set the principal amount before sending or amount will be 0
        uint principal = 0;

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