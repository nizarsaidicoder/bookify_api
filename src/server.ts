import app from "./app";

const port = process.env.port || 3000;



app.listen(port, () =>
{
  console.log(`App listening on port ${port}`);
});
