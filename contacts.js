const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// const contacts = require("./db/contacts.json");

const contactPath = path.resolve("./db/contacts.json");

console.log(contactPath);

async function listContacts() {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
}

async function updateList(contact) {
  fs.writeFile(contactPath, JSON.stringify(contact, null, 2));
}

// const getAll = () => {
//   const data =  fs.readFile(contactPath)
//   return JSON.parse(data)
// }

async function getContactById(id) {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === id);
  return result || null;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await updateList(allContacts);
  return newContact;
}

async function removeContact(id) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex( contact  => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await updateList(allContacts);
  return result;
}

// function addContact(name, email, phone) {

// }

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
