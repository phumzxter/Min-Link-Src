import React from "react";

function InputField({ id, label, error, value, ...others }) {
  return (
    <div>
      <div className="link-field" style={{ marginBottom: ".5rem" }}>
        <label htmlFor={id} className="sr-only">
          label
        </label>
        <input {...{ id, value, ...others }} />
      </div>
      {error && !value && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default InputField;
