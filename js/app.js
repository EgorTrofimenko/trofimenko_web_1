// Рендер каталога товаров
(function () {
  const catalogGrid = document.getElementById('catalog-grid');

  function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const image = document.createElement('img');
    image.className = 'product-card__image';
    image.src = product.image;
    image.alt = product.name;

    const info = document.createElement('div');
    info.className = 'product-card__info';

    const name = document.createElement('h3');
    name.className = 'product-card__name';
    name.textContent = product.name;

    const meta = document.createElement('p');
    meta.className = 'product-card__meta';
    meta.textContent = `${product.diameter} · ${product.color}`;

    const description = document.createElement('p');
    description.className = 'product-card__description';
    description.textContent = product.description;

    const price = document.createElement('p');
    price.className = 'product-card__price';
    price.textContent = `${product.price.toLocaleString('ru-RU')} ₽`;

    const button = document.createElement('button');
    button.className = 'button product-card__button';
    button.type = 'button';
    button.textContent = 'В корзину';
    button.dataset.productId = product.id;

    info.append(name, meta, description, price, button);
    card.append(image, info);

    return card;
  }

  function renderCatalog() {
    products.forEach(product => {
      const card = createProductCard(product);
      catalogGrid.append(card);
    });
  }

  renderCatalog();
})();