import React from "react";
import { Bold, Italic, Underline as UnderlineIcon, Highlighter,AlignLeft,AlignCenter,AlignRight,AlignJustify,List, ListOrdered, Strikethrough, Quote } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import "./WYSIWYGEditorStyles.css"; 

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="tiptap-menu-bar">
            {/* Paragraph and Headings */}
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`tiptap-menu-button ${
                    editor.isActive('paragraph') ? 'active' : ''
                }`}
                title="Body"
            >
                <span>Paragraph</span>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`tiptap-menu-button ${
                    editor.isActive('heading', { level: 1 }) ? 'active' : ''
                }`}
                title="Heading 1"
            >
                {/* <Heading1 className="icon" /> */}
                <span>Heading 1</span>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`tiptap-menu-button ${
                    editor.isActive('heading', { level: 2 }) ? 'active' : ''
                }`}
                title="Heading 2"
            >
                {/* <Heading2 className="icon" /> */}
                <span>Heading 2</span>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`tiptap-menu-button ${
                    editor.isActive('heading', { level: 3 }) ? 'active' : ''
                }`}
                title="Heading 3"
            >
                {/* <Heading3 className="icon" /> */}
                <span>Heading 3</span>
            </button>

            <div className="tiptap-menu-divider" />

            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`tiptap-menu-button ${
                    editor.isActive('bold') ? 'active' : ''
                }`}
                title="Bold"
            >
                <Bold className="icon" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`tiptap-menu-button ${
                    editor.isActive('italic') ? 'active' : ''
                }`}
                title="Italic"
            >
                <Italic className="icon" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`tiptap-menu-button ${
                    editor.isActive('underline') ? 'active' : ''
                }`}
                title="Underline"
            >
                <UnderlineIcon className="icon" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`tiptap-menu-button ${
                    editor.isActive('strike') ? 'active' : ''
                }`}
                title="Strikethrough"
            >
                <Strikethrough className="icon" />
            </button>

            <div className="tiptap-menu-divider" />

            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: "yellow" }).run()}
                className={`tiptap-menu-button ${
                    editor.isActive("highlight", { color: "yellow" }) ? 'active' : ''
                }`}
            >
                <Highlighter className="yellow-highlight" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: "#90EE90" }).run()}
                className={`tiptap-menu-button ${
                    editor.isActive("highlight", { color: "#90EE90" }) ? 'active' : ''
                }`}
            >
                <Highlighter className="green-highlight" />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: "#FFB6C1" }).run()}
                className={`tiptap-menu-button ${
                    editor.isActive("highlight", { color: "#FFB6C1" }) ? 'active' : ''
                }`}
            >
                <Highlighter className="red-highlight" />
            </button>

           

            <button
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                className={`tiptap-menu-button ${
                    editor.isActive({ textAlign: "left" }) ? 'active' : ''
                }`}
            >
                <AlignLeft className="w-5 h-5"/> 
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                className={`tiptap-menu-button ${
                    editor.isActive({ textAlign: "center" }) ? 'active' : ''
                }`}
            >
                <AlignCenter className="w-5 h-5"/> 
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                className={`tiptap-menu-button ${
                    editor.isActive({ textAlign: "right" }) ? 'active' : ''
                }`}
            >
                <AlignRight className="w-5 h-5"/> 
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                className={`tiptap-menu-button ${
                    editor.isActive({ textAlign: "justify" }) ? 'active' : ''
                }`}
            >
                <AlignJustify className="w-5 h-5"/> 
            </button>

            <div className="tiptap-menu-divider" />

            <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`tiptap-menu-button ${
                editor.isActive('bulletList') ? 'active' : ''
            }`}
            title="Bullet List"
            >
            <List className="icon" />
            </button>

            <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`tiptap-menu-button ${
                editor.isActive('orderedList') ? 'active' : ''
            }`}
            title="Numbered List"
            >
            <ListOrdered className="icon" />
            </button>

            <div className="tiptap-menu-divider" />

            {/* Blockquote button */}
            <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`tiptap-menu-button ${
                editor.isActive('blockquote') ? 'active' : ''
            }`}
            title="Blockquote"
            >
            <Quote className="icon" />
            </button>

            {/* Horizontal Rule button */}
            <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="tiptap-menu-button"
            title="Section break"
            >
            <span>Section Break</span>
            </button>

                    </div>
                );
            };

const WYSIWYGEditor = ({ content, onUpdate }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc pl-5',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal pl-5',
                    },
                },
            }),
            Underline,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            
        ],
        content: content,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            console.log("Editor content updated:", html); //debugging
            if (onUpdate) {
                // onUpdate(editor.getHTML());
                onUpdate(html);
            }
        },
        editorProps: {
            attributes: {
                class: 'tiptap-content',
            },
        },
    });

    // Add effect to handle external content changes
    React.useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            console.log("Syncing external content changes"); // Debug log
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="tiptap-editor-container">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default WYSIWYGEditor;