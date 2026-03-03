exports.storageHandler = async (event) => {
  console.log("File:", event.data.name);
  console.log("Bucket:", event.data.bucket);
};
