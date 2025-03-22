// import React, { useState } from 'react';

// const MultiPointProgressBar = () => {
//   const [currentStep, setCurrentStep] = useState(1);

//   const steps = [1, 2, 3];

//   const handleNext = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <div className="flex items-center">
//                 {steps.map((step, index) => (
//                 <React.Fragment key={step}>
//                     <div
//                         className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
//                             currentStep >= step ? 'bg-blue-500' : 'bg-gray-400'
//                         }`}
//                     >
//                     {step}
//                     </div>
//                     {index < steps.length - 1 && (
//                         <div
//                             className={`w-20 h-1 ${
//                             currentStep > step ? 'bg-blue-500' : 'bg-gray-400'
//                             }`}
//                         ></div>
//                     )}
//                 </React.Fragment>
//                 ))}
//             </div>

//             <div className="mt-8">
//                 <button
//                     onClick={handleBack}
//                     disabled={currentStep === 1}
//                     className="px-4 py-2 mr-4 text-white bg-blue-500 rounded disabled:bg-gray-400"
//                 >
//                     Back
//                 </button>
//                 <button
//                     onClick={handleNext}
//                     disabled={currentStep === steps.length}
//                     className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
//                 >
//                  Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default MultiPointProgressBar;

// import React, { useState, useRef } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw"; // Allows HTML rendering

// const MarkdownEditor = ({ onSave }) => {
//     const [markdown, setMarkdown] = useState("");
//     const textareaRef = useRef(null);

//     const insertFormatting = (startTag, endTag = "") => {
//         const textarea = textareaRef.current;
//         if (!textarea) return;

//         const { selectionStart, selectionEnd } = textarea;
//         const text = markdown.substring(selectionStart, selectionEnd);
//         const formattedText = text ? `${startTag}${text}${endTag}` : `${startTag}${endTag}`;

//         const newText =
//             markdown.substring(0, selectionStart) +
//             formattedText +
//             markdown.substring(selectionEnd);

//         setMarkdown(newText);
//         setTimeout(() => {
//             textarea.selectionStart = selectionStart + startTag.length;
//             textarea.selectionEnd = selectionEnd + startTag.length;
//             textarea.focus();
//         }, 0);
//     };

//     return (
//         <div className="flex flex-col">
//             <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
//                 <h2 className="text-lg font-bold">Add Consent</h2>

//                 {/* Formatting Buttons */}
//                 <div className="mb-2 space-x-2 flex flex-wrap">
//                     <button onClick={() => insertFormatting("**", "**")} className="px-2 py-1 border rounded">Bold</button>
//                     <button onClick={() => insertFormatting("_", "_")} className="px-2 py-1 border rounded">Italic</button>
//                     <button onClick={() => insertFormatting("<u>", "</u>")} className="px-2 py-1 border rounded">Underline</button>
//                     <button onClick={() => insertFormatting("# ", "\n")} className="px-2 py-1 border rounded">H1</button>
//                     <button onClick={() => insertFormatting("## ", "\n")} className="px-2 py-1 border rounded">H2</button>
//                     <button onClick={() => insertFormatting("- ", "\n")} className="px-2 py-1 border rounded">List</button>
//                     <button onClick={() => insertFormatting("\n\n")} className="px-2 py-1 border rounded">Next Line</button>
//                 </div>

//                 {/* Markdown Editor */}
//                 <textarea
//                     ref={textareaRef}
//                     className="w-full p-2 border rounded-lg my-2"
//                     rows="7"
//                     value={markdown}
//                     onChange={(e) => setMarkdown(e.target.value)}
//                 />

//                 {/* Save Button */}
//                 <button
//                     className="mt-3 mx-3 bg-[#C4BDED] text-black px-4 py-2 rounded-lg self-end"
//                     onClick={() => onSave(markdown)}
//                 >
//                     Save Consent
//                 </button>
//             </div>

//             {/* Markdown Preview */}
//             <div className="border p-2 mt-2">
//                 <h3 className="text-md font-semibold">Preview:</h3>
//                 <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
//                     {markdown}
//                 </ReactMarkdown>
//             </div>                        
//         </div>
//     );
// };

// export default MarkdownEditor;










// import React, { useState, useRef } from "react";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw"; // Required for rendering raw HTML tags
// import remarkGfm from "remark-gfm"; // GitHub-flavored Markdown

// const MarkdownEditor = ({ onSave }) => {
//     const [markdown, setMarkdown] = useState("");
//     const textareaRef = useRef(null);

//     const insertFormatting = (startTag, endTag = "") => {
//         const textarea = textareaRef.current;
//         if (!textarea) return;

//         const { selectionStart, selectionEnd } = textarea;
//         const text = markdown.substring(selectionStart, selectionEnd);
//         const formattedText = text ? `${startTag}${text}${endTag}` : `${startTag}${endTag}`;

//         const newText =
//             markdown.substring(0, selectionStart) +
//             formattedText +
//             markdown.substring(selectionEnd);

//         setMarkdown(newText);
//         setTimeout(() => {
//             textarea.selectionStart = selectionStart + startTag.length;
//             textarea.selectionEnd = selectionEnd + startTag.length;
//             textarea.focus();
//         }, 0);
//     };

//     return (
//         <div className="flex flex-col">
//             <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
//                 <h2 className="text-lg font-bold">Add Consent</h2>

//                 {/* Formatting Buttons */}
//                 <div className="mb-2 space-x-2 flex flex-wrap">
//                     <button onClick={() => insertFormatting("**", "**")} className="px-2 py-1 border rounded">Bold</button>
//                     <button onClick={() => insertFormatting("_", "_")} className="px-2 py-1 border rounded">Italic</button>
//                     <button onClick={() => insertFormatting("<u>", "</u>")} className="px-2 py-1 border rounded">Underline</button>
//                     <button onClick={() => insertFormatting("# ", "")} className="px-2 py-1 border rounded">H1</button>
//                     <button onClick={() => insertFormatting("## ", "")} className="px-2 py-1 border rounded">H2</button>
//                     <button onClick={() => insertFormatting("- ", "\n")} className="px-2 py-1 border rounded">List</button>
//                     <button onClick={() => insertFormatting("\n\n")} className="px-2 py-1 border rounded">Next Line</button>
//                 </div>

//                 {/* Markdown Editor */}
//                 <textarea
//                     ref={textareaRef}
//                     className="w-full p-2 border rounded-lg my-2"
//                     rows="7"
//                     value={markdown}
//                     onChange={(e) => setMarkdown(e.target.value)}
//                 />

//                 {/* Save Button */}
//                 <button
//                     className="mt-3 mx-3 bg-[#C4BDED] text-black px-4 py-2 rounded-lg self-end"
//                     onClick={() => onSave(markdown)}
//                 >
//                     Save Consent
//                 </button>
//             </div>

//             {/* Markdown Preview */}
//             <div className="border p-2 mt-2">
//                 <h3 className="text-md font-semibold">Preview:</h3>
//                 <ReactMarkdown
//                     children={markdown}
//                     remarkPlugins={[remarkGfm]}        // Enable GitHub-Flavored Markdown
//                     rehypePlugins={[rehypeRaw]}       // Enable raw HTML rendering (such as <u>)
//                 />
//             </div>                        
//         </div>
//     );
// };

// export default MarkdownEditor;





import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // Required for rendering raw HTML tags
import remarkGfm from "remark-gfm"; // GitHub-flavored Markdown

const MarkdownEditor = ({ onSave }) => {
    const [markdown, setMarkdown] = useState("");
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
        <div className="flex flex-col">
            <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
                <h2 className="text-lg font-bold">Add Consent</h2>

                {/* Formatting Buttons */}
                <div className="mb-2 space-x-2 flex flex-wrap">
                    <button onClick={() => insertFormatting("**", "**")} className="px-2 py-1 border rounded">Bold</button>
                    <button onClick={() => insertFormatting("_", "_")} className="px-2 py-1 border rounded">Italic</button>
                    <button onClick={() => insertFormatting("<u>", "</u>")} className="px-2 py-1 border rounded">Underline</button>
                    <button onClick={() => insertFormatting("# ", "")} className="px-2 py-1 border rounded">H1</button>
                    <button onClick={() => insertFormatting("## ", "")} className="px-2 py-1 border rounded">H2</button>
                    <button onClick={() => insertFormatting("- ", "\n")} className="px-2 py-1 border rounded">List</button>
                    <button onClick={() => insertFormatting("\n\n")} className="px-2 py-1 border rounded">Next Line</button>
                    <button onClick={() => insertFormatting("\n ---")} className="px-2 py-1 border rounded">Partition</button>

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
                <button
                    className="mt-3 mx-3 bg-[#C4BDED] text-black px-4 py-2 rounded-lg self-end"
                    onClick={() => onSave(markdown)}
                >
                    Save Consent
                </button>
            </div>

            {/* Markdown Preview */}
            <div className="border p-2 mt-2">
                <h3 className="text-md font-semibold">Preview:</h3>
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
    );
};

export default MarkdownEditor;