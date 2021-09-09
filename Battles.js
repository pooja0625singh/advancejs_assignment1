const battles = require("./battles");

let data = {
  most_active: {
    attacker_king: "",
    defender_king: "",
    region: "",
    name: "",
  },
  attacker_outcome: {
    win: 0, 
    loss: 0, 
  },
  battle_type: [], 
  defender_size: {
    average: "",
    min: Number.MAX_VALUE,
    max: Number.MIN_VALUE,
  },
};

let attackerKing = {};
let defenderKing = {};
let battleRegion = {};
let battleName = {};
let sum = 0;

function getCount(count) {
  if (count) {
    count += 1;
  } else {
    count = 1;
  }
  return count;
}

function getMostActive(obj) {
  let max = 0;
  let mostActive = "";

  for (let i in obj) {
    if (obj[i] > max) {
      max = obj[i];
      mostActive = i;
    }
  }
  if (max == 1) {
    return "All names occured only once";
  }
  return mostActive;
}

battles.forEach((battle) => {
  attackerKing[battle["attacker_king"]] = getCount(attackerKing[battle["attacker_king"]]);

  defenderKing[battle["defender_king"]] = getCount(defenderKing[battle["defender_king"]]);

  battleRegion[battle["region"]] = getCount(battleRegion[battle["region"]]);

  battleName[battle["name"]] = getCount(battleName[battle["name"]]);

  if (battle.attacker_outcome == "win") {
    data.attacker_outcome.win += 1;
  }

  if (battle.attacker_outcome == "loss") {
    data.attacker_outcome.loss += 1;
  }


  if (!data.battle_type.includes(battle.battle_type) && battle.battle_type.length > 0) {
    data.battle_type.push(battle.battle_type);
  }

  if (battle.defender_size) {
    sum += battle.defender_size;

  if (data.defender_size.min > battle.defender_size)
    data.defender_size.min = battle.defender_size;

  if (data.defender_size.max < battle.defender_size)
    data.defender_size.max = battle.defender_size;
  }
  
});

data.defender_size.average = Math.round(sum / battles.length);

data.most_active.attacker_king = getMostActive(attackerKing);
data.most_active.defender_king = getMostActive(defenderKing);
data.most_active.region = getMostActive(battleRegion);
data.most_active.name = getMostActive(battleName);

console.log(data);
