import { forwardRef, useImperativeHandle } from "react";
import InputField from "./InputField";
import { FieldType, SegmentData } from "./components";
import Comparison from "./Comparison";

interface SegmentProps {
    data: SegmentData;
    addNestedSegment: (id: string) => void;
    deleteSegment: (id: string) => void;
    updateSegment: (segmentId: string, segment: SegmentData) => void;

    updateField: (id: string, value: any) => void;
    addNewField: (segmentId: string, fieldType: FieldType) => void;
    deleteField: (segmentId: string, fieldId: string) => void;

    level: number;
}
const Segment = ({
    addNestedSegment,
    deleteSegment,
    updateSegment,
    updateField,
    addNewField,
    deleteField,
    data,
    level = 0,
}: SegmentProps) => {
    return (
        <div
            style={{
                marginLeft: `${20 * level}px`,
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                marginTop: "10px",
                borderRadius: "6px",
                display: "inline-block",
            }}
        >
            {data.fields.map((field, index) => {
                return (
                    <div key={field.id}>
                        <InputField
                            data={field}
                            removeField={() => {
                                deleteField(data.id, field.id);
                            }}
                            updateField={(id, value) => {
                                updateSegment(data.id, {
                                    ...data,
                                    fields: data.fields.map((field) => {
                                        if (field.id === id) {
                                            return {
                                                ...field,
                                                ...value,
                                            };
                                        }

                                        return field;
                                    }),
                                });
                            }}
                            key={field.id}
                        />

                        {/* show the comparison */}
                        {index !== data.fields.length - 1 && <p className="comparison">{data.segmentComparison}</p>}
                    </div>
                );
            })}

            {data.nestedSegments.map((segmentData) => {
                return (
                    <div key={segmentData.id} className="segment">
                        <p className="comparison">{data.segmentComparison}</p>

                        <Segment
                            data={segmentData}
                            level={level + 1}
                            addNestedSegment={addNestedSegment}
                            deleteSegment={deleteSegment}
                            updateSegment={updateSegment}
                            updateField={updateField}
                            addNewField={addNewField}
                            deleteField={deleteField}
                        />
                    </div>
                );
            })}

            <button onClick={() => addNewField(data.id, "text")}>Add New Field</button>

            <button onClick={() => addNestedSegment(data.id)}>Add Nested Segment</button>

            <Comparison
                type={data.segmentComparison}
                onChange={(value) => {
                    console.log(data.id, value);
                    updateSegment(data.id, {
                        ...data,
                        segmentComparison: value,
                    });
                }}
            />

            <button onClick={() => deleteSegment(data.id)} className="delete">
                Delete
            </button>
        </div>
    );
};

export default Segment;
