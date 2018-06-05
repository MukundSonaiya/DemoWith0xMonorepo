pragma solidity ^0.4.24;


/**
@title Ownership
@dev The Ownership contract has an owner address, and provides basic authorization control.
*/
contract Ownership {

    address public owner;

    event OwnershipTransferred(address indexed _newOwner);


    /**
    @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
    @dev The constructor sets the original `owner` of the contract to the sender account.
    */
    constructor() public {
        owner = msg.sender;
    }


    /**
    @dev
        Allows the owner to transfer control of the contract to another address.
        Validations :
            - Only owner can access this function
            - _proposedOwner address can not be zero address
            - _proposedOwner address can not be the address of the current contract
            - _proposedOwner address can not be the same as current owner address
    @param _proposedOwner The address to transfer ownership to.
    @return success A bool indicating whether the ownership transfer was successful or not.
    */
    function transferOwnership(address _proposedOwner) public onlyOwner returns (bool success) {
        if (_proposedOwner != address(0) && _proposedOwner != address(this) && _proposedOwner != owner) {
            owner = _proposedOwner;
            emit OwnershipTransferred(_proposedOwner);
            return true;
        }
        return false;
    }
}
