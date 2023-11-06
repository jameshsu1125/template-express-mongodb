import { log } from 'console';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';

Fetcher.install({ hostUrl: './api', contentType: contentType.JSON, formatType: formatType.JSON });
const APIs = ['select', 'insert', 'update', 'delete'];

(async function () {
  const respond = await Fetcher.get('/connect');
  if (respond.res) {
    log(respond.msg);
    init();
  } else {
    document.write('mongodb connection error');
  }
})();

function init() {
  const message = document.getElementById('message');
  message.innerText = 'mongodb connected';

  async function onClick(e) {
    const { dataset } = e.target;
    const { api } = dataset;
    let fetchData = {};
    switch (api) {
      case 'insert':
        fetchData = [...document.getElementById('insert').getElementsByTagName('input')].reduce(
          (prev, next) => ({ ...prev, [next.name]: next.value }),
          {},
        );
        break;
      case 'delete':
        fetchData = {
          _id: [...document.getElementById('delete').getElementsByTagName('input')][0].value,
        };
      case 'update':
        fetchData = {
          filter: [...document.getElementById('update').getElementsByTagName('input')][0].value,
          data: [...document.getElementById('update').getElementsByTagName('input')]
            .filter((_, index) => index !== 0)
            .reduce((prev, next) => (next.value ? { ...prev, [next.name]: next.value } : prev), {}),
        };
    }

    const respond = await Fetcher.post(`/${api}`, fetchData);
    const { res, data, msg } = respond;
    if (res) {
      switch (api) {
        case 'select':
          const tbody = document.getElementById('tbody');
          const html = data.map((item, index) => {
            const op = `<tr><th>${index}</th>`;
            const td = Object.entries(item)
              .filter((each) => each[0] !== '__v')
              .map((each) => {
                return `<td>${each[1]}</td>`;
              })
              .join('');
            return `${op}${td}</tr>`;
          });
          tbody.innerHTML = html.join('');
          break;
        case 'insert':
        case 'delete':
        case 'update':
          if (res) {
            alert(msg);
            document.getElementById('select' + '-btn').click();
          }
          break;
      }
    } else {
      log(respond);
    }
  }

  APIs.forEach((item) => {
    const button = document.getElementById(item + '-btn');
    if (button) button.onclick = onClick;
    // button?.onclick = onClick;
  });
}
