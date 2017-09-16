pragma solidity ^0.4.11;
contract record {
    bytes[] public FileNames;

    function addFileName(bytes file){
        FileNames.push(file);
    }
}
