
// const TestingInfo = ({ usabilityTesting, usabilityTestingId }) => {


//     return (
//         <div className="flex h-screen overflow-hidden">
//             <div className="flex-grow overflow-y-auto">
//                 <div className="mx-80 my-20 px-32">
//                     <div className="flex gap-8 p-4 mx-10">
//                         <div className="p-8 border-b border-gray-400">
//                             <p className="font-funnel font-3xl">{usabilityTesting.id}</p>
//                             <p className="font-funnel font-3xl">Title: {usabilityTesting.title}</p>
//                             <p className="font-funnel font-3xl">Task: {usabilityTesting.task}</p>
//                             <p className="font-funnel font-3xl">Duration: {usabilityTesting.duration}</p>
//                             <p className="font-funnel font-3xl">
//                                 Website: <a href={usabilityTesting.website_link} target="_blank" rel="noopener noreferrer">{usabilityTesting.website_link}</a>
//                             </p>
//                             <p className="font-funnel font-3xl">Figma Embed Code: {usabilityTesting.figma_embed_code}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default TestingInfo; 


const TestingInfo = ({ usabilityTesting, usabilityTestingId }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-grow overflow-y-auto">
                <div className="mx-80 my-20 px-32">
                    <div className="flex gap-8 p-4">
                        <div className="p-8 border-b border-gray-400">
                            <p className="font-funnel font-3xl">{usabilityTesting.id}</p>
                            <p className="font-funnel font-3xl">Title: {usabilityTesting.title}</p>
                            <p className="font-funnel font-3xl">Task: {usabilityTesting.task}</p>
                            <p className="font-funnel font-3xl">Duration: {usabilityTesting.duration}</p>

                            {/* Conditionally render Website or Prototype */}
                            {usabilityTesting.website_link && (
                                <p className="font-funnel font-3xl">
                                    Website: <a href={usabilityTesting.website_link} target="_blank" rel="noopener noreferrer">{usabilityTesting.website_link}</a>
                                </p>
                            )}

                            {usabilityTesting.figma_embed_code && (
                                <p className="font-funnel font-3xl">
                                    Figma Embed Code: {usabilityTesting.figma_embed_code}
                                </p>
                            )}

                            {/* In case both website and prototype are missing, display a message */}
                            {!usabilityTesting.website_link && !usabilityTesting.figma_embed_code && (
                                <p className="font-funnel font-3xl text-red-500">
                                    No website link or prototype embed code available.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestingInfo;

