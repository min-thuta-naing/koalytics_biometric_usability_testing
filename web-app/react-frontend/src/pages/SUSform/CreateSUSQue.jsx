import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CreateSUSQue = () => {
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [question, setQuestion] = useState('');
    const [questionType, setQuestionType] = useState('scale');
    const [themeCategory, setThemeCategory] = useState('Classic Neutrals');
    const [themeColor, setThemeColor] = useState('white');
    const [font, setFont] = useState('Arial');
    const [showPreview, setShowPreview] = useState(false);
    const [questionsList, setQuestionsList] = useState([]);

    const colorOptions = {
        'Classic Neutrals': ['white', 'gray', 'brown'],
        'Pastel Colors': ['lightpink', 'lavender', 'lightblue'],
        'Earth Tones': ['olive', 'peru', 'mediumseagreen'],
    };

    const handleNext = () => {
        if (question) {
            setQuestionsList([...questionsList, { id: uuidv4(), text: question, type: questionType }]);
            setQuestion('');
            setShowPreview(true);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', backgroundColor: '#f8f9fa' }}>
            {/* Left Panel */}
            <div style={{ width: '45%', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', marginRight: '20px' }}>
                <h2>Project Title*</h2>
                <input type="text" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Enter project title" style={{ width: '100%', padding: '12px', marginBottom: '20px' }} />

                <h3>Project Description</h3>
                <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Enter project description" style={{ width: '100%', padding: '12px', marginBottom: '20px' }} />

                <h2>Question & Type*</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter your question" style={{ flex: 2, padding: '12px' }} />
                    <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} style={{ flex: 1, padding: '12px' }}>
                        <option value="scale">Scale (1 to 5)</option>
                        <option value="open-ended">Open-ended</option>
                    </select>  
                </div>

                <h3>Theme Customization</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    {/* Theme Category Dropdown */}
                    <select 
                        onChange={(e) => {
                            setThemeCategory(e.target.value);
                            setThemeColor(colorOptions[e.target.value][0]);
                        }} 
                        style={{ flex: 1, padding: '10px' }}>
                        {Object.keys(colorOptions).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    {/* Theme Color Dropdown */}
                    <select value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={{ flex: 1, padding: '10px' }}>
                        {colorOptions[themeCategory].map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>

                {/* Font Selection - Inline with Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <h3 style={{ margin: '0' }}>Choose a Font</h3>
                    <select onChange={(e) => setFont(e.target.value)} style={{ flex: 1, padding: '10px' }}>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Sans-serif">Sans-serif</option>
                    </select>
                </div>

                <button onClick={handleNext} style={{ width: '100%', padding: '12px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}>
                    Next
                </button>
            </div>

            {/* Right Panel - Preview */}
            {showPreview && (
                <div style={{ width: '45%', backgroundColor: themeColor, padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', fontFamily: font }}>
                    <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1a73e8' }}>Preview</h2>
                    <div style={{ padding: '20px', border: '1px solid #dadce0', borderRadius: '8px' }}>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{projectTitle}</h1>
                        <p>{projectDescription}</p>
                        <form>
                            {questionsList.map((q, index) => (
                                <div key={q.id} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                                    <p>{index + 1}. {q.text} ({q.type})</p>
                                    {q.type === 'scale' && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <label key={num}>
                                                    <input type="radio" name={`question-${index}`} value={num} /> {num}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    {q.type === 'open-ended' && <input type="text" placeholder="Your answer here" style={{ width: '100%', padding: '8px' }} />}
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateSUSQue;
