const interpolareBiliniara = (h, biliniarArray) => {
  let minIndexA = (() => {
    for (let i = 0; i < biliniarArray.length - 1; i++) {
      if (biliniarArray[i + 1][0] >= h && biliniarArray[i][0] <= h) {
        return i;
      }
    }
  })();
  let minB = biliniarArray[minIndexA][1];
  let maxB = biliniarArray[minIndexA + 1][1]
  let percent = (h - biliniarArray[minIndexA][0]) / (biliniarArray[minIndexA + 1][0] - biliniarArray[minIndexA][0])
  return minB + percent * (maxB - minB)
};

const concatenareValori = (x, y) => {
  let xy = [];
  for (let i = 0; i < x.length; i++) {
    xy.push([x[i], y[i]]);
  }
  return xy;
};

const getH = (NNR, overflow, coteLac, cotaVolumAtenuat, deltaT, leftSum) => {
  let maxH = coteLac[coteLac.length - 1];
  let increment = 0.1
  for (let H = NNR; H < maxH; H += increment) {
    let S2 = interpolareBiliniara(H, cotaVolumAtenuat)
    let Q2 = overflow.outflow(H)
    let rightSum = ((2 * S2) / deltaT) + Q2
    if (rightSum / leftSum > 0.95) {
      return H
    }
  }
}

export { interpolareBiliniara, concatenareValori, getH };
