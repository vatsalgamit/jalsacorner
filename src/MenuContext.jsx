import { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_ITEMS = [
  { id: 1, name: 'Khaman', hindi: 'ખમણ · खमण', desc: 'Soft steamed chickpea cake · mustard tempering · green chilli', price: 35, category: 'snacks', badge: 'Veg', image: 'khaman.jpg' },
  { id: 2, name: 'Dhokla', hindi: 'ઢોકળા · ढोकला', desc: 'Fermented gram flour · tangy · sesame · fresh coriander', price: 30, category: 'snacks', badge: 'Veg', image: 'dhokla.jpeg' },
  { id: 3, name: 'Sev Khamni', hindi: 'સેવ ખમણી · सेव ख़मणी', desc: 'Crumbled khaman · fine sev · pomegranate · lemon', price: 40, category: 'snacks', badge: 'Veg', image: 'sevkhamni.jpeg' },
  { id: 4, name: 'Jamnagri Ghughra', hindi: 'ઘૂઘરા · घूघरा', desc: 'Crispy pastry · sweet spiced filling · classic Gujarati festive snack', price: 55, category: 'snacks', badge: 'Veg', image: 'ghughra.jpeg' },
  { id: 5, name: 'Fanta', hindi: 'ફૅન્ટા · फैंटा', desc: 'Vibrant orange · sweet · bubbly', price: 15, category: 'drinks', badge: 'Cold', image: 'fanta.jpeg' },
  { id: 6, name: 'Buttermilk', hindi: 'છાશ · छाछ', desc: 'Chilled spiced chaas · cumin · ginger · fresh coriander', price: 25, category: 'drinks', badge: 'Cold', image: 'butttermilk.jpeg' },
  { id: 7, name: 'Sprite', hindi: 'સ્પ્રાઇટ · स्प्राइट', desc: 'Lemon lime fizz · crisp · refreshing on a hot day', price: 15, category: 'drinks', badge: 'Cold', image: 'sprite.jpeg' },
  { id: 8, name: 'Coke', hindi: 'કોક · कोक', desc: 'Ice cold · the classic · pairs with everything spicy', price: 15, category: 'drinks', badge: 'Cold', image: 'coke.jpeg' },
];

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('jalsa_menu');
      return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
    } catch {
      return DEFAULT_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jalsa_menu', JSON.stringify(items));
    } catch {
      // Storage quota exceeded — strip images and retry
      const stripped = items.map(i => ({ ...i, image: '' }));
      try { localStorage.setItem('jalsa_menu', JSON.stringify(stripped)); } catch {}
      console.warn('Storage full: images could not be saved.');
    }
  }, [items]);

  const addItem = (item) => {
    const newItem = { ...item, id: Date.now(), price: Number(item.price) };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id, data) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...data, price: Number(data.price) } : i));
  };

  const resetToDefault = () => setItems(DEFAULT_ITEMS);

  return (
    <MenuContext.Provider value={{ items, addItem, removeItem, updateItem, resetToDefault }}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext);
