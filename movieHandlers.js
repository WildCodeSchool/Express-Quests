const app = require('./app');
const PORT = 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${PORT}`);
  }
});
