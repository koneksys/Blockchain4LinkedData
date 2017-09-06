pragma solidity ^0.4.0;

contract userReg{

    struct UserStruct {
        bytes32 userName;
        bytes32 userMail;
        bytes32 userPerm;
        uint index;
    }
    UserStruct aUser;
    address[] private userIndex;
    mapping(address => UserStruct) private userStructs;

    struct UserCount{
        address userAddress;
        bytes32 userName;
        bytes32 userMail;
        bytes32 userPerm;
    }
    UserCount[] public userCount;
    mapping(address => bool) knownUser;

    function isUser(address userAddress) public constant returns(bool isIndeed){
        return knownUser[userAddress];
    }

    function getUserCount() public constant returns(uint count){
        return userCount.length;
    }

    function newUser(address userAddress, bytes32 userName, bytes32 userMail, bytes32 userPerm) internal returns(uint rowNumber){
        if(isUser(userAddress)) throw;
        UserCount newUser;
        newUser.userName = userName;
        newUser.userMail = userMail;
        newUser.userPerm = userPerm;
        knownUser[userAddress] = true;
        return userCount.push(newUser) - 1;
    }

    function addUser(
      address userAddress,
      bytes32 userName,
      bytes32 userMail,
      bytes32 userPerm
    ) public returns(uint index)
    {
        newUser(userAddress, userName, userMail, userPerm);
        userStructs[userAddress].userName = userName;
        userStructs[userAddress].userMail = userMail;
        userStructs[userAddress].userPerm = userPerm;
        return index;
        userIndex.push(userAddress);
    }

    function updateUser(
      address userAddress,
      bytes32 userName,
      bytes32 userMail,
      bytes32 userPerm
    ) public returns(uint index)
    {
        userStructs[userAddress].userName = userName;
        userStructs[userAddress].userMail = userMail;
        userStructs[userAddress].userPerm = userPerm;
        return index;
    }

    function updateUserName(
      address userAddress,
      bytes32 userName
    ) public returns(uint index)
    {
        userStructs[userAddress].userName = userName;
        return index;
    }

    function updateUserMail(
      address userAddress,
      bytes32 userMail
    ) public returns(uint index)
    {
        userStructs[userAddress].userMail = userMail;
        return index;
    }

    function updateUserPerm(
      address userAddress,
      bytes32 userPerm
    ) public returns(uint index)
    {
        userStructs[userAddress].userPerm = userPerm;
        return index;
    }

    function getUser(address userAddress)
      public
      constant
      returns(
          bytes32 userName,
          bytes32 userMail,
          bytes32 userPerm
        )
        {
            return(
              userStructs[userAddress].userName,
              userStructs[userAddress].userMail,
              userStructs[userAddress].userPerm
        );
    }

}
