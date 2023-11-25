import mongoose from 'mongoose';

import app from './app';

const prot = 5001;

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://admin_mos:admin12345@cluster0.t90v0gz.mongodb.net/mongose_first_project?retryWrites=true&w=majority',
    );
    app.listen(prot, () => {
      console.log(`App listening on port${prot}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
