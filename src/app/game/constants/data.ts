export const trolls = [
  {
    id: 1,
    name: 'Mullick',
    level: 3,
    fudIds: [3]
  },
  {
    id: 2,
    name: 'Shinobi',
    level: 3,
    fudIds: [1]
  },
  {
    id: 3,
    name: 'Lawson',
    level: 3,
    fudIds: [2]
  }
];

export function getTroll(id: number) {
  return trolls.find(troll => troll.id === id);
}

export const fuds = [
  {
    id: 1,
    name: 'The XRP blockchain is centralised',
    bingoUrl: 'https://fudbingo.com/the-xrp-blockchain-is-centralised'
  },
  {
    id: 2,
    name: 'XRP is a security',
    bingoUrl: 'https://fudbingo.com/xrp-is-a-security'
  },
  {
    id: 3,
    name: 'Ripple can freeze your coins',
    bingoUrl: 'https://fudbingo.com/ripple-can-freeze-your-coins'
  }
];

export function getFud(id: number) {
  return fuds.find(fud => fud.id === id);
}
