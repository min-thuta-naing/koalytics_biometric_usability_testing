// import React from 'react';

// const BrowserInBrowser = () => {
//   return (
//     <div style={{ width: '100%', height: '100vh', border: 'none' }}>
//       <iframe
//         src="https://example.com"  // Replace with the URL you want to display
//         title="Embedded Browser"
//         style={{ width: '100%', height: '100%', border: 'none' }}
//       />
//     </div>
//   );
// };

// export default BrowserInBrowser;

import React from 'react';
import { useLocation } from 'react-router-dom';

const BrowserInBrowser = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const url = urlParams.get('url'); // Get the URL from query parameters

    return (
        <div className="flex h-screen">
            {/* Left Side (Content Section) */}
            <div className="w-1/5 p-6 bg-gray-100">
                <h2 className="text-xl font-bold">Instructions</h2>
                <p>This space can be used to provide instructions or any other content.</p>
                {/* Add more content or text as needed */}
            </div>

            {/* Right Side (Iframe Section) */}
            <div className="w-4/5 h-full">
                {url ? (
                    <iframe
                        src={url}
                        title="Embedded Browser"
                        className="w-full h-full border-none"
                    />
                ) : (
                    <p>No URL provided</p>
                )}
            </div>
        </div>
    );
};

export default BrowserInBrowser;

