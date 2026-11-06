import { rupiah } from '../utils.js'

export default function Catalog({ items, sisaKuota, onAdd }) {
  return (
    <section aria-label="Katalog workshop">
      <p className="count" role="status">{items.length} workshop ditemukan</p>

      {items.length === 0 ? (
        <p className="state">Tidak ada workshop yang cocok dengan pencarian atau filter.</p>
      ) : (
        <ul className="catalog">
          {items.map((w) => {
            const sisa = sisaKuota(w.id)
            const habis = sisa <= 0
            return (
              <li key={w.id} className={`card ${habis ? 'card-full' : ''}`}>
                <div className="card-head">
                  <h3>{w.nama}</h3>
                  <span className="tag">{w.kategori}</span>
                </div>
                <dl className="card-meta">
                  <div>
                    <dt>Biaya per kursi</dt>
                    <dd>{rupiah(w.harga)}</dd>
                  </div>
                  <div>
                    <dt>Sisa ketersediaan</dt>
                    <dd className={habis ? 'text-danger' : ''}>
                      {habis ? 'Penuh' : `${sisa} kursi`}
                    </dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onAdd(w.id)}
                  disabled={w.kuota === 0}
                >Tambah</button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
