import { rupiah } from '../utils.js'
function Catalog(props) {
  const { items, sisaKuota, onAdd, totalKursi, maxKursi } = props

  if (items.length === 0) {
    return (
      <section>
        <p className="count">0 workshop ditemukan</p>
        <p className="state">
          Workshop tidak ditemukan. Coba ganti keyword atau kategorinya ya.
        </p>
      </section>
    )
  }

  return (
    <section className="catalog-section" aria-label="Katalog workshop">
      <div className="catalog-status">
        <p className="count" role="status"><span />{items.length} workshop ditemukan</p>
        <span className="catalog-note">Biaya &amp; kuota terverifikasi</span>
      </div>

      {items.length === 0 ? (
        <p className="state">Tidak ada workshop yang cocok dengan pencarian atau filter.</p>
      ) : (
        <ul className="catalog">
          {items.map((w) => {
            const sisa = sisaKuota(w.id)
            const habis = sisa <= 0
            const progress = w.kuota > 0 ? (sisa / w.kuota) * 100 : 100
            return (
              <li key={w.id} className={`card ${habis ? 'card-full' : ''}`}>
                <div className="card-head">
                  <div className="card-title">
                    <span className={`category-icon category-${w.kategori.toLowerCase()}`} aria-hidden="true">
                      {w.kategori.slice(0, 2).toUpperCase()}
                    </span>
                    <h3>{w.nama}</h3>
                  </div>
                  <span className={`tag tag-${w.kategori.toLowerCase()}`}>{w.kategori}</span>
                </div>
                <dl className="card-meta">
                  <div>
                    <dt>Biaya per kursi</dt>
                    <dd>{rupiah(w.harga)}</dd>
                  </div>
                  <div>
                    <dt>Kategori Workshop</dt>
                    <dd>{w.kategori}</dd>
                  </div>
                </dl>
                <div className="stock">
                  <div className="stock-label">
                    <span>Sisa ketersediaan:</span>
                    <strong className={habis ? 'text-danger' : ''}>
                      {habis ? 'Kuota Penuh' : `${sisa} kursi`}
                    </strong>
                  </div>
                  <div
                    className={`stock-track ${habis ? 'is-empty' : ''}`}
                    role="progressbar"
                    aria-label={`Sisa kuota ${w.nama}`}
                    aria-valuemin="0"
                    aria-valuemax={w.kuota}
                    aria-valuenow={sisa}
                  >
                    <span style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onAdd(w.id)}
                  disabled={w.kuota === 0}
                >
                  <span aria-hidden="true">＋</span>
                  {habis ? 'Kuota Penuh' : 'Tambah ke Daftar'}
                </button>
              </li>
            )
          })}
        </ul>
      )
    </section>
  )
}
