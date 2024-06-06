import React from "react";
import { SegmentComparison } from "./components";

interface ComparisonProps {
    type: SegmentComparison;
    onChange: (value: any) => void;
}
const Comparison = ({ type, onChange }: ComparisonProps) => {
    return (
        <select onChange={(e) => onChange(e.target.value)} value={type}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
        </select>
    );
};

export default Comparison;
