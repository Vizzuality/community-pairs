import { findCommonInterests } from './matches';

const createPairs = (devs, existingPairs, seed, hasTrio) => {
  const notAllowedPairs = existingPairs  || [];
  const takenIndexes = [];
  const createPair = (selectedDev, i) => {

    const isTrio = hasTrio && i === 0;
    const notAllowedIndexes = [];
    notAllowedPairs.filter(p => p.includes(selectedDev))
      .forEach(pair => {
        pair.forEach(d => {
          if (d !== selectedDev) {
            notAllowedIndexes.push(devs.indexOf(d));
          }
        })
      });
    const availableIndexes = devs.map((_, j) => ((i === j || notAllowedIndexes.includes(j) || takenIndexes.includes(j)) ? null : j)).filter(Boolean);
    if (availableIndexes.length) {

      if (isTrio) {
        console.log(availableIndexes, existingPairs)
        const match = availableIndexes[seed] || availableIndexes[0];
        const match2 = availableIndexes[seed + 1] || availableIndexes[1];
        takenIndexes.push(i);
        takenIndexes.push(match);
        takenIndexes.push(match2);
        return [selectedDev, devs[match], devs[match2]];
      }

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
    const hasTrio = devs.length % 2 === 1;
    const createdPairs = createPairs(devs, existingPairs, i, hasTrio);
    const pairNumber = Math.floor(devs.length / 2);
    const nonEmptyCreatedPairs =  createdPairs.filter(Boolean);
    if (nonEmptyCreatedPairs.length === pairNumber) {
      finalPairs = nonEmptyCreatedPairs;
      return true;
    }
    return false;
  });
  return finalPairs;
};


export const pairWithMatches = (devs, existingPairs) => {
  const pairs = pair(devs, existingPairs)
  if(!pairs.length) return [];
  const texts = pairs?.map((pair) => {
    const [dev1, dev2, dev3] = pair;
    const commonInterests = findCommonInterests(...pair);
    return {
      dev1,
      dev2,
      dev3,
      commonInterests
    };
  });
 return texts;
};