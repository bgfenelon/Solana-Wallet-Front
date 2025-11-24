import { create } from "zustand";

interface WalletState {
  walletName: string | null;
  privateKey: string | null;
  address: string | null;
  seedPhrase: string | null;

  balance: number; // saldo privado
  depositAddress: string | null; // endereço único de depósito

  setWallet: (
    name: string,
    privateKey: string,
    address: string,
    seedPhrase: string
  ) => void;

  setBalance: (amount: number) => void;
  setDepositAddress: (addr: string | null) => void;

  resetWallet: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  walletName: null,
  privateKey: null,
  address: null,
  seedPhrase: null,

  balance: 0,

  depositAddress: null,

  setWallet: (walletName, privateKey, address, seedPhrase) =>
    set({
      walletName,
      privateKey,
      address,
      seedPhrase,
      balance: 0,           // reseta saldo
      depositAddress: null, // reseta endereço de depósito
    }),

  setBalance: (amount) =>
    set((state) => ({
      balance: state.balance + amount,
    })),

  setDepositAddress: (addr) => set({ depositAddress: addr }),

  resetWallet: () =>
    set({
      walletName: null,
      privateKey: null,
      address: null,
      seedPhrase: null,
      balance: 0,
      depositAddress: null,
    }),
}));
