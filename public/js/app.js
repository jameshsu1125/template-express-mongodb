import { log } from 'console';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';

Fetcher.install({ hostUrl: './api', contentType: contentType.JSON, formatType: formatType.JSON });

const APIs = ['select', 'insert', 'delete'];

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
  const ele = document.createElement('div');
  ele.append(document.createTextNode('mongodb connected'));
  document.body.append(ele);

  async function onClick(e) {
    const { dataset } = e.target;
    const { api } = dataset;
    const respond = await Fetcher.get(`/${api}`);
    log(respond);
  }

  APIs.map((item) => {
    const button = document.createElement('button');
    button.setAttribute('data-api', item);
    button.append(item);
    button.onclick = onClick;
    return button;
  }).forEach((button) => {
    document.body.append(button);
  });
}
