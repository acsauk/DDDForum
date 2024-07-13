import React from 'react'

export const TextInput = ({fieldName, placeHolder}: { fieldName, placeHolder: string }) => {
    return (
    <div className="form-group">
        <input type="text" id={`f-${fieldName}`} name={fieldName} placeholder={placeHolder} className="text-input" />
    </div>)
}