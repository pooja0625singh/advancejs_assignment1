const fetch = require("cross-fetch");

async function getapi(url) {
  try {
    let response = await fetch(url);
    if (response.status != 200) {
      throw new Error(`Error. Try again!!!!`);
    } else {
      let data = await response.json();
      data.prizes.forEach(prize => {
        if (prize.year >= 2000 && prize.year <=2019 && prize.category === "chemistry") {
          prize.laureates.forEach((laureate) => {
            console.log('${laureate.firstname} ${laureate.surname}');
        });
      }
    });
  }
  } catch(err) {
    console.log(err.message);
  }
};

getapi("http://api.nobelprize.org/v1/prize.json");


