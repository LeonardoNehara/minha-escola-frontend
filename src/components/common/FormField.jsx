export default function FormField({ label, name, type, value, onChange, required }) {
  return (
    <div className="form-floating mb-3">
      <input
        className="form-control"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
