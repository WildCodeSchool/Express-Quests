const app = require("./src/app");

const port = process.env.APP_PORT;

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
