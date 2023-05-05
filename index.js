const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/send-wa", async (req, res) => {
  const { id, buyerPhone, product, price } = req.body;

  const apiVersion = "v16.0";
  const senderPhone = "106251159133816";
  const token =
    "EAAKtM6JlzZBkBABCJvPPoDk8LdfEIG3cGipUIu6epbLSX4iAgdYGnsKgbJlyMOA8nghGvuOyZB9rspErKD0HFTny1KEJElOVNNqgiNPVpZAFeLRhw1VyG6TLusmXVBh359zYAczN82kmyWcelHsn2ZAYq1aLsMlEuKYwx79wsgTdFyTgDKTZACZAbWfw3D5ZBZBniL3MZB45HCwZDZD";

  try {
    await axios.post(
      `https://graph.facebook.com/${apiVersion}/${senderPhone}/messages`,
      {
        messaging_product: "whatsapp",
        to: buyerPhone,
        type: "template",
        template: { name: "hello_world", language: { code: "en_US" } },
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    res.send({ status: "success" });
  } catch (error) {
    console.log(error.response);
    res.status(500).send(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
