import React, { useState } from "react";
import { FieldData } from "./components";

type Field = "text" | "dropdown";

interface InputFieldProps {
    data: FieldData;
    removeField: () => void;

    updateField: (id: string, value: any) => void;
}
const InputField = ({ data, removeField, updateField }: InputFieldProps) => {
    return (
        <div>
            <select
                onChange={(e) =>
                    updateField(data.id, {
                        ...data,
                        type: e.target.value,
                    })
                }
                value={data.type}
            >
                <option value="text">Text</option>
                <option value="dropdown">Dropdown</option>
            </select>

            {data.type === "text" ? (
                <input
                    type="text"
                    placeholder="Enter text"
                    onChange={(e) =>
                        updateField(data.id, {
                            ...data,
                            value: e.target.value,
                        })
                    }
                    value={data.value}
                />
            ) : (
                <select
                    onChange={(e) =>
                        updateField(data.id, {
                            ...data,
                            value: e.target.value,
                        })
                    }
                    value={data.value}
                >
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                    <option value="4">Option 4</option>
                    <option value="5">Option 5</option>
                </select>
            )}

            <button onClick={removeField} className="delete">
                Delete Field
            </button>
        </div>
    );
};

export default InputField;
