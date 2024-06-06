"use client";
// json schema
// A OR B OR C
// A OR B AND C

// SELECTOR
// text, dropdown
// RULE {
// SELECTOR
// text, dropdown
// }
// along with delete, save and update feature
// local storage
// 9871042717

import React, { useState } from "react";
import { FieldData, FieldType, SegmentData } from "./components/components";
import Segment from "./components/Segment";

const Segments = [
    {
        id: "segment_1",
        fields: [
            {
                id: "field_1",
                type: "text",
                value: "",
            },
        ],
        segmentComparison: "AND",
        nestedSegments: [
            {
                id: "nested_segment_1",
                fields: [
                    {
                        id: "field_2",
                        type: "dropdown",
                        value: "",
                    },
                ],
                segmentComparison: "OR",
                nestedSegments: [
                    {
                        id: "nested_nested_segment_1",
                        fields: [
                            {
                                id: "field_3",
                                type: "text",
                                value: "",
                            },
                        ],
                        segmentComparison: "AND",
                        nestedSegments: [],
                    },
                ],
            },
        ],
    },
    {
        id: "segment_2",
        fields: [
            {
                id: "field_4",
                type: "dropdown",
                value: "",
            },
        ],
        segmentComparison: "OR",
        nestedSegments: [],
    },
];

const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 9); // Generate random alphanumeric ID
};

export default function Home() {
    const [segments, setSegments] = useState<Array<SegmentData>>([
        {
            id: "segment_1",
            fields: [
                {
                    id: "field_4",
                    type: "dropdown",
                    value: "",
                },
            ],
            segmentComparison: "OR",
            nestedSegments: [],
        },
    ]); // have a default segment

    const addNestedSegment = (segmentId: string) => {
        const newSegments = [...segments];

        let found = false;
        const updateSegment = (segment: SegmentData) => {
            if (segment.id === segmentId) {
                segment.nestedSegments.push({
                    id: generateUniqueId(),
                    fields: [
                        {
                            id: generateUniqueId(),
                            type: "text",
                            value: "",
                        },
                    ],
                    segmentComparison: "AND",
                    nestedSegments: [],
                });
                found = true;
                return segment;
            }

            for (let i = 0; i < segment.nestedSegments.length; i++) {
                segment.nestedSegments[i] = updateSegment(segment.nestedSegments[i]);
            }

            return segment;
        };

        for (let i = 0; i < newSegments.length; i++) {
            newSegments[i] = updateSegment(newSegments[i]);
        }

        if (!found) {
            newSegments.push({
                id: generateUniqueId(),
                fields: [
                    {
                        id: generateUniqueId(),
                        type: "text",
                        value: "",
                    },
                ],
                segmentComparison: "AND",
                nestedSegments: [],
            });
        }

        setSegments(newSegments);
    };

    const deleteSegment = (segmentId: string) => {
        const removeSegmentRecursive = (segments: any) => {
            return segments
                .map((segment: any) => {
                    if (segment.id === segmentId) {
                        return null; // Mark for deletion
                    }

                    if (segment.nestedSegments.length > 0) {
                        segment.nestedSegments = removeSegmentRecursive(segment.nestedSegments);
                    }

                    return segment;
                })
                .filter((segment: any) => segment !== null); // Remove marked segments
        };

        const newSegments = removeSegmentRecursive(segments);
        setSegments(newSegments);
    };

    const updateField = (fieldId: string, newValue: FieldData) => {
        const updateFieldRecursive = (segments: SegmentData[]): any => {
            return segments.map((segment) => {
                const updatedFields = segment.fields.map((field) => {
                    if (field.id === fieldId) {
                        return { ...field, value: newValue };
                    }
                    return field;
                });

                const updatedNestedSegments =
                    segment.nestedSegments.length > 0
                        ? updateFieldRecursive(segment.nestedSegments)
                        : segment.nestedSegments;

                return {
                    ...segment,
                    fields: updatedFields,
                    nestedSegments: updatedNestedSegments,
                };
            });
        };

        const newSegments = updateFieldRecursive(segments);
        setSegments(newSegments);
    };

    const addNewField = (segmentId: string, fieldType: FieldType) => {
        const addFieldRecursive = (segments: SegmentData[]) => {
            return segments.map((segment) => {
                if (segment.id === segmentId) {
                    const newField = {
                        id: generateUniqueId(),
                        type: fieldType,
                        value: "",
                    };
                    segment.fields.push(newField);
                    return segment;
                }

                if (segment.nestedSegments.length > 0) {
                    segment.nestedSegments = addFieldRecursive(segment.nestedSegments);
                }

                return segment;
            });
        };

        const newSegments = addFieldRecursive(segments);
        setSegments(newSegments);
    };

    const updateSegment = (segmentId: string, updatedProperties: Partial<SegmentData>) => {
        const updateSegmentRecursive = (segments: SegmentData[]) => {
            return segments.map((segment) => {
                if (segment.id === segmentId) {
                    return { ...segment, ...updatedProperties };
                }

                if (segment.nestedSegments.length > 0) {
                    segment.nestedSegments = updateSegmentRecursive(segment.nestedSegments);
                }

                return segment;
            });
        };

        const newSegments = updateSegmentRecursive(segments);
        setSegments(newSegments);
    };

    const deleteField = (segmentId: string, fieldId: string) => {
        const deleteFieldRecursive = (segments: SegmentData[]) => {
            return segments.map((segment) => {
                if (segment.id === segmentId) {
                    const updatedFields = segment.fields.filter((field) => field.id !== fieldId);
                    return { ...segment, fields: updatedFields };
                }

                if (segment.nestedSegments.length > 0) {
                    segment.nestedSegments = deleteFieldRecursive(segment.nestedSegments);
                }

                return segment;
            });
        };

        const newSegments = deleteFieldRecursive(segments);
        setSegments(newSegments);
    };

    return (
        <div>
            <h1>Dynamic Segments</h1>

            {segments.map((segment) => {
                return (
                    <div key={segment.id}>
                        <Segment
                            data={segment}
                            level={0}
                            addNestedSegment={addNestedSegment}
                            updateSegment={updateSegment}
                            deleteSegment={deleteSegment}
                            updateField={updateField}
                            addNewField={addNewField}
                            deleteField={deleteField}
                        />
                    </div>
                );
            })}

            <div>
                <textarea
                    value={JSON.stringify(segments, null, 2)}
                    rows={25}
                    cols={50}
                    onChange={(e) => {
                        // update the segments after valiidation
                        try {
                            const parsedData = JSON.parse(e.target.value);
                            setSegments(parsedData);
                        } catch (error) {
                            alert("Invalid JSON data");
                        }
                    }}
                ></textarea>

                <div>
                    <button
                        onClick={() => {
                            localStorage.setItem("segmentData", JSON.stringify(segments));
                            alert("Data saved to local storage");
                        }}
                    >
                        Save
                    </button>

                    <button
                        onClick={() => {
                            try {
                                const parsedData = JSON.parse(localStorage.getItem("segmentData") || "");
                                setSegments(parsedData);
                                alert("Data updated successfully");
                            } catch (error) {
                                alert("Invalid JSON data");
                            }
                        }}
                    >
                        Load Local Data
                    </button>
                </div>
            </div>
        </div>
    );
}
