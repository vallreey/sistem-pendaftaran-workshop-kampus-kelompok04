import { MAX_JENIS, MAX_KURSI, rupiah } from '../utils.js'

export default function Summary({ totalKursi, jenis, sisaBatas, totalBiaya }) {
  const catatan = []
  if (totalKursi === 0) {
    catatan.push('Belum ada workshop dipilih.')
  } else {
    if (sisaBatas === 0) {
      catatan.push(`Batas ${MAX_KURSI} kursi sudah tercapai.`)
    }
    if (jenis >= MAX_JENIS) {
      catatan.push(
        `Batas ${MAX_JENIS} jenis sudah tercapai. Tambah kursi hanya pada workshop yang sudah dipilih.`
      )
    }
  }

  return (
    <section className="panel summary" aria-labelledby="ringkasan-title">
      <h2 id="ringkasan-title">Ringkasan</h2>

      {/* Meter pemakaian batas kursi (dekoratif, angkanya sudah ada di teks) */}
      <div className="summary__meter" aria-hidden="true">
        {Array.from({ length: MAX_KURSI }, (_, i) => (
          <span key={i} className={i < totalKursi ? 'is-on' : ''} />
        ))}
      </div>

      <div aria-live="polite" aria-atomic="true">
        <dl>
          <div>
            <dt>Jumlah kursi</dt>
            <dd>{totalKursi}</dd>
          </div>
          <div>
            <dt>Jenis workshop</dt>
            <dd className={jenis >= MAX_JENIS ? 'is-limit' : ''}>
              {jenis} dari {MAX_JENIS}
            </dd>
          </div>
          <div>
            <dt>Sisa batas kursi</dt>
            <dd className={sisaBatas === 0 ? 'is-limit' : ''}>
              {sisaBatas} dari {MAX_KURSI}
            </dd>
          </div>
          <div className="total">
            <dt>Total biaya</dt>
            <dd>{rupiah(totalBiaya)}</dd>
          </div>
        </dl>

        {catatan.length > 0 && (
          <ul className="summary__notes">
            {catatan.map((teks) => (
              <li key={teks}>{teks}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}