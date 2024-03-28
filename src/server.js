const express = require("express");
const app = express();

const port = 8080;

const Members = require('./routes')


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/api/members', Members);



app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(200)
  res.json('error', { error: err })
})
app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err.message }); // Send error message as JSON response
  });
  
app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`);
});
