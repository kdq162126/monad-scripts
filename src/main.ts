import { deposit } from "./deposit";
import { withdraw } from "./withdraw";

const randomValue = Math.random() < 0.5 ? 0 : 1;

if (randomValue === 0) {
  deposit()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
} else {
  withdraw()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
