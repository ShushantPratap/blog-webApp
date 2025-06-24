import React from "react";

function SelectOpt({
    options,
    label,
    className='',
    ...props
}, ref) {
    const id = React.useId();
    return (
        <div className="select-field">
            {label && <label htmlFor={id}>{label}</label>}
            <select
            className={className}
            {...props}
            id={id}
            ref={ref}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(SelectOpt);