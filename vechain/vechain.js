/*import Connex from '@vechain/connex';
import { useSigner } from "../state/signerContext";
import { useState, useEffect } from 'react';
import React, { createContext, useState, useContext } from 'react';

const useWalletConnex = () => {

  //Sync
  const [connex, setConnex] = useState<Connex | null>(null);
  const [vendor, setVendor] = useState<Connex.Vendor | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const { setSigner } = useSigner();

  //

  const { connex, vendor } = useMemo(() => {
    const connexInstance = new Connex({
          node: 'https://testnet.veblocks.net/',
          network: 'test',
        });
    const vendorInstance = new Connex.Vendor('test');
    return { connex: connexInstance, vendor: vendorInstance };
  }, []);


  const handleConnectWallet = () => {
    if (vendor) {
      vendor.sign("cert", {
        purpose: "identification",
        payload: {
          type: "text",
          content: "Connect your wallet to log in"
        }
      })
      .request()
      .then((r) => {
        setSigner(r.annex.signer);
        setWalletConnected(true);
        }).catch(() => {
            setSigner('User Canceled');
            setWalletConnected(false);
        });
        }
    };

    return { connex, vendor, walletConnected, handleConnectWallet };
};

export default useWalletConnex;


// Define the type for your context's value
type SignerContextType = {
   signer: string;
   setSigner: React.Dispatch<React.SetStateAction<string>>;
};


// Create the context with the correct type
export const SignerContext = createContext<SignerContextType>({
   signer: '',
   setSigner: () => { }
});


export const useSigner = () => useContext(SignerContext);


export const SignerProvider: React.FC<{
    children: React.ReactNode }> = ({ children }) => {
    const [signer, setSigner] = useState('');

    return (
        <SignerContext.Provider value = {{signer, setSigner}}>
        {children}
        </SignerContext.Provider>
    );
};

const depositABI = {
    "constant": false,
    "inputs": [{ "name": "username", "type": "string", "" }],
    "name": "depositAndSubmitUsername",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"

};

*/








//reuse hook with "const { handleConnectWallet, walletConnected } = useWalletConnex();"