import { WSResponse } from '../interfaces';

// Defining global variables
let flag1: boolean = true;
let flag2: boolean = true;

let flag3: boolean = true;
let flag4: boolean = true;

let totalQ: number = 0;
let totalP: number = 0;

const handleData = (v: WSResponse) => {
  try {
    if (v.e !== "trade") throw "Not the trade stream";
    let seconds = new Date(v.T).getSeconds();

    // This if statement runs a single time
    if (flag3) {
      // This if statement runs a single time as well
      if (flag4) {
        let timeLeft = seconds > 30 ? 60 - seconds : 30 - seconds;
        console.log(
          `Starting, Waiting ${timeLeft} seconds to reach the next 30 second interval`
        );

        if (seconds >= 30 && seconds < 60) {
          flag1 = false;
          flag2 = false;
        }
        flag4 = false;
      }

      if (flag1) {
        if (seconds > 30) {
          initData(false, v.p, v.q);
        }
      } else {
        if (seconds < 30) {
          initData(true, v.p, v.q);
        }
      }
    } else {
      // Both flag1 and flag2 are true for [0, 30]
      if (seconds >= 0 && seconds < 30) {
        flag1 = true;
      }

      // Both flag1 and flag2 are false for [30, 60]
      if (seconds >= 30 && seconds < 60) {
        flag1 = false;
      }
      if (flag2 === !flag1) {
        outputAndResetData();
      }
      updateData(v.p, v.q);
    }
  } catch (err) {
    console.error('Error occured: ', err);
    process.exit()
  }
};

const updateData = (price: string, quantity: string) => {
  totalP += parseFloat(price) * parseFloat(quantity);
  totalQ += parseFloat(quantity);
};


const outputAndResetData = () => {
  console.log('\n========================================');
  console.log('Total Quantity- ', totalQ);
  let avPrice = totalP / totalQ;
  console.log('Average Price- ', avPrice);
  console.log('========================================');
  totalP = 0;
  totalQ = 0;
  flag2 = flag1;
};


const initData = (flagsVal: boolean, price: string, quantity: string) => {
  flag1 = flagsVal;
  flag2 = flagsVal;
  flag3 = false;
  console.log('Executing, wait 30 seconds');
  updateData(price, quantity);
};

export default handleData;
