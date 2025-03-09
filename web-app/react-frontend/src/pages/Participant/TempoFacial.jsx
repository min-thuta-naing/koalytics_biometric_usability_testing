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

const TempoFacial = () => {
    const danceSportLink = "https://www.worlddancesport.org";

    const openLinkInNewWindow = () => {
        // Open the BrowserInBrowser page in a new tab with the URL query parameter
        window.open(`/browser-in-browser?url=${encodeURIComponent(danceSportLink)}`, '_blank');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <button className="bg-gray-300 px-6 py-3 text-xl" onClick={openLinkInNewWindow}>
                Go
            </button>
        </div>
    );
};

export default TempoFacial;

