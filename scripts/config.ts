process.env.HARDHAT_NETWORK = 'opntestnet';
import hre from 'hardhat';
import config from '../uns-config.json';
import { MintingManager__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { URIPrefixController__factory } from '../types/factories/dot-crypto/contracts/controllers';
import { CNSRegistry__factory, Resolver__factory } from '../types/factories/dot-crypto/contracts';

// 0) deploy CNS and UNS in this order - remove prefix form UNS contract when claiming

async function main() {
  const contractConfig = config.networks['43214913'].contracts;

  // console.log(hre.config);

  // console.log('before signer');
  const [registryOwner, rcmOwner, predicateOwner, owner] = await hre.ethers.getSigners();
  // console.log('logging from config -> \n', registryOwner);

  // 1) SETUP contracts
  console.log(contractConfig.MintingManager);
  const mintingManager = new MintingManager__factory(registryOwner).attach(contractConfig.MintingManager.address);

  console.log(contractConfig.URIPrefixController);
  const uriPrefixController = new URIPrefixController__factory(registryOwner).attach(
    contractConfig.URIPrefixController.address,
  );

  console.log(contractConfig.UNSRegistry);
  const unsRegistry = new UNSRegistry__factory(registryOwner).attach(contractConfig.UNSRegistry.address);

  console.log(contractConfig.CNSRegistry);
  const cnsRegistry = new CNSRegistry__factory(registryOwner).attach(contractConfig.CNSRegistry.address);

  // resolver is just one
  console.log(contractConfig.Resolver);
  const resolver = new Resolver__factory(registryOwner).attach(contractConfig.UNSRegistry.address);

  // 2) whitelist minting manager in uri prefix controller
  // await uriPrefixController.addWhitelisted(contractConfig.MintingManager.address);
  console.log('Is whitelisted: ', await uriPrefixController.isWhitelisted(contractConfig.MintingManager.address));

  console.log(await mintingManager.isMinter('0xa54E26adA7480F4009935481aEAba54e0cC5d581'));

  // 3) add URI prefix + tld 'opn'
  // console.log(await mintingManager.setTokenURIPrefix('www.something.com/'));
  // console.log(await mintingManager.addTld('opn'));

  // 4) namehashes
  // generate namehash 'opn' -> 108789377716770410246075156284549775356114477880524154748803290430060529646652
  // generate namehas 'pesho.opn' -> 39839068619619670914921926983471477729794554723498730016839797338801648382256
  // generate namehas 'blog.pesho.opn' -> 60030658778493934659793987185120816019493311163757563228424289929009298576597
  // console.log((await unsRegistry.namehash(['blog', 'uns-devtest-pesho', 'opn'])).toString());

  const tldOPN = '108789377716770410246075156284549775356114477880524154748803290430060529646652';
  const peshoOPN = '39839068619619670914921926983471477729794554723498730016839797338801648382256';
  const blogPeshoOPN = '60030658778493934659793987185120816019493311163757563228424289929009298576597';
  const begPeshoOPN = '85442816492014420799687850223730819335265128169253052632039904423577826736850';
  // add pesho
  // await mintingManager.functions['claim(uint256,string)'](tldOPN, 'pesho');

  // 5) interaction with resolvers (NB: registry is a resolver)
  const tokenId = await cnsRegistry.childIdOf(tldOPN, 'uns-devtest-pesho');
  console.log('TOKEN ID: ', tokenId.toString());

  const tokenIdP2 = await cnsRegistry.childIdOf(peshoOPN, 'blog');
  console.log('TOKEN ID: ', tokenIdP2.toString());

  const tokenIdP3 = await cnsRegistry.childIdOf(peshoOPN, 'beg');
  console.log('TOKEN ID: ', tokenIdP3.toString());

  // console.log(await cnsRegistry.ownerOf(tokenId));
  console.log(await unsRegistry.ownerOf(tokenId));
  console.log(await unsRegistry.tokenURI(tokenId));
  console.log(await unsRegistry.ownerOf(tokenIdP2));
  console.log(await unsRegistry.tokenURI(tokenIdP2));
  console.log(await unsRegistry.ownerOf(tokenIdP3));
  console.log(await unsRegistry.tokenURI(tokenIdP3));

  // mint subdomain
  // await mintingManager.functions['issueWithRecords(address,string[],string[],string[])'](
  //   '0xa54E26adA7480F4009935481aEAba54e0cC5d581',
  //   ['blog', 'uns-devtest-pesho', 'opn'],
  //   ['opn.ETH.address'],
  //   ['0xa54E26adA7480F4009935481aEAba54e0cC5d581'],
  // );

  // await mintingManager.functions['issueWithRecords(address,string[],string[],string[])'](
  //   '0xe319a2d229ab2137b149723823f87d3836b462a5',
  //   ['beg', 'uns-devtest-pesho', 'opn'],
  //   ['someaddress'],
  //   ['0xe319a2d229ab2137b149723823f87d3836b462a5'],
  // );

  // console.log(await unsRegistry.resolverOf(blogPeshoOPN));
  // console.log('GET ADDRESS: ', await resolver.get('opn.ETH.address', blogPeshoOPN));

  // console.log('GET TOKEN: ', (await unsRegistry.reverseOf('0xa54e26ada7480f4009935481aeaba54e0cc5d581')).toString());

  // await resolver.set(
  //   'opn.ETH.address',
  //   '0xbB74566cc197738d2C2847D9a1aFCeA4F6d53e66',
  //   '60030658778493934659793987185120816019493311163757563228424289929009298576597',
  // );

  await unsRegistry
    .connect(predicateOwner)
    .setReverse('60030658778493934659793987185120816019493311163757563228424289929009298576597');

  console.log('GET TOKEN: ', (await unsRegistry.reverseOf('0xbB74566cc197738d2C2847D9a1aFCeA4F6d53e66')).toString());
  console.log('GET ADDRESS: ', await resolver.get('opn.ETH.address', blogPeshoOPN));

  // console.log(await unsRegistry.resolverOf(begPeshoOPN));
  // console.log('GET ADDRESS: ', await resolver.get('someaddress', begPeshoOPN));
  // console.log('GET TOKEN: ', (await unsRegistry.reverseOf('0xe319a2D229AB2137b149723823f87D3836b462A5')).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
