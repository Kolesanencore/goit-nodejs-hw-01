import { Command } from "commander";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table);
      break;

    case "get":
      if (id) {
        getContactById(id).then(console.table);
      } else {
        console.table("Error: Missing ID argument");
      }
      break;

    case "add":
      if (name && email && phone) {
        addContact(name, email, phone).then(console.table);
      } else {
        console.table("Error: Missing name, email, or phone arguments");
      }
      break;

    case "remove":
      if (id) {
        removeContact(id).then(console.table);
      } else {
        console.table("Error: Missing ID argument");
      }
      break;

    default:
      console.table("\x1B[31mUnknown action type!");
  }
}

invokeAction(argv);
