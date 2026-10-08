(function () {
  const catalogGrid = document.getElementById('catalog-grid');
  const cartList = document.getElementById('cart-list');
  const cartLayout = document.getElementById('cart-layout');
  const cartEmpty = document.getElementById('cart-empty');
  const cartCountBadge = document.getElementById('cart-count-badge');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  function formatPrice(value) {
    return value.toLocaleString('ru-RU') + ' ₽';
  }

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
    meta.textContent = product.diameter + ' · ' + product.color;

    const description = document.createElement('p');
    description.className = 'product-card__description';
    description.textContent = product.description;

    const price = document.createElement('p');
    price.className = 'product-card__price';
    price.textContent = formatPrice(product.price);

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
      catalogGrid.append(createProductCard(product));
    });
  }

  function createCartItem(item) {
    const product = cart.findProduct(item.id);
    if (!product) return null;

    const li = document.createElement('li');
    li.className = 'cart-item';

    const image = document.createElement('img');
    image.className = 'cart-item__image';
    image.src = product.image;
    image.alt = product.name;

    const info = document.createElement('div');
    info.className = 'cart-item__info';

    const name = document.createElement('p');
    name.className = 'cart-item__name';
    name.textContent = product.name;

    const meta = document.createElement('p');
    meta.className = 'cart-item__meta';
    meta.textContent = product.diameter + ' · ' + product.color;

    const price = document.createElement('p');
    price.className = 'cart-item__price';
    price.textContent = formatPrice(product.price) + ' / шт.';

    info.append(name, meta, price);

    const controls = document.createElement('div');
    controls.className = 'cart-item__controls';

    const dec = document.createElement('button');
    dec.className = 'qty-btn';
    dec.type = 'button';
    dec.textContent = '−';
    dec.dataset.action = 'dec';
    dec.dataset.id = product.id;
    dec.setAttribute('aria-label', 'Уменьшить количество');

    const qty = document.createElement('span');
    qty.className = 'cart-item__qty';
    qty.textContent = item.qty;

    const inc = document.createElement('button');
    inc.className = 'qty-btn';
    inc.type = 'button';
    inc.textContent = '+';
    inc.dataset.action = 'inc';
    inc.dataset.id = product.id;
    inc.setAttribute('aria-label', 'Увеличить количество');

    controls.append(dec, qty, inc);

    const sum = document.createElement('p');
    sum.className = 'cart-item__sum';
    sum.textContent = formatPrice(product.price * item.qty);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'cart-item__remove';
    removeBtn.type = 'button';
    removeBtn.textContent = '×';
    removeBtn.dataset.action = 'remove';
    removeBtn.dataset.id = product.id;
    removeBtn.setAttribute('aria-label', 'Удалить из корзины');

    li.append(image, info, controls, sum, removeBtn);
    return li;
  }

  function renderCart() {
    const items = cart.getItems();

    cartList.replaceChildren(); 
    items.forEach(item => {
      const node = createCartItem(item);
      if (node) cartList.append(node);
    });

    cartEmpty.hidden = items.length > 0;
    cartLayout.hidden = items.length === 0;

    cartCountBadge.textContent = cart.getCount();
    cartCount.textContent = cart.getCount();
    cartTotal.textContent = formatPrice(cart.getTotal());
  }

  catalogGrid.addEventListener('click', function (event) {
    const button = event.target.closest('.product-card__button');
    if (!button) return;

    cart.add(Number(button.dataset.productId));
    renderCart();

    const original = button.textContent;
    button.textContent = '✓ Добавлено';
    setTimeout(function () {
      button.textContent = original;
    }, 900);
  });

  cartList.addEventListener('click', function (event) {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;
    const item = cart.getItems().find(i => i.id === id);

    if (action === 'inc') {
      cart.setQty(id, (item ? item.qty : 0) + 1);
    } else if (action === 'dec') {
      if (item && item.qty > 1) cart.setQty(id, item.qty - 1);
    } else if (action === 'remove') {
      cart.remove(id);
    }

    renderCart();
  });

  renderCatalog();
  renderCart();
})();