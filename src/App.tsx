import mainLogo from './assets/logo.jpg'
import { useEffect, useState } from "react";
import { useUserStore } from "./store";
import UserNameAvatar from "./components/UserNameAvatar";
import WebApp from '@twa-dev/sdk'
import { formattedBalance } from './utils';
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

function App() {
  const {currentUser, setCurrentUser} = useUserStore();
  const [balance, setBalance] = useState<number>(3000);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const MIN = 200, MAX = 100000;
  const userFriendlyAddress = useTonAddress();
  const {initDataUnsafe: initData} = WebApp;
  const [tonConnectUI] = useTonConnectUI();
  const GET_BALANCE_API = import.meta.env.VITE_GET_BALANCE_API;
  const DESTINATION_WALLET_ADDRESS = import.meta.env.VITE_DESTINATION_WALLET_ADDRESS;

  useEffect(() => {
    if(initData && !currentUser?.wallet_address) {
      console.log('<<<>>>', initData, currentUser);
      fetchCurrentUser(initData.user);
    }
  }, [initData, currentUser]);

  useEffect(() => {
    if(userFriendlyAddress) {
      onConnectWallet();
    }
  }, [userFriendlyAddress]);
  
  const getBanace = async (addr: string): Promise<number> => {
    const response = await fetch(GET_BALANCE_API.replace('AAA', addr));
    if(response.ok) {
      const result = await response.json();
      if (result.ok) {
        return parseFloat(result.result.balance);
      }
    }
    return 0;
  }

  const fetchCurrentUser = async (user: any) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
    if(response.ok) {
      const result = await response.json();
      if(result.success) {
        // TODO: set current user
        console.log('result', result);
      }
    }
  }

  const onConnectWallet = async () => {
    // TODO: update wallet address on backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/setwallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...currentUser!,
        wallet_address: userFriendlyAddress
      })
    });
    if(response.ok) {
      const result = await response.json();
      if(result.success) {
        // TODO: set current user
        console.log('connected wallet', result);
      }
    }
    setCurrentUser({
      ...currentUser!,
      wallet_address: userFriendlyAddress
    });
    getBanace(userFriendlyAddress).then((bal) => {
      setBalance(bal);
    });
  }

  const doDeposit = () => {
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
        {
          address: DESTINATION_WALLET_ADDRESS, // destination address
          amount: `${Math.floor(parseFloat(depositAmount) * 1e9)}` //Toncoin in nanotons
        }
      ]
    }
    return tonConnectUI.sendTransaction(transaction);
  }

  const onDeposit = async () => {
    if(MIN < balance && balance > MAX){
      WebApp.showAlert(`Deposit amount must be less than ${MIN}TON and greater than ${MAX}TON!`);
      return;
    }else{
      const depositResult = await doDeposit();
      if(depositResult.boc) {
        // TODO: check boc
      }
    }
  }

  const onWithdraw = async () => {
    if(MIN < balance && balance > MAX){
      WebApp.showAlert(`Withdraw amount must be less than ${MIN}TON and greater than ${MAX}TON!`);
      return;
    }else{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
      if(response.ok) {
        const result = await response.json();
        console.log(result);
      }
    }
  }

  return (
    <>
    <div className="w-full h-screen flex flex-col p-6 z-10 relative">
      {!currentUser?.wallet_address ? 
        <div className='w-full mt-2 flex flex-col flex-1 justify-between'>
          <h3 className='font-bold text-gray-900 text-center text-3xl mt-12'>Ton Stars</h3>
          <div>
            <img
              src={mainLogo}
              className="w-full rounded-lg mb-6"
              alt="ton stars main logo"
            />
            <p className='text-4xl text-center text-gray-500'>Connect your wallet</p>
            <p className='text-xl text-center text-gray-500 mt-2 mb-5'>Connect your ton wallet to continue</p>
            <TonConnectButton className='ton-wallet-btn mb-8' />
          </div>
        </div> :
        <div className="w-full mt-2 flex flex-col flex-1 justify-between">
          <div className='w-full flex flex-col items-center pt-12'>
            <UserNameAvatar name={currentUser?.fullname!} className="w-24 h-24 text-5xl" />
            <p className='cursor-pointer text-xl text-blue-500 mt-2 font-medium'>Edit profile image</p>
            <div className='w-full flex mt-10'>
              <div className='flex-1 font-semibold'>Username</div>
              <div className='flex-2 text-left'>@{currentUser.username!}</div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='rotate-90 w-4'>
                <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
              </svg>
            </div>
            <div className='w-full flex mt-8 items-center'>
              <div className='flex-1 font-semibold'>Wallet</div>
              <div className='flex-2 text-left flex items-center'>
                {currentUser.wallet_address!}
              </div>
              <svg onClick={() => {tonConnectUI.disconnect()}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4'>
                <path d="M272 112v51.6h-96c-26.5 0-48 21.5-48 48v88.6c0 26.5 21.5 48 48 48h96v51.6c0 42.6 51.7 64.2 81.9 33.9l144-143.9c18.7-18.7 18.7-49.1 0-67.9l-144-144C323.8 48 272 69.3 272 112zm192 144L320 400v-99.7H176v-88.6h144V112l144 144zM96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96z"/>
              </svg>
            </div>
            <div className='w-full flex mt-8 items-center'>
              <div className='flex-1 font-semibold'>Ton</div>
              <div className='flex-2 text-left flex items-center'>
                {formattedBalance(balance)} TON
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='rotate-90 w-4'>
                <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
              </svg>
            </div>
            <div className='w-full flex mt-8'>
              <div className='flex-1 font-semibold'>Stars</div>
              <div className='flex-2 text-left'>{currentUser.blue_stars.toLocaleString()}</div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='rotate-90 w-4'>
                <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
              </svg>
            </div>
          </div>
          <div className='w-full flex flex-col gap-3'>
            <div className='w-full'>
              <input
                type="number"
                value={depositAmount}
                className="h-10 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                onChange={(e) => { setDepositAmount(e.target.value) }}
                placeholder="1:1000"
              />
              <button
                type="button"
                onClick={onDeposit}
                className="text-white w-full mt-3 bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-xl px-5 py-3 flex-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
              >
                Deposit
              </button>
            </div>
            <hr className='border-gray-300'/>
            <div className='w-full'>
              <input
                type="number"
                value={withdrawAmount}
                className="h-10 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                onChange={(e) => { setWithdrawAmount(e.target.value) }}
                placeholder="1100:1"
              />
              <button
                type="button"
                onClick={onWithdraw}
                className="text-white w-full mt-3 bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-xl px-5 py-3 flex-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  </>
  );
}

export default App;
