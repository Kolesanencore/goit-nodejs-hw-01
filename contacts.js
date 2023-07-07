import fs from "fs/promises";

import path from "path";

import { nanoid } from "nanoid";

const contactsPath = path.resolve("db/contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const resultById = contacts.find((contact) => contact.id === contactId);
  return resultById || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactToRemove = contacts.find((contact) => contact.id === contactId);
  if (!contactToRemove) return null;

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return contactToRemove;
}
// Когда большие массивы лучше через find или findndex ??

// export async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const contactIndex = contacts.findIndex(
//     (contact) => contact.id === contactId
//   );
//   if (contactIndex === -1) return null;

//   const contactToRemove = contacts[contactIndex];
//   const updatedContacts = contacts.filter(
//     (contact) => contact.id !== contactId
//   );
//   await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
//   return contactToRemove;
// }

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
