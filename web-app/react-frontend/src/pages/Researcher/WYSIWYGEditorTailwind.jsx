// import React from "react";
// import { Bold, Italic, Strikethrough, Underline as UnderlineIcon, Highlighter, AlignLeft, AlignRight, AlignCenter, AlignJustify, Link2, Link2Off, Heading1, Heading2 } from "lucide-react";
// import { useEditor, EditorContent, isActive } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";

// const MenuBar = ({ editor }) => {
//     if (!editor) {
//         return null;
//     }

//     const activeButton = "text-black  px-2 py-1 rounded-lg bg-gray-200 border border-gray-300 ";
//     const inActiveButton = "bg-white text-black  px-2 py-1 rounded-lg  hover:bg-gray-200 ";
//     return (
//         <div className="flex flex-wrap gap-2 mt-1 mx-1 border-b pb-1">
//             {/* Paragraph and Headings */}
//             <button
//                 onClick={() => editor.chain().focus().setParagraph().run()}
//                 className={editor.isActive('paragraph') ? activeButton : inActiveButton}
//                 title="Paragraph"
//             >
//                 <span className="text-xs font-medium">Paragraph</span>
//             </button>

//             <button
//                 onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                 className={editor.isActive('heading', { level: 1 }) ? activeButton : inActiveButton}
//                 title="Heading 1"
//             >
//                 <span className="text-xs font-medium">Heading 1</span>
//             </button>

//             <button
//                 onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//                 className={editor.isActive('heading', { level: 2 }) ? activeButton : inActiveButton}
//                 title="Heading 2"
//             >
//                 <span className="text-xs font-medium">Heading 2</span>
//             </button>

//             <button
//                 onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//                 className={editor.isActive('heading', { level: 3 }) ? activeButton : inActiveButton}
//                 title="Heading 3"
//             >
//                 <span className="text-xs font-medium">Heading 3</span>
//             </button>

//             {/* Partition between buttons*/}
//             <div className="border-r h-5 rounded-lg border-gray-400 mx-1 " />

//             {/* Text formatting */}
//             <button
//                 onClick={() => editor.chain().focus().toggleBold().run()}
//                 className={editor.isActive('bold') ? activeButton : inActiveButton}
//                 title="Bold"
//             >
//                 <Bold className="w-4 h-4"/>
//             </button>

//             <button
//                 onClick={() => editor.chain().focus().toggleItalic().run()}
//                 className={editor.isActive('italic') ? activeButton : inActiveButton}
//                 title="Italic"
//             >
//                 <Italic className="w-4 h-4"/>
//             </button>

//             <button
//                 onClick={() => editor.chain().focus().toggleUnderline().run()}
//                 className={editor.isActive('underline') ? activeButton : inActiveButton}
//                 title="Underline"
//             >
//                 <UnderlineIcon className="w-4 h-4"/>
//             </button>
//         </div>
//     );
// };

// const WYSIWYGEditorUsingTailwind = ({ content, onUpdate }) => {
//     const editor = useEditor({
//         extensions: [
//             StarterKit.configure({
//                 heading: {
//                     levels: [1, 2, 3],
//                 },
//             }),
//             Underline,
//         ],
//         content: content,
//         onUpdate: ({ editor }) => {
//             if (onUpdate) {
//                 onUpdate(editor.getHTML());
//             }
//         },
//         editorProps: {
//             attributes: {
//                 class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[200px] p-4',
//             },
//         },
//     });

//     return (
//         <div className="border rounded-lg">
//             <MenuBar editor={editor} />
//             <EditorContent editor={editor} />
//         </div>
//     );
// };

// export default WYSIWYGEditorUsingTailwind;

