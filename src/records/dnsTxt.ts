import { Static, Boolean, String, Literal, Record, Union, Partial } from "runtypes";

export const RecordTypesT = Literal("openatts");

export const BlockchainNetworkT = Literal("ethereum");

export const EthereumAddressT = String.withConstraint((maybeAddress: string) => {
  return /0x[a-fA-F0-9]{40}/.test(maybeAddress) || `${maybeAddress} is not a valid ethereum address`;
});

export enum EthereumNetworks {
  homestead = "1",
  ropsten = "3",
  rinkeby = "4",
  goerli = "5",
  sepolia = "11155111",
  polygon = "137",
  polygonMumbai = "80001",
  local = "1337",
  xdc = "50",
  xdcapothem = "51",
}

export const EthereumNetworkIdT = Union(
  Literal(EthereumNetworks.homestead),
  Literal(EthereumNetworks.ropsten),
  Literal(EthereumNetworks.rinkeby),
  Literal(EthereumNetworks.goerli),
  Literal(EthereumNetworks.sepolia),
  Literal(EthereumNetworks.polygon),
  Literal(EthereumNetworks.polygonMumbai),
  Literal(EthereumNetworks.xdc),
  Literal(EthereumNetworks.xdcapothem),
  Literal(EthereumNetworks.local)
);

export const OpenAttestationDNSTextRecordT = Record({
  type: RecordTypesT,
  net: BlockchainNetworkT, // key names are directly lifted from the dns-txt record format
  netId: EthereumNetworkIdT, // they are abbreviated because of 255 char constraint on dns-txt records
  addr: EthereumAddressT,
}).And(
  Partial({
    dnssec: Boolean,
  })
);

export type BlockchainNetwork = Static<typeof BlockchainNetworkT>;
export type EthereumAddress = Static<typeof EthereumAddressT>;
export type OpenAttestationDNSTextRecord = Static<typeof OpenAttestationDNSTextRecordT>;
export type RecordTypes = Static<typeof RecordTypesT>;
