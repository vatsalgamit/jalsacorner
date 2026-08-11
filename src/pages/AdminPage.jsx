import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../MenuContext';
import AdminLogin from '../components/AdminLogin';
import styles from './AdminPage.module.css';

const EMPTY_FORM = { name: '', hindi: '', desc: '', price: '', category: 'snacks', badge: 'Veg', image: '' };

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const MAX = 480;
        const scale = Math.min(MAX / img.width, MAX / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.65));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('adminAuth') === '1');
  const { items, addItem, removeItem, updateItem, resetToDefault } = useMenu();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  if (!authed) return <AdminLogin onAuth={() => setAuthed(true)} />;

  const snacks = items.filter(i => i.category === 'snacks');
  const drinks = items.filter(i => i.category === 'drinks');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: value,
      ...(name === 'category' ? { badge: value === 'drinks' ? 'Cold' : 'Veg' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    if (editId !== null) {
      updateItem(editId, form);
      showToast('Item updated!');
      setEditId(null);
    } else {
      addItem(form);
      showToast('Item added!');
    }
    setForm(EMPTY_FORM);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setForm(f => ({ ...f, image: compressed }));
    } catch {
      showToast('Image failed to load. Try a smaller photo.');
    }
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, hindi: item.hindi, desc: item.desc, price: item.price, category: item.category, badge: item.badge, image: item.image || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { setEditId(null); setForm(EMPTY_FORM); };

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      removeItem(id);
      setDeleteConfirm(null);
      showToast('Item removed!');
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const ItemRow = ({ item }) => (
    <div className={styles.itemRow}>
      <div className={`${styles.itemAccent} ${item.category === 'drinks' ? styles.drinkAccent : ''}`} />
      {item.image && <img src={item.image} className={styles.itemThumb} alt={item.name} />}
      <div className={styles.itemInfo}>
        <span className={styles.itemName}>{item.name}</span>
        <span className={styles.itemHindi}>{item.hindi}</span>
        <span className={styles.itemDesc}>{item.desc}</span>
      </div>
      <div className={styles.itemMeta}>
        <span className={styles.itemPrice}>₹{item.price}</span>
        <span className={`${styles.itemBadge} ${item.category === 'drinks' ? styles.drinkBadge : styles.vegBadge}`}>
          {item.badge}
        </span>
      </div>
      <div className={styles.itemActions}>
        <button className={styles.editBtn} onClick={() => startEdit(item)}>Edit</button>
        <button
          className={`${styles.deleteBtn} ${deleteConfirm === item.id ? styles.confirmDelete : ''}`}
          onClick={() => handleDelete(item.id)}
        >
          {deleteConfirm === item.id ? 'Confirm?' : 'Delete'}
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.page}>

      {toast && <div className={styles.toast}>{toast}</div>}

      {/* TOP BAR */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.topbarLogo}>JALSA</span>
          <span className={styles.topbarSep}>/</span>
          <span className={styles.topbarTitle}>Admin Panel</span>
        </div>
        <div className={styles.topbarRight}>
          <Link to="/jalsacorner" className={styles.viewMenuBtn}>View Menu →</Link>
          <button
            className={styles.logoutBtn}
            onClick={() => { sessionStorage.removeItem('adminAuth'); setAuthed(false); }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className={styles.layout}>

        {/* FORM PANEL */}
        <aside className={styles.sidebar}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>
              {editId !== null ? 'Edit Item' : 'Add New Item'}
            </h2>
            {editId !== null && (
              <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel editing</button>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Item Name *</label>
                <input
                  className={styles.input}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Pani Puri"
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Hindi / Gujarati name</label>
                <input
                  className={styles.input}
                  name="hindi"
                  value={form.hindi}
                  onChange={handleChange}
                  placeholder="e.g. પાણી પુરી · पानी पुरी"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Description</label>
                <textarea
                  className={styles.textarea}
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Short description of the item"
                  rows={2}
                />
              </div>

              <div className={styles.row2}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Price (₹) *</label>
                  <input
                    className={styles.input}
                    name="price"
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="40"
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Category</label>
                  <select className={styles.select} name="category" value={form.category} onChange={handleChange}>
                    <option value="snacks">Snacks</option>
                    <option value="drinks">Cold Drinks</option>
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Badge Label</label>
                <input
                  className={styles.input}
                  name="badge"
                  value={form.badge}
                  onChange={handleChange}
                  placeholder="Veg / Cold / Spicy / New"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Photo (optional)</label>
                <label className={styles.imageUpload}>
                  {form.image
                    ? <img src={form.image} className={styles.imagePreview} alt="preview" />
                    : <span className={styles.imageUploadPlaceholder}>+ Choose photo</span>
                  }
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.imageInput}
                    onChange={handleImageChange}
                  />
                </label>
                {form.image && (
                  <button type="button" className={styles.removeImageBtn} onClick={() => setForm(f => ({ ...f, image: '' }))}>
                    Remove photo
                  </button>
                )}
              </div>

              <button type="submit" className={styles.submitBtn}>
                {editId !== null ? 'Update Item' : '+ Add Item'}
              </button>
            </form>
          </div>

          <button className={styles.resetBtn} onClick={() => { if (window.confirm('Reset to default menu?')) resetToDefault(); }}>
            Reset to default menu
          </button>
        </aside>

        {/* ITEM LIST */}
        <main className={styles.main}>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{items.length}</span>
              <span className={styles.statLabel}>Total items</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{snacks.length}</span>
              <span className={styles.statLabel}>Snacks</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{drinks.length}</span>
              <span className={styles.statLabel}>Drinks</span>
            </div>
          </div>

          {snacks.length > 0 && (
            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionLabel}>Snacks</span>
                <span className={styles.sectionCount}>{snacks.length} items</span>
              </div>
              <div className={styles.itemList}>
                {snacks.map(item => <ItemRow key={item.id} item={item} />)}
              </div>
            </section>
          )}

          {drinks.length > 0 && (
            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <span className={`${styles.sectionLabel} ${styles.drinkLabel}`}>Cold Drinks</span>
                <span className={styles.sectionCount}>{drinks.length} items</span>
              </div>
              <div className={styles.itemList}>
                {drinks.map(item => <ItemRow key={item.id} item={item} />)}
              </div>
            </section>
          )}

          {items.length === 0 && (
            <div className={styles.emptyState}>
              <p>No menu items yet.</p>
              <p>Add your first item using the form.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
