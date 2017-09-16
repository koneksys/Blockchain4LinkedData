pragma solidity ^0.4.11;
contract Storage{
     struct userStorage{
        bytes Storage;
    }
    mapping(bytes => userStorage) UserStorage;

    struct userIndex{
        bool usedName;
    }
    mapping(bytes => userIndex) UserIndex;

    struct Backup{
        bytes contractUserAddress;
    }
    mapping(address => Backup) backup;

    function backingUp(address userAddress,bytes contractAddress){
        backup[userAddress].contractUserAddress = contractAddress;
    }

    function checkName(bytes isName)
    public constant
    returns(bool isIndeed){
        return UserIndex[isName].usedName;
    }

    function save(bytes newName, bytes newStorage){
        UserStorage[newName].Storage = newStorage;
        UserIndex[newName].usedName = true;
    }

    function getFilesByAddress(address userAddress) constant returns(bytes){
        return(
            backup[userAddress].contractUserAddress,
            );
    }

    function getStorageByName(bytes name)
    constant
    returns(bytes)
    {
     return(UserStorage[name].Storage);
    }
}
