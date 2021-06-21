const formatBetsString = (a: string) => {
  const b = a.split(",").map(function (item) {
    return parseInt(item, 10);
  });
  return b;
};
