import React from 'react';

const RenderField = (field) => {
    return (
        <div className="field">
            <label className="label">{field.label}</label>
            <input
                className="input"
                type={field.type}
                placeholder={field.placeholder}
                { ...field.input}
            />
        </div>
	)
}

export default RenderField;