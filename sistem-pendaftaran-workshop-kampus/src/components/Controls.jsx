export default function Controls({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  disabled,
}) {
  return (
    <section className="controls" aria-label="Pencarian dan filter">
      <div className="field">
        <label htmlFor="cari">Cari nama workshop</label>
        <input
          id="cari"
          type="search"
          placeholder="Contoh: react"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="field">
        <label htmlFor="kategori">Kategori</label>
        <select
          id="kategori"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          disabled={disabled}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
