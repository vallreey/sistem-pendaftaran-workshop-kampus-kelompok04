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
    <section>
      <p className="count">{items.length} workshop ditemukan</p>
      <ul className="catalog">
        {items.map((workshop) => {
          const sisa = sisaKuota(workshop.id)
          const penuh = sisa <= 0
          let kelasKartu = 'card'
          if (penuh) {
            kelasKartu = 'card card-full'
          }

          return (
            <li key={workshop.id} className={kelasKartu}>
              <div className="card-head">
                <h3>{workshop.nama}</h3>
                <span className="tag">{workshop.kategori}</span>
              </div>
              <dl className="card-meta"><div>
                  <dt>Biaya per kursi</dt>
                  <dd>{rupiah(workshop.harga)}</dd></div>
                <div><dt>Sisa ketersediaan</dt>
                  <dd className={penuh ? 'text-danger' : ''}>
                    {penuh ? 'Penuh' : sisa + ' kursi'}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onAdd(workshop.id)}
                disabled={penuh || totalKursi >= maxKursi}>Tambah</button>
            </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
