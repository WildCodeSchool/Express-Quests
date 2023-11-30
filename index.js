const app = require("./src/app");

const app = require("./app");
const PORT = 6001;

app
  .listen(port, () => {
    console.log(`Server is listening on ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
require("dotenv").config();

app.listen(PORT, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${PORT}`);
  }
});
