import React, { useState } from 'react';

const CreateSUSQue = () => {
    const [question, setQuestion] = useState('');
    const [notes, setNotes] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [questionsList, setQuestionsList] = useState([]);

    const handleNext = () => {
        if (question) {
            setQuestionsList([...questionsList, { text: question, notes }]);
            setQuestion('');
            setNotes('');
            setShowPreview(true);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ddd' }}>
                <h2>Question*</h2>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your question here"
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <h3>Add notes</h3>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Type extra details here. This is optional."
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button onClick={handleNext} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Next
                </button>
            </div>
            {showPreview && (
                <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h2>Questions Preview</h2>
                    {questionsList.map((q, index) => (
                        <div key={index} style={{ marginBottom: '15px', width: '100%', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                            <p><strong>{index + 1}. {q.text}</strong></p>
                            {q.notes && <p style={{ fontSize: '0.9em', color: 'gray' }}>{q.notes}</p>}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', alignItems: 'center' }}>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <div key={num} style={{ textAlign: 'center' }}>
                                        <input type="radio" name={`question-${index}`} value={num} style={{ marginBottom: '5px' }} />
                                        <br />
                                        <span>{num}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '5px' }}>
                                <span style={{ fontSize: '0.9em', color: 'gray' }}>Strongly Disagree</span>
                                <span style={{ fontSize: '0.9em', color: 'gray' }}>Strongly Agree</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CreateSUSQue;
