const cart = (function () {
  const STORAGE_KEY = 'rimstore-cart';
  let items = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function findProduct(id) {
    return products.find(product => product.id === id);
  }

  function add(id) {
    const item = items.find(i => i.id === id);
    if (item) {
      item.qty += 1;
    } else {
      items.push({ id: id, qty: 1 });
    }
    save();
  }

  function remove(id) {
    items = items.filter(i => i.id !== id);
    save();
  }

  function setQty(id, qty) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, qty); 
    save();
  }

  function getItems() {
    return items;
  }

  function getCount() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  function getTotal() {
    return items.reduce((sum, i) => {
      const product = findProduct(i.id);
      return sum + (product ? product.price * i.qty : 0);
    }, 0);
  }

  return { add, remove, setQty, getItems, getCount, getTotal, findProduct };
})();