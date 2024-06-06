export type FieldType = "text" | "dropdown";
export type SegmentComparison = "AND" | "OR";

export interface FieldData {
    id: string;
    type: FieldType;
    value: string;
}

export interface SegmentData {
    id: string;
    fields: Array<FieldData>;
    segmentComparison: SegmentComparison;
    nestedSegments: Array<SegmentData>;
}
