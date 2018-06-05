/**
 * This file is auto-generated using abi-gen. Don't edit directly.
 * Templates can be found at https://github.com/0xProject/0x-monorepo/tree/development/packages/contract_templates.
 */
// tslint:disable:no-consecutive-blank-lines ordered-imports
// tslint:disable-next-line:no-unused-variable
import { BaseContract } from "@0xproject/base-contract";
import { ContractArtifact } from "@0xproject/sol-compiler";
import {
  BlockParam,
  BlockParamLiteral,
  CallData,
  ContractAbi,
  DataItem,
  DecodedLogArgs,
  MethodAbi,
  Provider,
  TxData,
  TxDataPayable
} from "ethereum-types";
import { BigNumber, classUtils, logUtils, promisify } from "@0xproject/utils";
import { Web3Wrapper } from "@0xproject/web3-wrapper";
import * as ethers from "ethers";
import * as _ from "lodash";

export type OwnershipContractEventArgs = OwnershipTransferredContractEventArgs;

export enum OwnershipEvents {
  OwnershipTransferred = "OwnershipTransferred"
}

export interface OwnershipTransferredContractEventArgs extends DecodedLogArgs {
  _newOwner: string;
}

// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class OwnershipContract extends BaseContract {
  public owner = {
    async callAsync(
      callData: Partial<CallData> = {},
      defaultBlock?: BlockParam
    ): Promise<string> {
      const self = (this as any) as OwnershipContract;
      const functionSignature = "owner()";
      const inputAbi = self._lookupAbi(functionSignature).inputs;
      [] = BaseContract._formatABIDataItemList(
        inputAbi,
        [],
        BaseContract._bigNumberToString.bind(self)
      );
      const ethersFunction = self
        ._lookupEthersInterface(functionSignature)
        .functions.owner() as ethers.CallDescription;
      const encodedData = ethersFunction.data;
      const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
        {
          to: self.address,
          data: encodedData
        },
        self._web3Wrapper.getContractDefaults()
      );
      const rawCallResult = await self._web3Wrapper.callAsync(
        callDataWithDefaults,
        defaultBlock
      );
      let resultArray = ethersFunction.parse(rawCallResult);
      const outputAbi = (_.find(self.abi, { name: "owner" }) as MethodAbi)
        .outputs;
      resultArray = BaseContract._formatABIDataItemList(
        outputAbi,
        resultArray,
        BaseContract._lowercaseAddress.bind(this)
      );
      resultArray = BaseContract._formatABIDataItemList(
        outputAbi,
        resultArray,
        BaseContract._bnToBigNumber.bind(this)
      );
      return resultArray[0];
    }
  };
  public transferOwnership = {
    async sendTransactionAsync(
      _proposedOwner: string,
      txData: Partial<TxData> = {}
    ): Promise<string> {
      const self = (this as any) as OwnershipContract;
      const inputAbi = self._lookupAbi("transferOwnership(address)").inputs;
      [_proposedOwner] = BaseContract._formatABIDataItemList(
        inputAbi,
        [_proposedOwner],
        BaseContract._bigNumberToString.bind(self)
      );
      const encodedData = self
        ._lookupEthersInterface("transferOwnership(address)")
        .functions.transferOwnership(_proposedOwner).data;
      const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
        {
          to: self.address,
          ...txData,
          data: encodedData
        },
        self._web3Wrapper.getContractDefaults(),
        self.transferOwnership.estimateGasAsync.bind(self, _proposedOwner)
      );
      const txHash = await self._web3Wrapper.sendTransactionAsync(
        txDataWithDefaults
      );
      return txHash;
    },
    async estimateGasAsync(
      _proposedOwner: string,
      txData: Partial<TxData> = {}
    ): Promise<number> {
      const self = (this as any) as OwnershipContract;
      const inputAbi = self._lookupAbi("transferOwnership(address)").inputs;
      [_proposedOwner] = BaseContract._formatABIDataItemList(
        inputAbi,
        [_proposedOwner],
        BaseContract._bigNumberToString
      );
      const encodedData = self
        ._lookupEthersInterface("transferOwnership(address)")
        .functions.transferOwnership(_proposedOwner).data;
      const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
        {
          to: self.address,
          ...txData,
          data: encodedData
        },
        self._web3Wrapper.getContractDefaults()
      );
      const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
      return gas;
    },
    getABIEncodedTransactionData(_proposedOwner: string): string {
      const self = (this as any) as OwnershipContract;
      const inputAbi = self._lookupAbi("transferOwnership(address)").inputs;
      [_proposedOwner] = BaseContract._formatABIDataItemList(
        inputAbi,
        [_proposedOwner],
        BaseContract._bigNumberToString
      );
      const abiEncodedTransactionData = self
        ._lookupEthersInterface("transferOwnership(address)")
        .functions.transferOwnership(_proposedOwner).data;
      return abiEncodedTransactionData;
    },
    async callAsync(
      _proposedOwner: string,
      callData: Partial<CallData> = {},
      defaultBlock?: BlockParam
    ): Promise<boolean> {
      const self = (this as any) as OwnershipContract;
      const functionSignature = "transferOwnership(address)";
      const inputAbi = self._lookupAbi(functionSignature).inputs;
      [_proposedOwner] = BaseContract._formatABIDataItemList(
        inputAbi,
        [_proposedOwner],
        BaseContract._bigNumberToString.bind(self)
      );
      const ethersFunction = self
        ._lookupEthersInterface(functionSignature)
        .functions.transferOwnership(_proposedOwner) as ethers.CallDescription;
      const encodedData = ethersFunction.data;
      const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
        {
          to: self.address,
          data: encodedData
        },
        self._web3Wrapper.getContractDefaults()
      );
      const rawCallResult = await self._web3Wrapper.callAsync(
        callDataWithDefaults,
        defaultBlock
      );
      let resultArray = ethersFunction.parse(rawCallResult);
      const outputAbi = (_.find(self.abi, {
        name: "transferOwnership"
      }) as MethodAbi).outputs;
      resultArray = BaseContract._formatABIDataItemList(
        outputAbi,
        resultArray,
        BaseContract._lowercaseAddress.bind(this)
      );
      resultArray = BaseContract._formatABIDataItemList(
        outputAbi,
        resultArray,
        BaseContract._bnToBigNumber.bind(this)
      );
      return resultArray[0];
    }
  };
  public static async deployFrom0xArtifactAsync(
    artifact: ContractArtifact,
    provider: Provider,
    txDefaults: Partial<TxData>
  ): Promise<OwnershipContract> {
    if (_.isUndefined(artifact.compilerOutput)) {
      throw new Error("Compiler output not found in the artifact file");
    }
    const bytecode = artifact.compilerOutput.evm.bytecode.object;
    const abi = artifact.compilerOutput.abi;
    return OwnershipContract.deployAsync(bytecode, abi, provider, txDefaults);
  }
  public static async deployAsync(
    bytecode: string,
    abi: ContractAbi,
    provider: Provider,
    txDefaults: Partial<TxData>
  ): Promise<OwnershipContract> {
    const constructorAbi = BaseContract._lookupConstructorAbi(abi);
    [] = BaseContract._formatABIDataItemList(
      constructorAbi.inputs,
      [],
      BaseContract._bigNumberToString
    );
    const txData = ethers.Contract.getDeployTransaction(bytecode, abi);
    const web3Wrapper = new Web3Wrapper(provider);
    const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
      txData,
      txDefaults,
      web3Wrapper.estimateGasAsync.bind(web3Wrapper)
    );
    const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
    logUtils.log(`transactionHash: ${txHash}`);
    const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
    logUtils.log(
      `Ownership successfully deployed at ${txReceipt.contractAddress}`
    );
    const contractInstance = new OwnershipContract(
      abi,
      txReceipt.contractAddress as string,
      provider,
      txDefaults
    );
    contractInstance.constructorArgs = [];
    return contractInstance;
  }
  constructor(
    abi: ContractAbi,
    address: string,
    provider: Provider,
    txDefaults?: Partial<TxData>
  ) {
    super("Ownership", abi, address, provider, txDefaults);
    classUtils.bindAll(this, [
      "_ethersInterfacesByFunctionSignature",
      "address",
      "abi",
      "_web3Wrapper"
    ]);
  }
} // tslint:disable:max-file-line-count
