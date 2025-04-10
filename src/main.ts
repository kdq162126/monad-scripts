// main.ts (or your entry file)
import { deposit } from "./deposit";
import { redeem } from "./redeem";
import { stake } from "./stake";
import { withdraw } from "./withdraw";

// Array of function references (not invoking them yet)
const functions = [deposit, withdraw, stake, redeem];

// Select a random function
const randomIndex = Math.floor(Math.random() * functions.length);
const fn = functions[randomIndex];

// Log which function was selected
console.log(`Selected function: ${fn.name}`);

// Call only the selected function
fn()
  .then(() => {
    console.log("Function executed successfully");
    process.exit(0);
  })
  .catch((error: any) => {
    console.error("Error executing function:", error);
    process.exit(1);
  });
