import { BlockchainLifecycle } from '@0xproject/dev-utils';
import * as chai from 'chai';
import 'make-promises-safe';

import { artifacts } from '../src/utils/artifacts';
import { chaiSetup } from '../src/utils/chai_setup';
import { provider, txDefaults, web3Wrapper } from '../src/utils/web3_wrapper';
import { OwnershipContract } from '../src/contract_wrappers/generated/ownership';

chaiSetup.configure();
const expect = chai.expect;
const blockchainLifecycle = new BlockchainLifecycle(web3Wrapper);

describe('Ownership', () => {
    let owner: string;
    let ownership: OwnershipContract;

    before(async () => {
        await blockchainLifecycle.startAsync();
    });
    after(async () => {
        await blockchainLifecycle.revertAsync();
    });
    before(async () => {
        const accounts = await web3Wrapper.getAvailableAddressesAsync();
        owner = txDefaults.from;
        ownership = await OwnershipContract.deployFrom0xArtifactAsync(artifacts.Ownership, provider, txDefaults);
    });
    beforeEach(async () => {
        await blockchainLifecycle.startAsync();
    });
    afterEach(async () => {
        await blockchainLifecycle.revertAsync();
    });

    describe('constructor', () => {
        it('should initialize owner to deployer', async () => {
            const ownerAddress = await ownership.owner.callAsync();
            expect(ownerAddress).to.be.equal(owner);
        });
    });
});
