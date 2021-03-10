import { concatenareValori } from '../components/utility-functions/UtilityFunctions'
import { data } from './lacuri/Ibaneasa.data'

const timpViituraOre = data.timpViitura
const timpViituraSecunde = timpViituraOre.map(item => item * 3600)
const debiteViitura = data.debiteViitura
const coteLac = data.coteLac
const suprafeteLac = data.suprafeteLac
const NNR = data.NNR
const parametriDeversor = data.parametriDeversor;
const suprafete = data.suprafeteLac

const volumeAtenuare = ((coteLac, suprafeteLac) => {
  let volume = [0]
  for (let i = 1; i < coteLac.length; i++) {
    let volum = (suprafeteLac[i] - suprafeteLac[i - 1]) / 2 * (coteLac[i] - coteLac[i - 1]) + volume[i - 1]
    volume.push(volum)
  }
  return volume
})(coteLac, suprafeteLac);

const timpDebitOre = concatenareValori(timpViituraOre, debiteViitura);
const cotaVolumAtenuat = concatenareValori(coteLac, volumeAtenuare)


export {
  timpViituraSecunde,
  timpViituraOre,
  debiteViitura,
  coteLac,
  timpDebitOre,
  NNR,
  cotaVolumAtenuat,
  suprafete,
  parametriDeversor,
  concatenareValori,
  data as initialData
};
