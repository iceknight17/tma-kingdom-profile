import tonMarkBlue from './assets/toncoin-ton-logo-blue.svg'
import mainLogo from './assets/logo.jpg'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useEffect, useState } from "react";
import { useUserStore } from "./store";
import UserNameAvatar from "./components/UserNameAvatar";
import WebApp from '@twa-dev/sdk'

function App() {
  const {currentUser, setCurrentUser} = useUserStore();
  const [amount, setAmount] = useState<number>(0);
  const MIN = 200, MAX = 100000;
  const PRICE = 1000;
  const {initDataUnsafe: initData} = WebApp;

  // const fetchCurrentUser = async () => {
  //   const response = await fetch(`${import.meta.env.VITE_API_URL}/bet`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({})
  //   });
  //   if(response.ok) {
  //     const result = await response.json();
  //     if(result.success) {
  //       // TODO: set current user
  //     }
  //   }
  // }

  const onConnectWallet = () => {
    setCurrentUser({
      ...currentUser!,
      wallet_address: '123123123'
    });
  }

  useEffect(() => {
    if(initData && !currentUser?.wallet_address) {
      console.log('<<<>>>', initData, currentUser);
      // fetchCurrentUser();
    }
  }, [initData, currentUser]);

  return (
    <>
    <div className="w-full h-screen flex flex-col p-6 z-10 relative">
      {currentUser?.wallet_address ? 
        <div className='w-full mt-2 flex flex-col flex-1'>
          <h3 className='font-bold text-gray-900 text-center text-3xl'>Ton Stars</h3>
          <img
            src={mainLogo}
            className="w-full rounded-lg"
            alt="ton stars main logo"
          />
          <p className='text-xl text-center text-gray-500'>Connect your wallet</p>
          <p className='text-lg text-center text-gray-500'>Connect your ton wallet to continue</p>
          <button
            type="button"
            onClick={onConnectWallet}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-xl px-5 py-3 flex-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
          >
            Connect Wallet
          </button>          
        </div> :
        <div className="w-full mt-2 flex flex-col flex-1">
          <div className="w-full flex justify-between items-center">
            <div className="h-8 bg-gray-800 text-white rounded-lg pl-4 pr-5 w-max flex flex-row items-center gap-3 relative">
              <span className="leading-8 text-xl font-medium">{currentUser?.blue_stars.toLocaleString()}</span>
              <img
                src={tonMarkBlue}
                className="w-6 h-6"
                alt="ton coin mark"
              />
              <div onClick={() => {/** TODO: refresh balance */}}
                className='w-5 h-5 absolute rounded-full bg-white text-black insert-bottom-right flex justify-center items-center'
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-14px h-14px">
                  <path d="M370.7 133.3C339.5 104 298.9 88 255.8 88c-77.5.1-144.3 53.2-162.8 126.9-1.3 5.4-6.1 9.2-11.7 9.2H24.1c-7.5 0-13.2-6.8-11.8-14.2C33.9 94.9 134.8 8 256 8c66.4 0 126.8 26.1 171.3 68.7L463 41c15.1-15.1 41-4.4 41 16.9V192c0 13.3-10.7 24-24 24H345.9c-21.4 0-32.1-25.9-17-41l41.8-41.7zM32 296h134.1c21.4 0 32.1 25.9 17 41l-41.8 41.8c31.3 29.3 71.8 45.3 114.9 45.3C333.6 424 400.5 371 419 297.3c1.3-5.4 6.1-9.2 11.7-9.2H488c7.5 0 13.2 6.8 11.8 14.2C478.1 417.1 377.2 504 256 504c-66.4 0-126.8-26.1-171.3-68.7L49 471c-15.1 15.1-41 4.4-41-16.9V320c0-13.3 10.7-24 24-24z" />
                </svg>
              </div>
            </div>
            <Menu>
              <MenuButton>
                <UserNameAvatar name={currentUser?.fullname!} />
              </MenuButton>
              <MenuItems anchor="bottom end" className="block max-w-sm p-3 mt-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 z-10 text-gray-800">
                <MenuItem as="div" className="py-2">
                  Active Point {currentUser?.active_point}
                </MenuItem>
                <MenuItem as="div" className="py-2">
                  View History
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          <div className='w-full flex-1 flex flex-col justify-between'>
            <h1 className='text-gray-800 font-bold text-center text-3xl mt-16'>Welcome to Telegram<br />Ton Game Kingdom</h1>
            <div className="flex-1 flex flex-col-reverse pb-2">
              <div className="w-full flex items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={() => {}}
                  id="bet_btn"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-xl px-5 py-3 flex-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  Deposit
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  id="bet_btn"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-xl px-5 py-3 flex-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  Withdraw
                </button>
              </div>
              <div className="text-center text-white mt-2 mb-8 flex items-center justify-center gap-1.5">
                <span>{Math.floor(amount*PRICE).toLocaleString()}</span>
                <img
                  src={tonMarkBlue}
                  className="w-6 h-6 inline-block"
                  alt="ton coin mark"
                />
              </div>
              <div className="w-full flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {setAmount(MIN)}}
                  id="min_amount_btn"
                  className="h-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 flex justify-center items-center"
                >
                  Min
                </button>
                <input
                  type="number"
                  value={amount}
                  className="h-10 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  onChange={(e) => { 
                    if(e.target.value) {
                      setAmount(parseInt(e.target.value))
                    }else{
                      setAmount(0)
                    }
                  }}
                  placeholder="500"
                />
                <button
                  type="button"
                  onClick={() => {setAmount(MAX)}}
                  id="max_amount_btn"
                  className="h-8 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 flex justify-center items-center"
                >
                  Max
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  </>
  );
}

export default App;
