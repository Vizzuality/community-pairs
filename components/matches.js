import { skills } from './skills';

export const findCommonInterests = (...devs) => {
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
    .filter((f) => devs.includes(f.name));
    const filteredKeys = filtered.map(k => Object.keys(k))
  const result = filteredKeys
    .reduce(
      (a, b) =>
        a.filter((k) => b.includes(k))
    )
    .filter((k) => k !== 'name');
  return result;
};