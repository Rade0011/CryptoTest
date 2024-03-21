interface Coins {
  [key: string]: number;
}

function coinsDistribution(
  coinsAvailable: Coins,
  participantsRequested: string[]
): string[] | null {
  const result: string[] = [];

  for (const request of participantsRequested) {
    const requestedCoins = request.split("/");
    let provided = false;

    for (const coin of requestedCoins) {
      if (coinsAvailable[coin] > 0) {
        result.push(coin);
        coinsAvailable[coin]--;
        provided = true;
        break;
      }
    }

    if (!provided) {
      return null;
    }
  }

  return result;
}

const coinsAvailable: Coins = { ETH: 2, TRON: 3, MATIC: 2, TETHER: 1 };

const participantsRequested: string[] = [
  "ETH/TRON",
  "ETH/TRON",
  "ETH/TRON/MATIC",
  "MATIC/TRON/ETH",
  "TRON/ETH/MATIC",
  "TETHER",
];

const result = coinsDistribution(coinsAvailable, participantsRequested);
console.log(result);
