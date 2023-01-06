import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Layout from "../components/Layout";
import ConnectWalletButton from "../components/Buttons/ConnectWalletButton";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useAppContext } from "../hooks/useAppContext";
import useApproveToken from "../hooks/useApproveToken";
import useToast from "../hooks/useToast";
import BigNumber from "bignumber.js";
import classNames from "classnames";
import {
  getBusdContract,
  getContract,
  getRtknContract,
} from "../utils/contractHelpers";
import {
  getAddress,
  getBusdAddress,
  getRtknSaleAddress,
} from "../utils/addressHelpers";
import CustomButton from "../components/Buttons/Button";
import { CallSignerType } from "../types";
import { BIG_TEN } from "../utils/bignumber";
import erc20 from "../config/abi/erc20.json";
import { addresses } from "../config";
import { ethers } from "ethers";
import { RefreshContext } from "../contexts/RefreshContext";
import CopyToClipboard from "../components/Tools/copyToClipboard";
import { PageProps } from "gatsby";
import { SEO } from "../components/Seo";
import { FaGlobeAmericas, FaVideo, FaWrench } from "react-icons/fa";
import Typewriter from "typewriter-effect"

const buyRTKN = async (amount: string, ref: string, signer: CallSignerType) => {
  const contract = getRtknContract(signer);
  const value = new BigNumber(amount).times(BIG_TEN.pow(18)).toJSON();
  const tx = await contract.buyRTKN(value, ref);
  const receipt = await tx.wait();
  return receipt.status;
};

// check if a user has allowed spending a token in a specified smart contract
const checkTokenAllowance = async (
  account: string,
  contractAddress: string,
  tokenAddress: string,
  signer: CallSignerType
) => {
  const contract = getContract(erc20, tokenAddress, signer);
  const { _hex } = await contract.allowance(account, contractAddress);
  return new BigNumber(_hex);
};

const index = ({ location }: PageProps) => {
  const [fetching, setFetching] = useState(false);
  const {
    refAddress,
    triggerFetchTokens,
    wallet: { balance },
  } = useAppContext();
  const { active, account, library } = useActiveWeb3React();
  const { toastSuccess, toastError } = useToast();
  const [errorMsg, setErrorMsg] = useState("");
  const [amountToPay, setAmountToPay] = useState("0");
  const [isApproved, setIsApproved] = useState(false);

  const { onApprove } = useApproveToken(
    getBusdContract(library?.getSigner()),
    getRtknSaleAddress()
  );

  const { origin } = location;

  const checkRtknAllowance = useCallback(async () => {
    if (account && active && library) {
      const allowance = await checkTokenAllowance(
        account,
        getRtknSaleAddress(),
        getBusdAddress(),
        library.getSigner(account)
      );

      if (allowance.isLessThan(ethers.constants.MaxUint256)) {
        setIsApproved(false);
      } else {
        setIsApproved(true);
        return true;
      }
    } else {
      setIsApproved(false);
    }
    return false;
  }, [account, active, library]);

  useEffect(() => {
    checkRtknAllowance();
  }, [account, active, library]);

  const handleApprove = useCallback(async () => {
    if (account && library) {
      setFetching(true);
      try {
        checkRtknAllowance().then(async (res) => {
          if (!res) {
            await onApprove();
            setIsApproved(true);
          }
        });
      } catch (e) {
        console.error(e, "Failed");
        toastError(
          "Error",
          "Please try again. Confirm the transaction and make sure you are paying enough gas!"
        );
        setIsApproved(false);
      } finally {
        setFetching(false);
      }
    }
  }, [onApprove, account, library, toastError]);

  const handleBuyRTKN = useCallback(async () => {
    if (library) {
      setFetching(true);
      try {
        await buyRTKN(amountToPay, refAddress, library.getSigner());
        toastSuccess("RTKN has been sent to your wallet.");
        triggerFetchTokens();
      } catch (err) {
        console.error(err);
        toastError(
          "Error",
          "Something went wrong while trying to perform the transaction."
        );
      } finally {
        setFetching(false);
      }
    }
  }, [library, refAddress, amountToPay]);

  const handleInputChange: React.FormEventHandler<HTMLInputElement> =
    useCallback(
      async (e) => {
        const val = e.currentTarget.value.replace(/,/g, ".");
        const pattern = /^[0-9]*[.,]?[0-9]{0,18}$/g;
        if (!pattern.test(val)) return;

        const amount = new BigNumber(val);
        const bal = new BigNumber(balance);
        if (amount.isGreaterThan(bal)) {
          setErrorMsg("Insufficient funds in your wallet");
        } else {
          setErrorMsg("");
        }
        setAmountToPay(val);
      },
      [balance]
    );

  return (
    <Layout>
      <section className="flex flex-wrap text-center  ">
        <section className="basis-full text-white relative flex items-center h-[90vh]  bg-cover bg-center bg-landingImg md:bg-none">
          <video loop muted autoPlay  width="100%" className="absolute object-cover top-0 left-0  h-full w-full hidden md:block md:-z-10">
            {/* <source src="video/big_buck_bunny.webm" type="video/webm"> */}
            <source src="/milio-launch.mp4" type="video/mp4" />
            {/* <source src="video/big_buck_bunny.ogv" type="video/ogg"> */}
          </video>
          <div className="absolute w-full h-full bg-[#0b0a0ac4] -z-10"></div>
          <h2 className="text-3xl basis-full md:text-5xl p-8 font-thin ">
          <Typewriter
  onInit={(typewriter) => {
    typewriter.typeString('Do the Right thing by Buying <br /><span className="font-bold" style="font-weight: 700">RIGHTS Token</span> today')
      .callFunction(() => {
        console.log('String typed out!');
      })
      .pauseFor(2500)
      // .deleteAll()
      .callFunction(() => {
        console.log('All strings were deleted');
      })
      .start();
  }}

/>

</h2>
          {/* <h2 className="text-3xl basis-full md:text-5xl p-8 font-thin ">Do the Right thing by Buying <br /><span className="font-bold">RIGHTS Token</span> today</h2> */}
        </section>
        <section className="basis-full bg-[#e5e5e5]  p-8 ">

          <h1 className="text-2xl md:text-5xl  font-thin  my-10 leading-slug">
            RIGHTS <span className="text-black font-bold">Token Sale</span>.
          </h1>
          <section className="text-center space-y-5 relative">
            <div className="space-y-5 relative">
              <p className="max-w-lg mx-auto text-[#333333] font-light">
                BUY RTKN
              </p>
              <div className="bg-transparent p-5 max-w-sm space-y-3 mx-auto rounded">

                {active && isApproved && (
                  <TextInput
                    errorMsg={errorMsg}
                    onChangeHandler={handleInputChange}
                    value={amountToPay}
                    onSubmit={handleBuyRTKN}
                    trx={fetching}
                    isDisabled={
                      fetching ||
                      errorMsg.length > 0 ||
                      Number.isNaN(Number.parseFloat(amountToPay)) ||
                      Number.parseFloat(amountToPay) === 0
                    }
                  />
                )}
                {active && !isApproved && (
                  <CustomButton
                    onClick={handleApprove}
                    className="!block mx-auto uppercase text-base"
                    disabled={fetching}
                    loading={fetching}
                  >
                    Approve BUSD
                  </CustomButton>
                )}
                {!active && (
                  <Fragment>
                    <ConnectWalletButton />
                    <p className="text-sm">Connect your wallet.</p>
                  </Fragment>
                )}
              </div>
            </div>
          </section>

          {/* <section className="text-center py-10">
            <h2 className="text-3xl font-medium text-[#e54242] my-2">
              The Referral Programe
            </h2>
            <p className="">
              Share your referral link and get 10% BUSD commission for referred
              token purchases instantly to your wallet.
            </p>
            <div className="">
              <CopyToClipboard
                canCopy={active && account != null}
                content={`${origin}/buy?ref=${account}`}
              />
            </div>
          </section> */}
        </section>
      </section>
      

      <section className="bg-[#f6f6f6] p-10 text-center -z-20 gap-10 flex flex-wrap justify-around">
        <div className="basis-full md:basis-3/12 relative">
          
          <FaWrench color="white" size="64px" className="bg-black my-2 text-white block m-auto p-4 rounded-full hover:bg-red-600" />
          <h2 className="mb-2">PROFESSIONAL TOOLS</h2>
          <p >Creators can authenticate their content with ERC721 non-fungible tokens in the future</p>

        </div>
        <div className="basis-full md:basis-3/12">
          <FaGlobeAmericas color="white" size="64px" className="bg-black my-2 text-white block m-auto p-4 rounded-full hover:bg-red-600" />
          <h2>GLOBAL DISTRIBUTION</h2>
          <p>Creators can sell their work for RightsTokens to distributors around the world - digital currency for digital content</p>

        </div>
        <div className="basis-full md:basis-3/12">
          <FaVideo color="white" size="64px" className="bg-black my-2 text-white block m-auto p-4 rounded-full hover:bg-red-600" />
          <h2>DIGITAL CONTENT</h2>
          <p>Supported digital content will initially include video and music, but will expand in the future to include NFTs!</p>

        </div>

      </section>
      
      <section className="basis-full text-white relative flex items-center h-[300px]  bg-cover bg-center bg-landingImgs md:bg-none">
          <video loop muted autoPlay height="300px"  width="100%" className="absolute object-cover top-0 left-0  h-[300px] w-full hiddens md:block md:-z-10">
            <source src="/teaser.mp4" type="video/mp4" />
          </video>
          <div className="absolute w-full h-full bg-[#0b0a0ac4] "></div>
          <div className="text-center z-20">
          <p>What are you waiting for?</p>
          <h2 className="text-3xl  basis-full md:text-5xl p-8 font-thin  ">JOIN THE RIGHTSLEDGER MOVEMENT TODAY</h2>
          </div>
        </section>
    </Layout>

  );
};

interface TextInputProps {
  errorMsg: string;
  onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  value: string;
  isDisabled: boolean;
  trx: boolean; // transaction
}

const TextInput = ({
  onChangeHandler,
  onSubmit,
  errorMsg,
  value,
  isDisabled,
  trx,
}: TextInputProps) => {
  const [rtknBal, setRtknBal] = useState("0");

  const { fast } = useContext(RefreshContext);
  const { active, account, library } = useActiveWeb3React();

  const hasError = errorMsg.length > 0;
  const {
    wallet: { balance },
  } = useAppContext();

  // RTKN Balance
  useEffect(() => {
    (async () => {
      if (account && library) {
        const contract = getContract(erc20, getAddress(addresses.rtkn));
        contract
          .balanceOf(account)
          .then((p: ethers.BigNumber) => {
            const bal = new BigNumber(p._hex).div(BIG_TEN.pow(18)).toJSON();
            setRtknBal(bal);
          })
          .catch(() => {
            // console.error(e, "Error getting balance");
            setRtknBal("0");
          });
      } else {
        setRtknBal("0");
      }
    })();
    // also add the fast and slow vars from the refresh context
  }, [library, account, fast, active]);

  return (
    <div className="w-full space-y-2 mx-auto">
      <div className="p-3 rounded-lg transition-transform duration-200 ease-linear">
        <div>
          <div className="mb-2 text-xs font-light text-left">Amount</div>
          <div className="relative flex items-center justify-between space-x-1">
            <div className="w-full">
              <input
                type="text"
                className={classNames(
                  "placeholder-gray-400 outline-none border border-[#7B8BA5] font-medium",
                  "transition-all duration-200 text-gray-300 p-2 disabled:opacity-70 text-xl",
                  "disabled:cursor-not-allowed block bg-transparent w-full leading-none",
                  "bg-primary/20 rounded",
                  {
                    "text-red-400": hasError,
                  }
                )}
                placeholder="0"
                value={value}
                onChange={onChangeHandler}
              />
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span>RTKN Balance</span>
                <span>{rtknBal} RTKN</span>
              </div>
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span>BUSD Bal.</span>
                <span>{hasError ? errorMsg : balance}</span>
              </div>
              <div
                className={classNames(
                  "flex justify-between text-opacity-80 py-0.5 px-1 text-xs",
                  {
                    "text-red-400 font-normal": hasError,
                  }
                )}
              >
                <span>You will receive</span>
                <span>
                  {new BigNumber(value || 0).times(1065).toJSON()} RTKN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomButton
        onClick={onSubmit}
        className="block mx-auto w-full"
        disabled={isDisabled}
        loading={trx}
        variant="primary"
      >
        Buy RTKN
      </CustomButton>
    </div>
  );
};

export default index;

export const Head = () => (
  <SEO title="Buy | Rights Token" />
)