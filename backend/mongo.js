const {argv} = require('node:process')
const mongoose = require('mongoose')

const password = argv[2]
const url =`mongodb+srv://sanjana2851:${password}@cluster0.ezi3x.mongodb.net/PhoneBookApp?retryWrites=true&w=majority`
const input = {}
input.name = argv[3]
input.phone = argv[4]

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    phone: String
})

const Entry = mongoose.model('entry', phoneSchema)

if (input.name && input.phone) {
    const entry = new Entry({
      name: input.name,
      phone: input.phone,
    })
    entry.save().then(() => {
      console.log(`Added ${entry.name} number ${entry.phone} to the phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => console.error(err));
} else {
  Entry.find({}).then((result) => {
      console.log('Entries in the phonebook');
      result.forEach((entry) => {
        console.log(`Name: ${entry.name}, Phone: ${entry.phone}`);
      });
      mongoose.connection.close();
    })
    .catch((err) => console.error(err));

}