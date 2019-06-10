/* eslint-disable no-unused-vars */
import axios from 'axios';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {
    id, name, calories, fat, carbs, protein,
  };
}
const getAgencyData = () => axios
  .get(
    'https://gist.githubusercontent.com/witalewski/fc8f043d53a0d505f84c5ddb04ae76ea/raw/7c505bbc1675a0bc8a067f8b633b531c769bb64c/data.json',
  ).then(({ data }) => [
    createData('111Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('222Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('333Eclair', 262, 16.0, 24, 6.0),
    createData('444Cupcake', 305, 3.7, 67, 4.3),
    createData('111Gingerbread', 356, 16.0, 49, 3.9),
  ]);

const getAllAgencies = () => axios
  .get(
    'https://gist.githubusercontent.com/witalewski/fc8f043d53a0d505f84c5ddb04ae76ea/raw/7c505bbc1675a0bc8a067f8b633b531c769bb64c/data.json',
  ).then(({ data }) => [{ key: 111, label: 'value11' }, { key: 222, label: 'value222' }, { key: 333, label: 'value333' }, { key: 444, label: 'value444' },

  ]);


// eslint-disable-next-line no-unused-vars
const getRegion = agencyId => axios
  .get(
    'https://gist.githubusercontent.com/witalewski/fc8f043d53a0d505f84c5ddb04ae76ea/raw/7c505bbc1675a0bc8a067f8b633b531c769bb64c/data.json',
  ).then(({ data }) => [{ key: 111, label: 'value11' }, { key: 222, label: 'value222' }, { key: 333, label: 'value333' }, { key: 444, label: 'value444' },

  ]);


export { getAgencyData, getAllAgencies, getRegion };
