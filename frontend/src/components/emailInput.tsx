import React from "react"

export const EmailInput = () => {
    return (
        <div className="form-group">
            <input type="email" id={`f-email`} name="email" placeholder="email" className="text-input" />
        </div>
    )
}