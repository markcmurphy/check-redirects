import nextConnect from 'next-connect';
import { convertToCsv, csvToArray } from './redirectsToCsv.mjs';
import fetch from 'node-fetch';

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
}).post((req, res) => {
  async function main(str, projectId) {
    function filterByValue(array, string) {
      // TODO: trim last line of input
      return array.filter((o) =>
        Object.keys(o).some((k) =>
          o[k].toLowerCase().includes(string.toLowerCase())
        )
      );
    }

    let slugArr = [];
    async function checkCsv(csv, projectId) {
      for await (let k of csv) {
        let slug = k.to?.split('/').slice(-1)[0].split('-')[0];
        let matchPattern = slug.match(/\d+/g);
        if (matchPattern != null) {
          slugArr.push(slug);
        }
      }

      // console.log(slugArr);

      function manageErrors(response) {
        if (!response.ok) {
          if (response.status == 404) {
            throw Error(response.statusText);
          }
          return; // will print '200 - ok'
        }
        return response;
      }
    }

    let newArr = [];
    async function allTheSlugs(slug) {
      try {
        let response = await fetch(
          `https://stoplight.io/api/v1/projects/${projectId}/nodes/${slug}`
        );

        // Check your response for error this may not be response.error
        if (response.status == 404) {
          // Handle error
          // console.log(slug);
          // alert(error);
          newArr.push(slug);
          // console.log(slug);
        } else {
          console.log('else');
          // return;
          // null;
          // Navigate on success
          // this._router.navigate(['/mainpage']);
        }
      } catch (err) {
        manageErrors(err);
      }
    }
    const CSV = await convertToCsv(req.body);
    const csvArr = await csvToArray(CSV);
    // let csv = await convertToCsv(redirects);
    let filteredCsv = await filterByValue(csvArr, str);
    // let csvArray = await csvToArray(redirects);
    // let checkedCsv = await checkCsv(filteredCsv, projectId);
    // let checkedCsv = await
    await checkCsv(filteredCsv, projectId);
    // res.send(checkedCsv);

    // return checkedCsv;
    Promise.all(slugArr.map(allTheSlugs)).then((ids) => {
      res.send(newArr);
      console.log('🚀 ~ file: lint.js ~ line 87 ~ Promise.all ~ ids', newArr);
    });
    // checkedCsv.map((k) => {}))
    // const retResults =
  }
  main('api-reference', 'cHJqOjIwNjAz');
});

export default apiRoute;
