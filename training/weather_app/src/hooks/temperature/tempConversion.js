export const kToC = (k) => {
  const c = `${Math.round(k - 273.15)} °C`;
  return c;
};

export const kToF = (k) => {
  const f = `${Math.round((k - 273.15) * 1.8 + 32)} °F`;
  return f;
};
