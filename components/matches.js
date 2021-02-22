const skills = require('./skills').skills;

const findCommonInterests = (name1, name2) => {
  const filtered = skills
    .map((n) => {
      const un = {};
      un.name = n['Your name'];
      Object.entries(n).forEach(([k, v]) => {
        if (
          v.includes('Expert') ||
          v.includes('Learning') ||
          v.includes('Want to learn')
        ) {
          un[k] = v;
        }
      });
      return un;
    })
    .filter((f) => [name1, name2].includes(f.name));
  return Object.keys(filtered[0]).filter(
    (k) => Object.keys(filtered[1]).includes(k) && k !== 'name' && k !== 'Timestamp'
  );
};

exports.findCommonInterests = findCommonInterests;