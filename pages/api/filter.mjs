import { csvToArray, convertToCsv } from './redirectsToCsv.mjs';

const CSV = convertToCsv(redirects);
const csvArr = csvToArray(CSV);

function filterByValue(array, string) {
  return array.filter((o) =>
    Object.keys(o).some((k) =>
      o[k].toLowerCase().includes(string.toLowerCase())
    )
  );
}

// filterByValue(csvArr, 'api-reference');

//   let filtered = () => {
//     let copied = copy(toc);
//     filter(toc, str);
//     return copied;
//   };

//   filter(return filtered();
// }
//   filterReq(toc, 'Schemas').items[1];

// filter(csvArr, 'api-reference');

// console.log(
//   "🚀 ~ file: filter.mjs ~ line 28 ~ filterReq(redirArr, 'api-reference')",
//   filterReq(csvArr, 'api-reference')
// );
