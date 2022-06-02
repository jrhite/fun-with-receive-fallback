const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReceiveFallback", function () {
  let user;

  let receiveFallback;

  before(async function () {
    [, user] = await ethers.getSigners();
    
    const ReceiveFallback = await ethers.getContractFactory("ReceiveFallback");
    receiveFallback = await ReceiveFallback.deploy();
  
    await receiveFallback.deployed();
  })

  xit("sendTransaction() ransfers ETH and calls contract's receive()", async function () {
    let userBalance = await ethers.provider.getBalance(user.address);
    let contractBalance = await ethers.provider.getBalance(receiveFallback.address);

    console.log(`before sendTransaction():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);

    //
    // Payment txn
    //
    
    // send ether directly to the example contract address from the user
    await user.sendTransaction({
      to: receiveFallback.address,
      value: ethers.utils.parseEther('10'),
    });

    userBalance = await ethers.provider.getBalance(user.address);
    contractBalance = await ethers.provider.getBalance(receiveFallback.address);
    
    console.log(`after sendTransaction():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);
  });

  xit('provider.call() with calldata calls approve()', async function () {
    let userBalance = await ethers.provider.getBalance(user.address);
    let contractBalance = await ethers.provider.getBalance(receiveFallback.address);

    console.log(`before provider.call():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);

    const ABI = ['function approve(uint256 amount)'];
    const intf = new ethers.utils.Interface(ABI);

    const calldata = intf.encodeFunctionData('approve', [
      ethers.utils.parseUnits('1234', 18),
    ]);

    //
    // Invocation Txn
    //

    // call function at contract address from the signer
    //   * `value` is not set
    //   * `data` is set
    const approveTxn = await ethers.provider.call({
      to: receiveFallback.address,
      data: calldata,
    });

    userBalance = await ethers.provider.getBalance(user.address);
    contractBalance = await ethers.provider.getBalance(receiveFallback.address);

    console.log(`after provider.call():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);
  });

  xit('provider.call() with calldata and value does not call approve() because it\'s not payable', async function () {
    let userBalance = await ethers.provider.getBalance(user.address);
    let contractBalance = await ethers.provider.getBalance(receiveFallback.address);

    console.log(`before provider.call():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);

    const ABI = ['function approve(uint256 amount)'];
    const intf = new ethers.utils.Interface(ABI);

    const calldata = intf.encodeFunctionData('approve', [
      ethers.utils.parseUnits('1234', 18),
    ]);

    //
    // Payment & Invocation Txn to non-payable function
    //

    // call function at contract address from the signer
    //   * `value` is set
    //   * `data` is set
    const approveTxn = await ethers.provider.call({
      to: receiveFallback.address,
      data: calldata,
      value: ethers.utils.parseEther('10')
    });

    userBalance = await ethers.provider.getBalance(user.address);
    contractBalance = await ethers.provider.getBalance(receiveFallback.address);

    console.log(`after provider.call():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);
  });

  xit('provider.call() with calldata calls payableApprove()', async function () {
    let userBalance = await ethers.provider.getBalance(user.address);
    let contractBalance = await ethers.provider.getBalance(receiveFallback.address);

    console.log(`before provider.call():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);

    const ABI = ['function payableApprove(uint256 amount)'];
    const intf = new ethers.utils.Interface(ABI);

    const calldata = intf.encodeFunctionData('payableApprove', [
      ethers.utils.parseUnits('1234', 18),
    ]);

    //
    // Payment & Invocation Txn to non-payable function
    //

    // call function at contract address from the signer
    //   * `value` is not set
    //   * `data` is set
    const approveTxn = await ethers.provider.call({
      to: receiveFallback.address,
      data: calldata
    });

    userBalance = await ethers.provider.getBalance(user.address);
    contractBalance = await ethers.provider.getBalance(receiveFallback.address);

    console.log(`after provider.call():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);
  });

  xit('provider.call() with calldata and value calls payableApprove()', async function () {
    let userBalance = await ethers.provider.getBalance(user.address);
    let contractBalance = await ethers.provider.getBalance(receiveFallback.address);

    console.log(`before provider.call():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);

    const ABI = ['function payableApprove(uint256 amount)'];
    const intf = new ethers.utils.Interface(ABI);

    const calldata = intf.encodeFunctionData('payableApprove', [
      ethers.utils.parseUnits('1234', 18),
    ]);

    //
    // Payment & Invocation Txn to non-payable function
    //

    // call function at contract address from the signer
    //   * `value` is set
    //   * `data` is set
    const approveTxn = await ethers.provider.call({
      to: receiveFallback.address,
      data: calldata,
      value: ethers.utils.parseEther('10')
    });

    userBalance = await ethers.provider.getBalance(user.address);
    contractBalance = await ethers.provider.getBalance(receiveFallback.address);

    console.log(`after provider.call():`);
    console.log(`    user balance = ${ethers.utils.formatEther(userBalance)}`);
    console.log(`    contract balance = ${ethers.utils.formatEther(contractBalance)}`);
  });

  xit('provider.call() with invalid calldata calls payable fallback()', async function () {
    const ABI = ['function foo(uint256 amount)'];
    const intf = new ethers.utils.Interface(ABI);

    const calldata = intf.encodeFunctionData('foo', [
      ethers.utils.parseEther('1234.0'),
    ]);

    const approveTxn = await ethers.provider.call({
      to: receiveFallback.address,
      data: calldata,
    });
  });

  xit('provider.call() with invalid calldata and value calls payable fallback()', async function () {
    const ABI = ['function foo(uint256 amount)'];
    const intf = new ethers.utils.Interface(ABI);

    const calldata = intf.encodeFunctionData('foo', [
      ethers.utils.parseEther('1234.0'),
    ]);

    const approveTxn = await ethers.provider.call({
      to: receiveFallback.address,
      data: calldata,
      value: ethers.utils.parseEther('10'),
    });
  });
});
