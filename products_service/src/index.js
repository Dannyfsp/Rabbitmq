const app = require("./app");

const port = process.env.APP_PORT;

app.listen(port, () => console.log(`Server up and running on port ${port}`));
