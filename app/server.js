const app = require("./app");

// check env var port, otherwise default to 5000
const PORT = process.env.PORT || 5000;

// app server listen
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
