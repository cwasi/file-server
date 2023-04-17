import db from './models';
import app from './app';

db.sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`App listenin on port ${port}`);
});
