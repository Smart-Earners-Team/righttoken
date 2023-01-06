import React from 'react'

const RoadMap = () => {
  return (
    <section className='font-normal flex flex-col items-center  text-center py-20 bg-[#F5F9FF] px-4 gap-10'>
        <h2 className='text-3xl md:text-5xl font-bold'>Roadmap</h2>
        <div className=''>
            <span className='bg-white w-5 h-5 block m-auto rounded-full mb-5'></span>
            <p>Q1 2021</p>
            <p>ZeroLoss was created</p>
            <p>Project Design was developed</p>
        </div>
        <div className=' w-full text-white flex flex-col gap-5'>
            <span className='bg-slate-300 w-5 h-5 block m-auto rounded-full '></span>
            <div className='bg-indigo-800 py-2 w-10/12 block m-auto'>
                <p>Q2 2021</p>
                <p>Architecting of DeFi platform</p>
                <p>Developing PMMe Algorithm</p>
            </div>
        </div>
        <div>
            <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
            <p>Q1 2022</p>
            <p>Onboarding New Partnerships</p>
        </div>
        <div>
            <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
            <p>Q2 2022</p>
            <p>Token Presale</p>
            <p>Launch of <strong>ZEROLOSS DeFi dAPP</strong>; RugChecker, Stake, SmartTrade, Pool, Mine and Farm</p>
        </div>
        <div>
            <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
            <p>Q1 2023</p>
            <p>Architecting of ZEROLOSS NFT Minting and Exchange Platform</p>
            <p>Begin development of cross-chain platform</p>
        </div>
    </section>
  )
}

export default RoadMap
