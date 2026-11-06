export default function Controls({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
  disabled,
}) {
  return (
    <section className="controls panel" aria-label="Pencarian dan filter">
      <div className="control-row">
        <label className="search-field" htmlFor="cari">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.3" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            id="cari"
            type="search"
            placeholder="Cari nama topik workshop... (contoh: react, api)"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            disabled={disabled}
          />
        </label>
        <label className="select-field" htmlFor="kategori">
          <span className="visually-hidden">Pilih kategori</span>
          <select
            id="kategori"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            disabled={disabled}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'Semua' ? 'Semua Kategori' : c}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="category-filters">
        <span className="filter-label">Kategori:</span>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-chip ${category === c ? 'is-selected' : ''}`}
            onClick={() => onCategoryChange(c)}
            disabled={disabled}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  )
}
