export const Overflow = ({ m, b, NNR }) => {
  const outflow = (cotaAbsolutaApa) => {
    const h = cotaAbsolutaApa - NNR;
    if (h < 0) {
      return 0;
    }
    return m * b * Math.pow(h, 1.5) * Math.pow(2 * 9.81, 0.5);
  };
  return { outflow }
};
