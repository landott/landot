import React, { useState } from "react";

export const DepositeForm = ({ makeMyDeposite, loading }) => {
  const [amount, setAmount] = useState("0");

  const onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(amount) > 1000) {
    } else {
      makeMyDeposite(amount);
    }
  };

  return (
    <div className="showcase-form  card">
      <div>
        <h3>Deposite</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-control">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
          </div>

          <div>
            <button type="submit" className="btn">
              {loading ? <div className="text-center"></div> : "Deposite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export const FundWalletForm = ({ fund }) => {
  const [amountToFund, setAmountToFund] = useState("0");

  const onSubmit = (e) => {
    e.preventDefault();
    fund(amountToFund);
  };

  return (
    <div className="showcase-form card">
      <div>
        <h3>Fund Wallet</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-control">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={amountToFund}
              onChange={(e) => setAmountToFund(e.target.value)}
              placeholder="Amount"
              required
            />
          </div>

          <div>
            <button className="btn">
              {false ? (
                <img
                  className="loader"
                  src={"/img/referral/loader.gif"}
                  alt=""
                ></img>
              ) : (
                "Fund"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const WithdrawalForm = ({ makeMyWithdrawal, loading }) => {
  const [amount, setAmount] = useState("0");

  const onSubmit = (e) => {
    e.preventDefault();
    makeMyWithdrawal(amount);
  };

  return (
    <div className="showcase-form withdrawal-form card">
      <div>
        <h3>Withdraw</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-control">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
          </div>

          <div>
            <button type="submit" className="btn">
              {loading ? <div className="text-center"></div> : "Withdraw"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
