import { useEffect, useState } from "react";
import { DepositeForm, WithdrawalForm } from "../component/form";
import {
  myAddress,
  flexibleInfo,
  makeDeposit,
  doWithdraw,
  getWalletBalance,
} from "../sdk/index.js";
import { getAccountBalance, getMyAddress } from "../sdk/sdkactions";

const Dashboard = () => {
  const [accountBalance, setAccountBalance] = useState(0);
  const [accountBalanceLoading, setAccountBalanceLoading] = useState(false);
  const [activeAddress, setActiveAddress] = useState("");
  const [activeAddressLoading, setActiveAddressLoading] = useState(false);
  const [getInfoLoading, setGetInfoLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [withloading, setWithLoading] = useState(false);

  const [xendBalance, setXendBalance] = useState(0);
  const [xendSharedBalance, setXendSharedBalance] = useState(0);
  const [xresponse, setXresponse] = useState({});

  useEffect(async () => {
    getAccountBalance(setAccountBalance, setAccountBalanceLoading);
    getMyAddress(setActiveAddress, setActiveAddressLoading);

    getInfo();

    const activeAddress = await myAddress();
    setActiveAddress(activeAddress);
  }, [getWalletBalance, getMyAddress, xresponse]);

  const getInfo = async () => {
    setGetInfoLoading(true);
    const x = await flexibleInfo();
    if (x && Object.keys(x).length > 0) {
      setXendBalance(x.balance);
      setXendSharedBalance(x.shareBalance);
      setGetInfoLoading(false);
    }

    setGetInfoLoading(false);
  };

  const makeMyDeposite = async (amount) => {
    setLoading(true);
    const response = await makeDeposit(amount);
    setXresponse(response);
    setLoading(false);
  };

  const makeMyWithdrawal = async (amount) => {
    setWithLoading(true);
    const response = await doWithdraw(amount);
    setXresponse(response);
    setWithLoading(false);
  };

  useEffect(() => {
    if (xresponse && Object.keys(xresponse).length > 0) {
    }
  }, [xresponse]);

  return (
    <div>
      <div className="container">
        <div className="card p-1 mt-3">
          {activeAddressLoading ? (
            <div className=" text-center"></div>
          ) : (
            <>
              <h3 className="font-20" style={{ overflow: "hidden" }}>
                Custodian Wallet Address:{" "}
                <span className="font-weight-normal font-20">
                  {activeAddress}
                </span>
              </h3>
            </>
          )}
        </div>
      </div>

      <div className="container admin-dashboard">
        <div className="balance mb-4 mt-4">
          <div className="card wallet-balance">
            {accountBalanceLoading ? (
              <div className=" text-center mt-2"></div>
            ) : (
              <>
                {" "}
                <h3 className="font-weight-normal">Wallet Balance</h3>
                <h3 className="font-weight-normal">{accountBalance} BUSD</h3>
              </>
            )}
          </div>

          <div className="card invested-balance">
            {getInfoLoading ? (
              <div className=" text-center mt-2"></div>
            ) : (
              <>
                <h3 className="font-weight-normal">Xend Savings Balance</h3>
                <h3 className="font-weight-normal">{xendBalance} BUSD</h3>
              </>
            )}
          </div>
          <div className="card wallet-balance">
            {getInfoLoading ? (
              <div className=" text-center mt-2"></div>
            ) : (
              <>
                <h3 className="font-weight-normal">Xend Shared Balance</h3>
                <h3 className="font-weight-normal">
                  {xendSharedBalance} VBUSD
                </h3>
              </>
            )}
          </div>
        </div>
        <div className="transaction ">
          <DepositeForm makeMyDeposite={makeMyDeposite} loading={loading} />
          <WithdrawalForm
            makeMyWithdrawal={makeMyWithdrawal}
            loading={withloading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
