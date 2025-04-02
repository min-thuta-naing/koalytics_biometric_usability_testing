import React from "react";
import { Bold, Italic, Strikethrough, Underline as UnderlineIcon, Highlighter, AlignLeft, AlignRight, AlignCenter, AlignJustify, Link2, Link2Off, Heading1, Heading2 } from "lucide-react";
// Main TipTap Components & editor Initator
import { EditorContent, useEditor } from "@tiptap/react";
// Tiptap STraterKit
import StarterKit from "@tiptap/starter-kit";
// Document & Paragraph
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
// For Link Adding
import Link from "@tiptap/extension-link";
// Text Styles & Formating
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Heading from '@tiptap/extension-heading';


const MenuBar = ({ editor }) => {
    const setLink = React.useCallback(() => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
        return;
        }

        // empty
        if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
        }

        // update link
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    const highlightExtension = Highlight.configure({
        multicolor: true, // Enables multiple highlight colors
    });
    const activeButton = "text-black  px-2 py-1 rounded-lg bg-gray-200 border border-gray-300 ";
    const inActiveButton = "bg-white text-black  px-2 py-1 rounded-lg  hover:bg-gray-200 ";
    return (
        <div className="lg:flex lg:items-center lg:justify-center md:flex md:items-center md:justify-center">
            <div className="bg-white m-1 p-1 rounded-lg w-full">
                <div className=" flex items-center gap-1 overflow-x-auto w-full">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={editor.isActive("bold") ? activeButton : inActiveButton}
                    >
                        <Bold className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={
                        editor.isActive("italic") ? activeButton : inActiveButton
                        }
                    >
                         <Italic className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editor.can().chain().focus().toggleStrike().run()}
                        className={
                        editor.isActive("strike") ? activeButton : inActiveButton
                        }
                    >
                         <Strikethrough className="w-5 h-5" />
                    </button>
                        
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive("underline") ? activeButton : inActiveButton}
                    >
                        <UnderlineIcon className="w-5 h-5"/> 
                    </button>

                    {/* Partition between buttons*/}
                    <div className="border-r h-5 rounded-lg border-gray-400 mx-1 " />

                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={
                            editor.isActive('heading', { level: 1 }) ? activeButton : inActiveButton
                        }
                    >
                        <Heading1 className="w-5 h-5"/>
                    </button>


                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={
                            editor.isActive('heading', { level: 2 }) ? activeButton : inActiveButton
                        }
                    >
                        <Heading2 className="w-5 h-5"/>
                    </button>


                    {/* Partition between buttons */}
                    <div className="border-r h-5 rounded-lg border-gray-400 mx-1  " />

                    {/* <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={
                        editor.isActive("highlight") ? activeButton : inActiveButton
                        }
                    >
                        <Highlighter className="w-5 h-5"  fill="yellow"/>
                    </button> */}

                    <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: "yellow" }).run()}
                        className={editor.isActive("highlight", { color: "yellow" }) ? activeButton : inActiveButton}
                    >
                        <Highlighter className="w-5 h-5 fill-yellow-200" />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: "#90EE90" }).run()}
                        className={editor.isActive("highlight", { color: "#90EE90" }) ? activeButton : inActiveButton}
                    >
                        <Highlighter className="w-5 h-5 fill-green-200" />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: "#FFB6C1" }).run()}
                        className={editor.isActive("highlight", { color: "#FFB6C1" }) ? activeButton : inActiveButton}
                    >
                        <Highlighter className="w-5 h-5 fill-red-200" />
                    </button>

                    {/* Partition between buttons */}
                    <div className="border-r h-5 rounded-lg border-gray-400 mx-1  " />


                    <button
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        className={
                        editor.isActive({ textAlign: "left" })
                            ? activeButton
                            : inActiveButton
                        }
                    >
                        <AlignLeft className="w-5 h-5"/> 
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        className={
                        editor.isActive({ textAlign: "center" })
                            ? activeButton
                            : inActiveButton
                        }
                    >
                        <AlignCenter className="w-5 h-5"/> 
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        className={
                        editor.isActive({ textAlign: "right" })
                            ? activeButton
                            : inActiveButton
                        }
                    >
                        <AlignRight className="w-5 h-5"/> 
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                        className={
                        editor.isActive({ textAlign: "justify" })
                            ? activeButton
                            : inActiveButton
                        }
                    >
                        <AlignJustify className="w-5 h-5"/> 
                    </button>

                    {/* Partition between buttons */}
                    <div className="border-r h-5 rounded-lg border-gray-400 mx-1  " />
                    
                    <button
                        onClick={setLink}
                        className={editor.isActive("link") ? activeButton : inActiveButton}
                    >
                        <Link2 className="w-5 h-5"/>
                    </button>

                    <button
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        disabled={!editor.isActive("link")}
                        className={editor.isActive("link") ? inActiveButton : activeButton}
                    >
                        <Link2Off className="w-5 h-5"/>
                    </button>

                </div>
            </div>
        </div>
    );
};
    

const Editor = ({ content, setContent }) => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class:
                "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
            },
        },
        extensions: [
            
            TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            
            Highlight.configure({ multicolor: true }),
            Heading,
            Underline,
            Document,
            Paragraph,
            Link.configure({
                openOnClick: true,
                validate: (href) => /^https?:\/\//.test(href),
                HTMLAttributes: {
                class: "link",
                },
            }),
        ],       
        content: content,
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        },
    });

    // Debug effect
    React.useEffect(() => {
        if (editor) {
            console.log('Editor commands:', editor.commands);
            console.log('Heading command available:', 
                editor.commands.toggleHeading !== undefined);
        }
    }, [editor]);

    return (
        <div className="w-full lg:flex md:flex flex-col items-center justify-center">
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="bg-white w-full border border-gray-400 p-2 rounded-md focus:border-none"
            />
        </div>
    );
};

export default Editor;

