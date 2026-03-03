exports.pubsubHandler = async (event) => {
  const message = Buffer.from(event.data.message.data, 'base64').toString();
  console.log("Received message:", message);
};
