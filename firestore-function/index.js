exports.firestoreHandler = async (event) => {
  console.log("Document changed:", event.data.value.name);
};
