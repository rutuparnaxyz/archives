const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PubSub } = require("@google-cloud/pubsub");
const app = express();
const pubSubClient = new PubSub({
  projectId: "sitemaster-dev",
  keyFilename: "pubsub.json",
});
const topicName = "email_sms_topic";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Publisher working");
});

app.post("/publish", async (req, res) => {
  let userObj = req.body;
  let messageId = await publishMessage(pubSubClient, topicName, userObj);
  return res.status(200).json({
    success: true,
    message: `Message ${messageId} published :)`,
  });
});

async function publishMessage(pubSubClient, topicName, payload) {
  const dataBuffer = Buffer.from(JSON.stringify(payload));
  const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
  console.log(`Message ${messageId} published.`);
  return messageId;
}

app.listen(3000, () => {
  console.log("Publisher is up and running on port 3000.");
});
