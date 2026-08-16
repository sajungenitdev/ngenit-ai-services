"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => (
        <div className="h-48 bg-off-white rounded-lg animate-pulse flex items-center justify-center">
            <span className="text-grey-400">Loading editor...</span>
        </div>
    ),
});

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: number;
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "check",
    "blockquote",
    "code-block",
    "link",
    "image",
];

export default function RichTextEditor({
    value,
    onChange,
    placeholder = "Write something...",
    height = 200,
}: RichTextEditorProps) {
    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="bg-white"
            />
            <style jsx>{`
                .rich-text-editor :global(.ql-container) {
                    min-height: ${height}px;
                    border-radius: 0 0 8px 8px;
                    font-size: 0.95rem;
                }
                .rich-text-editor :global(.ql-toolbar) {
                    border-radius: 8px 8px 0 0;
                    background: #f8fafc;
                    border-color: #e2e8f0;
                }
                .rich-text-editor :global(.ql-editor) {
                    min-height: ${height}px;
                    color: #0f172a; /* Fixes white text issue */
                }
                .rich-text-editor :global(.ql-editor.ql-blank::before) {
                    color: #94a3b8;
                    font-style: normal;
                }
                .rich-text-editor :global(.ql-snow .ql-stroke) {
                    stroke: #475569;
                }
                .rich-text-editor :global(.ql-snow .ql-fill) {
                    fill: #475569;
                }
                .rich-text-editor :global(.ql-snow .ql-picker) {
                    color: #475569;
                }
                .rich-text-editor :global(.ql-snow .ql-picker-options) {
                    background: #ffffff;
                    border-color: #e2e8f0;
                    color: #0f172a; /* Fixes dropdown option text color */
                }
                .rich-text-editor :global(.ql-snow .ql-tooltip) {
                    background: #ffffff;
                    border-color: #e2e8f0;
                    color: #0f172a;
                }
            `}</style>
        </div>
    );
}