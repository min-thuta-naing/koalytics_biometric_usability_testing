import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const CreatePermission = ({ usabilityTestingId, markdown, setMarkdown, handleAddConsent }) => {

    const textareaRef = useRef(null);

    const insertFormatting = (startTag, endTag = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const { selectionStart, selectionEnd } = textarea;
        const text = markdown.substring(selectionStart, selectionEnd);
        const formattedText = text ? `${startTag}${text}${endTag}` : `${startTag}${endTag}`;

        const newText =
            markdown.substring(0, selectionStart) +
            formattedText +
            markdown.substring(selectionEnd);

        setMarkdown(newText);
        setTimeout(() => {
            textarea.selectionStart = selectionStart + startTag.length;
            textarea.selectionEnd = selectionEnd + startTag.length;
            textarea.focus();
        }, 0);
    };

    return (
        <div className="flex gap-8 p-4 mx-10 bg-[#F0EEED]">
            {/* Column 1: Add Question */}
            <div className="w-1/3 h-[700px] bg-white p-4 rounded-xl shadow-xl relative flex flex-col">

                <div className="flex flex-col">
                    <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
                        <h2 className="text-lg font-bold font-funnel">Add Consent</h2>

                        <p className="mt-2 mb-2 font-funnel">Text Formatting</p>

                        {/* Formatting Buttons */}
                        <div className="mt-2 space-x-2 flex flex-wrap">
                            <button onClick={() => insertFormatting("# ", "\n")} className="px-2 py-1 border rounded font-funnel text-xs">Heading 1</button>
                            <button onClick={() => insertFormatting("## ", "\n")} className="px-2 py-1 border rounded font-funnel text-xs">Heading 2</button>
                            <button onClick={() => insertFormatting("**", "**")} className="px-2 py-1 border rounded font-funnel text-xs">Bold</button>
                            <button onClick={() => insertFormatting("_", "_")} className="px-2 py-1 border rounded font-funnel text-xs">Italic</button>
                        </div>
                        <div className="mt-2 mb-2 space-x-2 flex flex-wrap">
                            <button onClick={() => insertFormatting("<u>", "</u>")} className="px-2 py-1 border rounded font-funnel text-xs">Underline</button>
                            <button onClick={() => insertFormatting("- ", "\n")} className="px-2 py-1 border rounded font-funnel text-xs">List</button>
                            <button onClick={() => insertFormatting("\n \n")} className="px-2 py-1 border rounded font-funnel text-xs">Next Line</button>
                            <button onClick={() => insertFormatting("\n ---")} className="px-2 py-1 border rounded font-funnel text-xs">Partition</button>
                        </div>

                        {/* Markdown Editor */}
                        <textarea
                            ref={textareaRef}
                            className="w-full p-2 border rounded-lg my-2"
                            rows="7"
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                        />
                        {/* Save Button */}
                        <div className="flex justify-end"> 
                            <button
                                className="mt-3 bg-[#C4BDED] text-black  px-2 py-2 rounded-lg self-end"
                                onClick={handleAddConsent}
                            >
                                Save Consent
                            </button>
                        </div>
                    </div>     
                </div>
            </div>

            {/* Column 2: Display Questions from Backend */}
            <div className="w-2/3 h-[700px] bg-white p-4 rounded-xl shadow-xl">
                <div> 
                    <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
                        <h2 className="text-lg font-bold font-funnel">Consent Preview</h2>
                        <ReactMarkdown
                            children={markdown}
                            remarkPlugins={[remarkGfm]} // Enable GitHub-Flavored Markdown
                            rehypePlugins={[rehypeRaw]} // Enable raw HTML rendering
                            components={{
                                // Add Tailwind classes to rendered elements
                                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-3" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                                li: ({ node, ...props }) => <li className="my-1" {...props} />,
                            }}
                        />
                    </div>                        
                </div>
            </div>
        </div>
    )
}

export default CreatePermission; 
