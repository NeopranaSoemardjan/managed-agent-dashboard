const midtransClient = require("midtrans-client");

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "Mid-server-IuSzhkP1tFBuIeWDaY8h6Kow",
});

const parameters = {
  transaction_details: {
    order_id: "SUB-b117ce1b-9931-409e-b98f-8be1925c9f22-PRO_M",
    gross_amount: 750000,
  },
  item_details: [
    {
      id: "PRO_M",
      name: "Langganan PRO_M",
      price: 750000,
      quantity: 1,
    },
  ],
  customer_details: {
    phone: "209420390823",
  },
};

snap
  .createTransaction(parameter)
  .then((transaction) => {
    const transactionToken = transaction.token;
    console.log("transactionToken:", transactionToken);
  })
  .then(
    (snapResponse) => {
      let snapToken = snapResponse.data.token;
      console.log("Retrieved snap token:", snapToken);
      window.snap.embed("YOUR_SNAP_TOKEN", {
        embedId: "snap-container",
      });
    },
    (error) => {
      res.send(`Fail to call API w/ error ${error}`);
      console.log(error);
    },
  );
