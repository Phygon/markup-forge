import React from "react";

export default function NewFileForm({
  name,
  language,
  languageOptions,
  onSubmit,
  onNameChange,
  onLanguageChange,
  onCancel,
}) {
  return (
    <form className="new-file-form" onSubmit={onSubmit}>
      <label>
        Filename
        <input
          autoFocus
          value={name}
          placeholder="untitled"
          onChange={(event) => onNameChange(event.target.value)}
        />
      </label>
      <label>
        Language
        <select
          value={language}
          onChange={(event) => onLanguageChange(event.target.value)}
        >
          {languageOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <div className="form-actions">
        <button className="primary" type="submit">
          Add file
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
