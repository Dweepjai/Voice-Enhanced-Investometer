const equityColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d', '#00ff9d'];
const cryptoColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f'];

export const equityCategories = [
  { type: 'Reliance', amount: 0, color: equityColors[0] },
  { type: 'Tcs', amount: 0, color: equityColors[1] },
  { type: 'Hdfc', amount: 0, color: equityColors[2] },
  { type: 'Infosys', amount: 0, color: equityColors[3] },
  { type: 'Icici Bank', amount: 0, color: equityColors[4] },
  { type: 'Hul', amount: 0, color: equityColors[5] },
  { type: 'Sbi', amount: 0, color: equityColors[6] },
  { type: 'Bajaj Finance', amount: 0, color: equityColors[7] },
  { type: 'Others', amount: 0, color: equityColors[8] },
];

export const cryptoCategories = [
  { type: 'Bitcoin', amount: 0, color: cryptoColors[0] },
  { type: 'Ethereum', amount: 0, color: cryptoColors[1] },
  { type: 'Bnb', amount: 0, color: cryptoColors[2] },
  { type: 'Solana', amount: 0, color: cryptoColors[3] },
  { type: 'Xrp', amount: 0, color: cryptoColors[4] },
  { type: 'Terra', amount: 0, color: cryptoColors[5] },
  { type: 'Cardano', amount: 0, color: cryptoColors[6] },
  { type: 'Avalanche', amount: 0, color: cryptoColors[7] },
  { type: 'Dot', amount: 0, color: cryptoColors[8] },
  { type: 'Dogecoin', amount: 0, color: cryptoColors[9] },
  { type: 'Others', amount: 0, color: cryptoColors[10] },
];

export const resetCategories = () => {
  equityCategories.forEach((c) => c.amount = 0);
  cryptoCategories.forEach((c) => c.amount = 0);
};