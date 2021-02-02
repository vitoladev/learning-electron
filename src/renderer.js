const { ipcRenderer } = require('electron');
const container = document.querySelector('.currencies');
const atualizarBtn = document.querySelector('#atualizarBtn');

ipcRenderer.on('currencies', async () => {

  const { currencyData } = require('./src/currencyData');
  const currencies = await currencyData();
  console.log({currencies});

  for (currency in currencies) {
    let currencyData = {
      name: currencies[currency]['name'],
      price: Number((currencies[currency]['bid'])).toFixed(2)
   }

    const name = document.createElement('h1');
    const price = document.createElement('p');
    name.innerHTML = currencyData.name;
    price.innerHTML = `R$ ${currencyData.price}`;

    const element = document.createElement('article');
    element.classList.add('currency');
    element.appendChild(name);
    element.appendChild(price);

    container.appendChild(element);
  }
});

atualizarBtn.addEventListener('click', () => {
  ipcRenderer.send('reload-win');
})