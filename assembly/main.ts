import "allocator/arena";
export { memory };

import { context, storage, near, collections } from "./near";

let ethToNear = new collections.Map<string, string>("ethToNear");
let nearToEth = new collections.Map<string, string>("nearToEth");

export function connectEthereumAddress(ethAddress: string): void {
  ethToNear.set(ethAddress, context.sender);
  nearToEth.set(context.sender, ethAddress);
}

export function disconnectEthereumAddress(): void {
  ethToNear.delete(nearToEth.get(context.sender));
  nearToEth.delete(context.sender);
}

export function getNearAddress(ethAddress: string): string {
  return ethToNear.get(ethAddress);
}