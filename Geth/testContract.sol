pragma solidity ^0.4.0;

contract userReg{
    address[] private userIndex;
    UserStruct aUser;
    mapping(address => UserStruct) private userStructs;
    struct UserStruct {
        bytes32 userEmail;
        uint userAge;
        uint index;
    }

    event LogNewUser (
        address indexed userAddress,
        uint index,
        bytes32 userEmail,
        uint userAge);

    event LogUpdateUser(
        address indexed userAddress,
        uint index,
        bytes32 userEmail,
        uint userAge);

    function insertUser(
        address userAddress,
        bytes32 userEmail,
        uint userAge)
          public
          returns(uint index){
            userStructs[userAddress].userEmail = userEmail;
            userStructs[userAddress].userAge = userAge;
            return index;
            userIndex.push(userAddress);
    }

    function updateUser(
        address userAddress,
        bytes32 userEmail,
        uint userAge)
        public
        returns(uint index){
            userStructs[userAddress].userEmail = userEmail;
            userStructs[userAddress].userAge = userAge;
            return index;
    }

    function updateUserEmail(address userAddress, bytes32 userEmail)
        public
        returns(uint index){
            userStructs[userAddress].userEmail = userEmail;
            return index;
    }

    function updateUserAge(address userAddress, uint userAge)
        public
        returns(uint index){
            userStructs[userAddress].userAge = userAge;
            return index;
    }

    function getUser(address userAddress)
        public
        constant
        returns(bytes32 userEmail, uint userAge ){
          return(
            userStructs[userAddress].userEmail,
            userStructs[userAddress].userAge
        );
    }

    function isUser(address userAddress)
        public
        constant
        returns(bool isIndeed)
        {
            if(userIndex.length == 0) return false;
            return (userIndex[userStructs[userAddress].index] == userAddress);
    }

    function getUserCount() public constant returns(uint count) {
        return userIndex.length;
    }

    function getUserAtIndex(uint index)
        public
        constant
        returns(address userAddress)
        {
          return userIndex[index];
        }
}
