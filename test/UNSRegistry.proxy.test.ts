import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { buildExecuteFunc, ExecuteFunc } from './helpers/metatx';
import { TLD } from './helpers/constants';
import { mintDomain } from './helpers/registry';
import { utils, BigNumber } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { UNSRegistry } from '../typechain-types/contracts';
import { UNSRegistry__factory } from '../typechain-types/factories/contracts';

describe('UNSRegistry (proxy)', () => {
  let unsRegistry: UNSRegistry;
  let unsRegistryFactory: UNSRegistry__factory;

  let buildExecuteParams: ExecuteFunc;

  let signers: SignerWithAddress[], owner: SignerWithAddress, receiver: SignerWithAddress;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    unsRegistryFactory = new UNSRegistry__factory(owner);
    unsRegistry = await upgrades.deployProxy(unsRegistryFactory, [owner.address], {
      initializer: 'initialize',
    }) as UNSRegistry;

    await unsRegistry['mintTLD(uint256,string)'](
      TLD.CRYPTO,
      'crypto',
    );
    await unsRegistry.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(unsRegistry.interface, unsRegistry.address, unsRegistry);
  });

  describe('Registry', () => {
    it('should construct itself correctly', async () => {
      expect(TLD.CRYPTO).to.be.equal(
        '0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f',
      );
    });

    it('should resolve properly', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['resolution', 'crypto']);
      await unsRegistry.burn(tokenId);

      await mintDomain(unsRegistry, owner.address, ['resolution', 'crypto']);
      await unsRegistry.transferFrom(owner.address, receiver.address, tokenId);
    });

    it('should set URI prefix', async () => {
      const tokenId = TLD.CRYPTO;
      expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);

      await unsRegistry.setTokenURIPrefix('prefix-');
      expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(
        `prefix-${tokenId}`,
      );

      await unsRegistry.setTokenURIPrefix('/');
      expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
    });
  });

  describe('Resolver', () => {
    it('should resolve tokens', async () => {
      const tokenId = await unsRegistry.namehash(['label_931', 'crypto']);

      // should fail to set name if not owner
      await expect(unsRegistry.set('key', 'value', tokenId)).to.be.revertedWith(
        'ERC721: invalid token ID',
      );

      await mintDomain(unsRegistry, owner.address, ['label_931', 'crypto']);
      await unsRegistry.set('key', 'value', tokenId);
      expect(await unsRegistry.get('key', tokenId)).to.be.equal('value');

      // should setMany
      await unsRegistry.setMany(['key1'], ['value1'], tokenId);
      await unsRegistry.setMany(
        ['key2', 'key3'],
        ['value2', 'value3'],
        tokenId,
      );
      await unsRegistry.setMany(
        ['key4', 'key5', 'key6'],
        ['value4', 'value5', 'value6'],
        tokenId,
      );
      expect(
        await unsRegistry.getMany(
          ['key1', 'key2', 'key3', 'key4', 'key5', 'key6'],
          tokenId,
        ),
      ).to.be.eql(['value1', 'value2', 'value3', 'value4', 'value5', 'value6']);

      // should reset
      await expect(unsRegistry.reset(tokenId))
        .to.emit(unsRegistry, 'ResetRecords')
        .withArgs(tokenId.toString());

      // should fail to set name if not owned
      await expect(
        unsRegistry.connect(signers[1]).set('key', 'value', tokenId),
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should get key by hash', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['heyhash', 'crypto']);
      const expectedKey = 'new-hashed-key';

      await unsRegistry.set(expectedKey, 'value', tokenId);

      const keyFromHash = await unsRegistry.getKey(
        BigNumber.from(utils.id(expectedKey)),
      );
      expect(keyFromHash).to.be.equal(expectedKey);
    });

    it('should get many keys by hashes', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['heyhash-many', 'crypto']);
      const expectedKeys = ['keyhash-many-1', 'keyhash-many-2'];

      await unsRegistry.setMany(expectedKeys, ['value', 'value'], tokenId);

      const expectedKeyHashes = expectedKeys.map((key) =>
        BigNumber.from(utils.id(key)),
      );
      const keysFromHashes = await unsRegistry.getKeys(expectedKeyHashes);
      expect(keysFromHashes).to.be.eql(expectedKeys);
    });

    it('should not consume additional gas if key hash was set before', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['heyhash-gas', 'crypto']);
      const newKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tokenId);
      const newKeyHashTxReceipt = await newKeyHashTx.wait();
      const exitsKeyHashTx = await unsRegistry.set(
        'keyhash-gas',
        'value',
        tokenId,
      );
      const exitsKeyHashTxReceipt = await exitsKeyHashTx.wait();
      expect(newKeyHashTxReceipt.gasUsed).to.be.above(
        exitsKeyHashTxReceipt.gasUsed,
      );

      const newKeyHashTx2 = await unsRegistry.setMany(
        ['keyhash-gas-1', 'keyhash-gas-2'],
        ['value-1', 'value-2'],
        tokenId,
      );
      const newKeyHashTxReceipt2 = await newKeyHashTx2.wait();
      const exitsKeyHashTx2 = await unsRegistry.setMany(
        ['keyhash-gas-1', 'keyhash-gas-2'],
        ['value-1', 'value-2'],
        tokenId,
      );
      const exitsKeyHashTxReceipt2 = await exitsKeyHashTx2.wait();
      expect(newKeyHashTxReceipt2.gasUsed).to.be.above(
        exitsKeyHashTxReceipt2.gasUsed,
      );

      const newKeyHashTx3 = await unsRegistry.setMany(
        ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'],
        ['value-1', 'value-2', 'value-3'],
        tokenId,
      );
      const newKeyHashTxReceipt3 = await newKeyHashTx3.wait();
      const exitsKeyHashTx3 = await unsRegistry.setMany(
        ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'],
        ['value-1', 'value-2', 'value-3'],
        tokenId,
      );
      const exitsKeyHashTxReceipt3 = await exitsKeyHashTx3.wait();
      expect(newKeyHashTxReceipt3.gasUsed).to.be.above(
        exitsKeyHashTxReceipt3.gasUsed,
      );
    });

    it('should get value by key hash', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['get-key-by-hash', 'crypto']);
      const key = 'get-key-by-hash-key';
      const expectedValue = 'get-key-by-hash-value';

      await unsRegistry.set(key, expectedValue, tokenId);

      const result = await unsRegistry.getByHash(utils.id(key), tokenId);
      expect(result.value).to.be.equal(expectedValue);
      expect(result.key).to.be.equal(key);
    });

    it('should get multiple values by hashes', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['get-many-keys-by-hash', 'crypto']);
      const keys = ['key-to-hash-1', 'key-to-hash-2'];
      const expectedValues = ['value-42', 'value-43'];

      await unsRegistry.setMany(keys, expectedValues, tokenId);

      const hashedKeys = keys.map((key) => BigNumber.from(utils.id(key)));
      const result = await unsRegistry.getManyByHash(hashedKeys, tokenId);
      expect(result).to.be.eql([keys, expectedValues]);
    });

    it('should emit NewKey event new keys added', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['new-key', 'crypto']);
      const key = 'new-key';
      const value = 'value';

      await expect(unsRegistry.set(key, value, tokenId))
        .to.emit(unsRegistry, 'NewKey')
        .withArgs(tokenId, utils.id(key), key);

      await expect(unsRegistry.set(key, value, tokenId)).not.to.emit(
        unsRegistry,
        'NewKey',
      );
    });

    it('should emit correct Set event', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['check-set-event', 'crypto']);
      const key = 'new-key';
      const value = 'value';

      await expect(unsRegistry.set(key, value, tokenId))
        .to.emit(unsRegistry, 'Set')
        .withArgs(tokenId, utils.id(key), utils.id(value), key, value);
    });

    it('should reconfigure resolver with new values', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['reconfigure', 'crypto']);
      await unsRegistry.set('old-key', 'old-value', tokenId);
      await unsRegistry.reconfigure(['new-key'], ['new-value'], tokenId);

      expect(await unsRegistry.get('old-key', tokenId)).to.be.equal('');
      expect(await unsRegistry.get('new-key', tokenId)).to.be.equal(
        'new-value',
      );

      // should fail when trying to reconfigure non-owned domain
      await expect(
        unsRegistry
          .connect(signers[1])
          .reconfigure(['new-key'], ['new-value'], tokenId),
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should keep forwarding storage layout consistent after upgrade', async () => {
      const tokenId = await mintDomain(unsRegistry, owner.address, ['up_state_domain_2', 'crypto']);
      expect(await unsRegistry.nonceOf(tokenId)).to.be.equal(0);

      const params1 = await buildExecuteParams(
        'transferFrom(address,address,uint256)',
        [owner.address, receiver.address, tokenId],
        owner,
        tokenId,
      );
      await unsRegistry.execute(params1.req, params1.signature);
      expect(await unsRegistry.nonceOf(tokenId)).to.be.equal(1);

      unsRegistry = await upgrades.upgradeProxy(
        unsRegistry.address,
        unsRegistryFactory,
      ) as UNSRegistry;

      expect(await unsRegistry.nonceOf(tokenId)).to.be.equal(1);

      const params2 = await buildExecuteParams(
        'transferFrom(address,address,uint256)',
        [receiver.address, owner.address, tokenId],
        receiver,
        tokenId,
      );
      await unsRegistry.execute(params2.req, params2.signature);
      expect(await unsRegistry.nonceOf(tokenId)).to.be.equal(2);
    });
  });
});
