const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000;

const apiVersion = process.env.API_VERSION;
const senderPhone = process.env.SENDERPHONE;
const token = process.env.WA_TOKEN;

app.use(express.json());

app.post("/send-wa", async (req, res) => {
  const { id, buyerPhone, product, price } = req.body;
  const dataBody = {
    messaging_product: "whatsapp",
    to: buyerPhone,
    type: "template",
    template: { name: "hello_world", language: { code: "en_US" } },
  };

  try {
    await axios.post(
      `https://graph.facebook.com/${apiVersion}/${senderPhone}/messages`,
      dataBody,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    res.send({ status: "success" });
  } catch (error) {
    console.log({
      dataBody,
      error: error.response.data,
    });
    res.status(500).send(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
