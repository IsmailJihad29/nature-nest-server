import mongoose from 'mongoose';
import app from './app';
import { configEnv } from './app/config';


async function main() {
  try {
    await mongoose.connect(configEnv.database_url as string);

    app.listen(configEnv.port, () => {
      console.log(`app is listening on port ${configEnv.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
