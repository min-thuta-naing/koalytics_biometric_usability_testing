import { useState } from "react";

const CreateQuestions = () => {
    const [description, setDescription] = useState("");

    // Likert Scale Fixed Questions
    const [likertQuestions, setLikertQuestions] = useState([
        "I think that I would like to use this system frequently.",
        "I found the system unnecessarily complex.",
        "I thought the system was easy to use.",
        "I think that I would need the support of a technical person to be able to use this system.",
        "I found the various functions in this system were well integrated.",
        "I thought there was too much inconsistency in this system.",
        "I would imagine that most people would learn to use this system very quickly.",
        "I found the system very cumbersome to use.",
        "I felt very confident using the system.",
        "I needed to learn a lot of things before I could get going with this system.",
    ]);

    // Section 3: Custom Questions
    const [customQuestions, setCustomQuestions] = useState([]);

    // Update Likert Question Text
    const updateLikertQuestion = (index, newText) => {
        setLikertQuestions(likertQuestions.map((q, i) => (i === index ? newText : q)));
    };

    // Add Custom Question
    const addCustomQuestion = () => {
        setCustomQuestions([
            ...customQuestions,
            {
                id: Date.now(),
                text: "",
                type: "short_answer",
                options: [],
            },
        ]);
    };

    // Remove Custom Question
    const removeCustomQuestion = (id) => {
        setCustomQuestions(customQuestions.filter((q) => q.id !== id));
    };

    // Update Custom Question Text
    const updateCustomQuestionText = (id, text) => {
        setCustomQuestions(customQuestions.map((q) => (q.id === id ? { ...q, text } : q)));
    };

    // Update Custom Question Type
    const updateCustomQuestionType = (id, type) => {
        setCustomQuestions(
            customQuestions.map((q) =>
                q.id === id ? { ...q, type, options: type === "short_answer" || type === "paragraph" ? [] : q.options } : q
            )
        );
    };

    // Add Option (For Multiple Choice, Checkboxes, Dropdown)
    const addOption = (id) => {
        setCustomQuestions(
            customQuestions.map((q) =>
                q.id === id ? { ...q, options: [...q.options, ""] } : q
            )
        );
    };

    // Update Option
    const updateOption = (qId, index, value) => {
        setCustomQuestions(
            customQuestions.map((q) =>
                q.id === qId
                    ? { ...q, options: q.options.map((opt, i) => (i === index ? value : opt)) }
                    : q
            )
        );
    };

    // Remove Option
    const removeOption = (qId, index) => {
        setCustomQuestions(
            customQuestions.map((q) =>
                q.id === qId ? { ...q, options: q.options.filter((_, i) => i !== index) } : q
            )
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Create a Form</h2>

            {/* Section 1: Description */}
            <div className="bg-white shadow-md p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Section 1: Description</h3>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter the form description here..."
                    className="w-full border p-2 rounded h-24"
                />
            </div>

            {/* Section 2: Likert Scale Questions */}
            <div className="bg-white shadow-md p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Section 2: Likert Scale</h3>
                {likertQuestions.map((q, index) => (
                    <div key={index} className="mb-4">
                        <input
                            type="text"
                            value={q}
                            onChange={(e) => updateLikertQuestion(index, e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                ))}
            </div>

            {/* Section 3: Custom Questions */}
            <div className="bg-white shadow-md p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Section 3: Additional Questions</h3>
                {customQuestions.map((q, qIndex) => (
                    <div key={q.id} className="bg-gray-100 p-4 rounded-lg mb-4">
                        <input
                            type="text"
                            placeholder={`Question ${qIndex + 1}`}
                            value={q.text}
                            onChange={(e) => updateCustomQuestionText(q.id, e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />

                        <select
                            value={q.type}
                            onChange={(e) => updateCustomQuestionType(q.id, e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        >
                            <option value="short_answer">Short Answer</option>
                            <option value="paragraph">Paragraph</option>
                            <option value="multiple_choice">Multiple Choice</option>
                            <option value="checkboxes">Checkboxes</option>
                            <option value="dropdown">Dropdown</option>
                        </select>

                        {/* Options for multiple-choice, checkboxes, and dropdown */}
                        {["multiple_choice", "checkboxes", "dropdown"].includes(q.type) && (
                            <div>
                                {q.options.map((opt, i) => (
                                    <div key={i} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            value={opt}
                                            placeholder={`Option ${i + 1}`}
                                            onChange={(e) => updateOption(q.id, i, e.target.value)}
                                            className="border p-2 flex-grow rounded"
                                        />
                                        <button
                                            onClick={() => removeOption(q.id, i)}
                                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addOption(q.id)}
                                    className="mt-2 text-blue-600 hover:underline"
                                >
                                    ➕ Add Option
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => removeCustomQuestion(q.id)}
                            className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            🗑️ Delete Question
                        </button>
                    </div>
                ))}

                <button
                    onClick={addCustomQuestion}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    ➕ Add Question
                </button>
            </div>
        </div>
    );
};

export default CreateQuestions;
