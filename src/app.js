import Fetcher, { contentType, formatType } from 'lesca-fetcher';

Fetcher.install({ hostUrl: './api', contentType: contentType.JSON, formatType: formatType.JSON });
const APIs = ['select', 'insert', 'update', 'delete'];

(async function () {
  const respond = await Fetcher.get('/connect');
  if (respond.res) {
    console.log(respond.msg);
    init();
  } else {
    document.write('mongodb connection error');
  }
})();

function init() {
  const message = document.getElementById('message');
  if (message) message.innerText = 'mongodb connected';

  async function onClick(e) {
    const { dataset } = e.target;
    const { api } = dataset;
    let fetchData = {};
    switch (api) {
      case 'insert':
        const insert = document.getElementById('insert');
        if (insert) {
          fetchData = [...insert.getElementsByTagName('input')].reduce(
            (prev, next) => ({ ...prev, [next.name]: next.value }),
            {},
          );
        }
        break;
      case 'delete':
        const deleteTarget = document.getElementById('delete');
        if (deleteTarget) {
          fetchData = {
            _id: [...deleteTarget.getElementsByTagName('input')][0].value,
          };
        }
      case 'update':
        const update = document.getElementById('update');
        if (update) {
          fetchData = {
            filter: [...update.getElementsByTagName('input')][0].value,
            data: [...update.getElementsByTagName('input')]
              .filter((_, index) => index !== 0)
              .reduce(
                (prev, next) => (next.value ? { ...prev, [next.name]: next.value } : prev),
                {},
              ),
          };
        }
    }

    const respond = await Fetcher.post(`/${api}`, fetchData);
    const { res, data, msg } = respond;
    if (res) {
      switch (api) {
        case 'select':
          const tbody = document.getElementById('tbody');
          const html = data?.map((item, index) => {
            const op = `<tr><th>${index}</th>`;
            const td = Object.entries(item)
              .filter((each) => each[0] !== '__v')
              .map((each) => {
                return `<td>${each[1]}</td>`;
              })
              .join('');
            return `${op}${td}</tr>`;
          });
          if (tbody && html) tbody.innerHTML = html.join('');
          break;
        case 'insert':
        case 'delete':
        case 'update':
          if (res) {
            alert(msg);
            const button = document.getElementById('select' + '-btn');
            button?.click();
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
  });
}
