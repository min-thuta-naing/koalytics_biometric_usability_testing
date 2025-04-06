// const TempoFacial = () => {
//     const danceSportLink = "https://www.worlddancesport.org";

//     const openLinkInNewWindow = () => {
//         window.open(danceSportLink, "_blank");
//     };

//     return (
//         <div className="flex items-center justify-center h-screen">
//             <button className="bg-gray-300 px-6 py-3 text-xl" onClick={openLinkInNewWindow}>
//                 Go
//             </button>
//         </div>
//     );
// };

// export default TempoFacial;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const TempoFacial = () => {
//     const danceSportLink = "https://www.worlddancesport.org";
//     const navigate = useNavigate();

//     const openLinkInNewWindow = () => {
//         navigate(`/browser-in-browser?url=${encodeURIComponent(danceSportLink)}`);
//     };

//     return (
//         <div className="flex items-center justify-center h-screen">
//             <button className="bg-gray-300 px-6 py-3 text-xl" onClick={openLinkInNewWindow}>
//                 Go
//             </button>
//         </div>
//     );
// };

// export default TempoFacial;


import React from 'react';
import { useState, useEffect } from "react";

const TempoFacial = () => {

    const [showPopup, setShowPopup] = useState(true); 

    const danceSportLink = "https://embed.figma.com/design/7wg9kH8FCsNtRaSYjPw49N/EcoExchange?node-id=0-1&embed-host=share";

    const openLinkInNewWindow = () => {
        // Open the BrowserInBrowser page in a new tab with the URL query parameter
        window.open(`/browser-in-browser?url=${encodeURIComponent(danceSportLink)}`, '_blank');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-2xl h-3/4 flex flex-col">
                        <h2 className="font-funnel text-xl font-bold mb-4">Consent Form</h2>
                        <p className="font-funnel mb-2">Please take a moment to read the following consent forms.</p>
                        <div className='border border-gray-400 rounded-lg flex-grow overflow-y-auto p-4'>
                            <p className='font-funnel m-3 text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                        </div>
                        
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="mt-4 bg-[#ACE1AF] text-black px-6 py-3 rounded-lg"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="mt-4 bg-[#F19292] text-black px-6 py-3 rounded-lg"
                            >
                                Reject
                            </button>
                        </div>
                        
                    </div>
                </div>
            )}

            <button className="bg-gray-300 px-6 py-3 text-xl" onClick={openLinkInNewWindow}>
                Go
            </button>
        </div>
    );
};

export default TempoFacial;


// this code work
// import React from 'react';

// const EcoExchangeEmbed = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
//       <iframe
//         style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
//         width="800"
//         height="450"
//         src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/p48Axbm0CvnY6dt2pqKIce/Ultimate-Tic-tac-toe?node-id=0-1&t=29wEpJiHKhKWotF5-1"
//         allowfullscreen
//       />
//     </div>
//   );
// };

// export default EcoExchangeEmbed;


// import React from 'react';

// const EcoExchangeLink = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
//       <a 
//         href="https://www.figma.com/proto/p48Axbm0CvnY6dt2pqKIce/Ultimate-Tic-tac-toe?node-id=0-1&t=bapk5JpBVHN60zXN-1" 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="text-blue-500 underline"
//       >
//         Open Figma Prototype
//       </a>
//     </div>
//   );
// };

// export default EcoExchangeLink;



