import { useState } from 'react'
import { rupiah } from '../utils.js'

function Row({ row, onChangeQty, onRemove }) {
  const [input, setInput] = useState({
    qty: row.qty,
    draft: String(row.qty),
    error: '',
  })
  if (input.qty !== row.qty) {
    setInput({ qty: row.qty, draft: String(row.qty), error: '' })
  }

  function handleChange(event) {
    const draft = event.target.value
    const result = onChangeQty(row.id, draft)
    setInput({qty: row.qty, draft, error: result?.ok === false ? result.message : '',})
  }

  function handleBlur() {
    setInput({ qty: row.qty, draft: String(row.qty), error: '' })
  }

  const inputId = `qty-${row.id}`
  const error = input.qty === row.qty ? input.error : ''
  return (
    <li className="reg-row">
      <div className="reg-top">
        <strong>{row.nama}</strong>
        <span className="reg-sub">{rupiah(row.harga)} / kursi</span>
      </div>
      <div className="reg-bottom">
        <div className="field field-qty">
          <label htmlFor={inputId}>Jumlah kursi {row.nama}</label>
          <input id={inputId} type="number" inputMode="numeric" min="1" step="1" 
          value={input.qty === row.qty ? input.draft : row.qty} onChange={handleChange} onBlur={handleBlur} 
          aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${inputId}-err` : undefined}
          />
        </div>
        <span className="reg-subtotal">{rupiah(row.harga * row.qty)}</span>
        <button type="button" className="btn btn-ghost" onClick={() => onRemove(row.id)} aria-label={`Hapus ${row.nama}`}>Hapus</button>
      </div>
      {error && (<p id={`${inputId}-err`} className="field-error">{error}</p>)}
    </li>
  )
}

export default function RegistrationList({ rows, onChangeQty, onRemove }) {
  return (
    <section className="panel" aria-label="Daftar pendaftaran">
      <h2>Daftar pendaftaran</h2>
      {rows.length === 0 ? <p className="state">Silahkan pilih workshop. Pencet Tambah di katalog.</p> : <ul className="reg-list">
        {rows.map((row) => (<Row key={row.id} row={row} onChangeQty={onChangeQty} onRemove={onRemove} />))}</ul>}
    </section>
  )
}
