const clusterApiUrl = solanaWeb3.clusterApiUrl("devnet");
const recipient_pubkey = "..";
class PhantomWallet {
  constructor() {
    this.wallet_pubkey = null;
    this.cur_transac_err = null;
    this.lastTransacId = null;
    this.isConnected = false;
  }
  async connectWallet() {
    //prompts user
    if (window.solana != null) {
      var res = await window.solana.connect();
      console.log("phantom wallet pubKey:", res.publicKey.toString());
      this.isConnected = true;
      this.wallet_pubkey = res.publicKey.toString();
      return true;
    } else {
      console.error("phantom wallet connect: no phantom wallet found");
      return false;
    }
  }
  async pubkey() {
    //prompts user
    return this.wallet_pubkey;
  }

  async disconnectWallet() {
    if (window.solana != null) {
      console.log("phantom wallet disconnect");
      window.solana.disconnect();
      this.isConnected = false;
    } else {
      console.error("phantom wallet disconnect: no phantom wallet found");
    }
  }
  isConnected() {
    if (window.solana != null) {
      console.log("phantom wallet isConnected()");
      if (window.solana.isConnected) return true;
      else return false;
    } else {
      console.error("no phantom");
    }
  }

  async requestTransaction(lamports, to_pubkey) {
    console.log(lamports * (4 / 100)); //error
    const transamount = Number((4 / 100) * lamports);
    console.log(transamount);
    console.log(lamports);
    this.cur_transac_err = null;
    this.lastTransacId = null;
    const sol = Number(transamount + lamports).toFixed(4);
    console.log(sol);
    console.log(sol * solanaWeb3.LAMPORTS_PER_SOL);
    let s_err = null;
    let onTransacErr = (s_err_) => (s_err = s_err_);
    let onOtherErr = (s_err_) => (s_err = s_err_);
    let signature = await this.createPhantomTransaction(
      clusterApiUrl,
      to_pubkey,
      sol * solanaWeb3.LAMPORTS_PER_SOL,
      onTransacErr,
      onOtherErr,
      "confirmed"
    );
    if (s_err != null) {
      console.error("createPhantomTransaction: transaction error:", s_err);
      this.cur_transac_err = s_err;
      return null;
    } else {
      console.log("transaction_id/signature:", signature);
      this.lastTransacId = signature;
      return signature;
    }
  }
  async createPhantomTransaction(
    clusterApiUrl,
    to_pubKey,
    lamports,
    onTransacErr,
    onOtherErr
  ) {
    if (!window.solana || !window.solana.isPhantom)
      return { signature: null, err: "no phantom wallet" }; //throw new Error('phantom provider not found');

    let provider = window.solana;
    if (provider == null) throw new Error("could not open phantom wallet(1)");
    if (!provider.isPhantom)
      throw new Error("could not open phantom wallet(2)");

    await this.connectWallet(); //connects if not connected

    const connection = new solanaWeb3.Connection(clusterApiUrl, "confirmed");
    let transaction = await this.createTransferTransaction(
      connection,
      provider,
      to_pubKey,
      lamports
    );
    let rslt = await provider.signAndSendTransaction(transaction);
    if (rslt == null) {
      console.error("transaction failed - rslt == null");
      return null;
    } else {
      const { signature } = rslt;
      console.log(
        "createPhantomTransaction: to_pubkey",
        to_pubKey,
        "signature",
        signature,
        "lamports",
        lamports
      );
      let res;
      try {
        res = await connection.confirmTransaction(signature);
      } catch (err) {
        //may have error: "Transaction was not confirmed in 30.04 seconds. It is unknown if it succeeded or failed. Check signrature ... using the Solana Explorer or CLI"
        console.error("createPhantomTransaction: handled transacErr:", err);
        let s_err = err.message;
        if (s_err.startsWith("Transaction was not confirmed in")) {
          s_err = "Transaction confirmation timeout";
        } else {
          s_err = "unknown error\nconsole for more info";
        }
        onTransacErr(s_err);
        return;
      }
      if (res.value.err != null) {
        console.error(
          "createPhantomTransaction: handled anyErr:",
          res.value.err
        );
        let s_err = res.value.err;
        // onAnyErr(s_err);
        return;
      }
      console.log("createPhantomTransaction: transaction confirmation: ", res);
      return signature; //return { signature, err: res.value.err };
    }
  }
  async createTransferTransaction(connection, provider, to_pubKey, lamports) {
    console.log(lamports);
    if (!provider.publicKey) return;
    let transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: new solanaWeb3.PublicKey(to_pubKey),
        lamports: lamports, // * web3.LAMPORTS_PER_SOL,
      })
    );
    transaction.feePayer = provider.publicKey;
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    console.log("transaction: ", transaction);
    return transaction;
  }

  async getBalance() {
    console.log("hi");
    console.log(this.wallet_pubkey);
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("testnet"),
      "confirmed"
    );
    console.log(new solanaWeb3.PublicKey(this.wallet_pubkey));
    return await connection.getBalance(
      new solanaWeb3.PublicKey(this.wallet_pubkey)
    );
  }
}

window.cryptoUtils = {
  phantomWallet: new PhantomWallet(),
};
