const findCommonInterests = require('./matches').findCommonInterests;

const createPairs = (devs, existingPairs, seed) => {
  const notAllowedPairs = existingPairs  || [];
  const takenIndexes = [];
  const createPair =  (selectedDev, i) => {
    const notAllowedIndexes = notAllowedPairs.filter(p => p.includes(selectedDev))
      .map(p => p[0] === selectedDev ? devs.indexOf(p[1]) :  devs.indexOf(p[0]));
    const availableIndexes = devs.map((_, j) => ((i === j || notAllowedIndexes.includes(j) || takenIndexes.includes(j)) ? null : j)).filter(Boolean);
    if (availableIndexes.length) {
      const match = availableIndexes[seed] || availableIndexes[0];
      takenIndexes.push(i);
      takenIndexes.push(match);
      return [selectedDev, devs[match]];
    }
  }
  const pairs = [];
  devs.forEach((d, i) => {
    if (!pairs.flat().includes(d)) {
      const createdPair = createPair(d, i);
      pairs.push(createdPair);
    }
  });
  return pairs;
};

export const pair = (devs, existingPairs) =>  {
  let finalPairs = null;
  devs.some((_, i) => {
    const createdPairs =  createPairs(devs, existingPairs, i);
    if (createdPairs.length === createdPairs.filter(Boolean).length) {
      finalPairs = createdPairs;
      return true;
    }
    return false;
  });
  return finalPairs;
};


export const pairWithMatches = (devs, existingPairs) => {
  const pairs = pair(devs, existingPairs)
  const texts = pairs.map(pair => {
    const [dev1, dev2] = pair;
    const commonInterests = findCommonInterests(dev1, dev2);
    return {
      dev1,
      dev2,
      commonInterests
    }
 });
 return texts;
};