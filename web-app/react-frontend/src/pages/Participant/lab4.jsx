// import React, { useState } from 'react';

// const QuestionCreator = () => {
//     // variables
//     const [str_questionText, setStr_questionText] = useState("");
//     const [str_questionType, setStr_questionType] = useState("text");
//     const [bln_isRequired, setBln_isRequired] = useState(false);

//     return (
//         <div className="question-creator">
//             <h2>Create Question</h2>
            
//             <div className="form-group">
//                 <label>Question:</label>
//                 <input 
//                     type="text" 
//                     value={str_questionText} 
//                     onChange={(e) => setStr_questionText(e.target.value)} 
//                 />
//             </div>

//             <div className="form-group">
//                 <label>Type:</label>
//                 <select 
//                     value={str_questionType} 
//                     onChange={(e) => setStr_questionType(e.target.value)}
//                 >
//                     <option value="text">Text Answer</option>
//                     <option value="single">Single Choice</option>
//                 </select>
//             </div>

//             <div className="form-group">
//                 <label>
//                     <input 
//                         type="checkbox" 
//                         checked={bln_isRequired} 
//                         onChange={(e) => setBln_isRequired(e.target.checked)} 
//                     />
//                     Required
//                 </label>
//             </div>

//             <button>Save Question</button>
//         </div>
//     );
// };

// export default QuestionCreator;
