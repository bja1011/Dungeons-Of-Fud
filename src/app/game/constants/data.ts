export const characters = [
  {
    id: 1,
    name: 'Mullick',
    level: 3,
    fudIds: [3],
    converted: false,
    explored: false,
    type: 'troll',
    typeName: 'XRP troll',
  },
  {
    id: 2,
    name: 'Shinobi',
    level: 3,
    fudIds: [1],
    converted: false,
    explored: false,
    type: 'troll',
    typeName: 'XRP troll',
  },
  {
    id: 3,
    name: 'Lawson',
    level: 3,
    fudIds: [2],
    converted: false,
    explored: false,
    type: 'troll',
    typeName: 'XRP troll',
  },
  {
    id: 99,
    name: 'David',
    typeName: 'Omniscient',
    level: '??',
    fudIds: [99],
    converted: false,
    explored: false,
    type: 'david',
  },
  {
    id: 98,
    name: 'David',
    typeName: 'Omniscient',
    level: '??',
    fudIds: [],
    type: 'david',
  }
];

export function getCharacter(id: number) {
  return characters.find(character => character.id === id);
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
  },
  {
    id: 99,
    name: `
      Hello brave Zerparian! <br> <br>
      Help us to fight the FUDs spread by the trolls from the dungeons. <br> <br>
      I'm giving you the Manuscript of Truth - use it when you need it. <br>
`,
    confirmText: 'I will help!',
  }
];

export function getFud(id: number) {
  return fuds.find(fud => fud.id === id);
}

export const configDef = {
  frameRate: 9,
  repeat: -1
};
