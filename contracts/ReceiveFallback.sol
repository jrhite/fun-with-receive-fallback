//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract ReceiveFallback {
    function approve(uint256 amount) external view {
      console.log("in approve(): amount = ");
      console.logUint(amount);
    }

    function payableApprove(uint256 amount) external payable {
      console.log("in paybleApprove(): amount = ");
      console.logUint(amount);
    }

    receive() external payable {
      console.log("in receive()");
    }

    fallback() external payable {
      console.log("in fallback()");
    }
}
