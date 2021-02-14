//viitura de calcul
const timpViitura = [0, 4, 6, 8, 10, 15, 20, 25, 30, 35, 40, 42].map(item => item * 3600)
const debiteViitura = [0, 12, 48, 107, 190, 170, 123, 83, 48, 24, 8, 1]
//addChart("Grafic Viitura", timpViitura, debiteViitura)

//parametrii lac
const coteLac = [105, 107.5, 110, 112.5, 115, 117.5];
const suprafeteLac = [
  280_000,
  440_000,
  760_000,
  1_000_000,
  1_900_000,
  2_350_000,
];

const NNR = 105;

const overflowParameter = { m: 0.55, b: 10 }

const concatenareValori = (x, y) => {
  let xy = [];
  for (let i = 0; i < x.length; i++) {
    xy.push([x[i], y[i]]);
  }
  return xy;
};

const volumeAtenuare = ((coteLac, suprafeteLac) => {
  let volume = [0]
  for (let i = 1; i < coteLac.length; i++) {
    let volum = (suprafeteLac[i] - suprafeteLac[i - 1]) / 2 * (coteLac[i] - coteLac[i - 1]) + volume[i - 1]
    volume.push(volum)
  }
  return volume
})(coteLac, suprafeteLac);

const timpDebit = concatenareValori(timpViitura, debiteViitura);
const cotaSuprafata = concatenareValori(coteLac, suprafeteLac)
const cotaVolumAtenuat = concatenareValori(coteLac, volumeAtenuare)


export { timpViitura, debiteViitura, coteLac, suprafeteLac, timpDebit, NNR, cotaSuprafata, cotaVolumAtenuat, overflowParameter, concatenareValori };
