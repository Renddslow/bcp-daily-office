module.exports = (csv, key) => {
  const tree = csv.toString()
    .split('\n')
    .filter((t) => t)
    .reduce((acc, line) => {
      const [key, ...values] = line.split(',').map((t) => t.trim());
      acc[key] = [key, ...values];
      return acc;
    }, {});
  return tree[key];
};
