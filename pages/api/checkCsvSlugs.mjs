import fetch from 'node-fetch';

import { redirects, convertToCsv, csvToArray } from './redirectsToCsv.mjs';

const CSV = convertToCsv(redirects);
const csvArr = csvToArray(CSV);

function filterByValue(array, string) {
  return array.filter((o) =>
    Object.keys(o).some((k) =>
      o[k].toLowerCase().includes(string.toLowerCase())
    )
  );
}

const checkCsv = (csv, projectId) => {
  for (let k of csv) {
    let slug = k.to?.split('/').slice(-1)[0].split('-')[0];
    function manageErrors(response) {
      if (!response.ok) {
        if (response.status == 404) {
          throw Error(response.statusText);
        }
        return; // will print '200 - ok'
      }
      return response;
    }

    function getStatus(slug) {
      fetch(`https://stoplight.io/api/v1/projects/${projectId}/nodes/${slug}`)
        .then(manageErrors)
        .then((response) => response.json())
        //   .then((result) => console.log(result.id))
        .then((result) => null)
        //   .catch((error) => console.log(`${slug} - ${error}`));
        .catch((error) => console.log(`${slug}`));
    }

    let matchPattern = slug.match(/\d+/g);

    matchPattern != null ? getStatus(slug) : null;
  }
};

async function main(str, projectId) {
  // let csv = await convertToCsv(redirects);
  let filteredCsv = await filterByValue(csvArr, str);
  // let csvArray = await csvToArray(redirects);
  let checkedCsv = await checkCsv(filteredCsv, projectId);
  return checkedCsv;
}

// main('api-reference', 'cHJqOjIwNjAz');
