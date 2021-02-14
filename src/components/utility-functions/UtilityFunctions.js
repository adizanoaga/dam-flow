function calculVolumApaLac(arrayCote = [], arraySuprafete = [], NNR) {
  var cotaInferioara = NNR;
  var suprafataInferioara = 0;
  var arrayVolum = [];
  var volum = 0;
  for (var i = 0; i < arrayCote.length; i++) {
    volum +=
      ((arraySuprafete[i] - suprafataInferioara) / 2) *
      (arrayCote[i] - cotaInferioara);
    arrayVolum[i] = volum;
    cotaInferioara = arrayCote[i];
    suprafataInferioara = arraySuprafete[i];
  }
  return arrayVolum;
}

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

//2*S/delta t + Q
const rightFormula = (S2, Q2, deltaT) => {
  return (2 * S2) / deltaT + Q2;
};

const leftFormula = (S1, Q1, deltaT) => {
  return (2 * S1 / deltaT - Q1)
}


export { calculVolumApaLac, interpolareBiliniara, rightFormula, leftFormula };
