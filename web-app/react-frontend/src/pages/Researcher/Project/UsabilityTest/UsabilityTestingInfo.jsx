const TestingInfo = ({ usabilityTesting, usabilityTestingId }) => {
    return (
        <div className="font-funnel flex h-screen overflow-hidden">
            <div className="max-w-4xl w-full mx-auto overflow-y-auto p-12">
                <div className="flex flex-col">
                    <h2 className="mx-3 px-4 pt-3 text-lg font-bold font-funnel">Usability Test Details</h2>
                    <div className="font-funnel mt-3 mx-3 p-4 bg-white rounded-lg shadow-lg">
                        {/* Title */}
                        <div className="mb-2">
                            <p className="font-semibold text-gray-600 mb-1">Title:</p>
                            <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-gray-800">
                                {usabilityTesting.title}
                            </div>
                        </div>

                        {/* Task */}
                        <div className="mb-4">
                            <p className="font-semibold text-gray-600 mb-1">Tasks:</p>
                            <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-gray-800">
                                {Array.isArray(usabilityTesting.task) && usabilityTesting.task.length > 0 ? (
                                <ol className="list-decimal list-inside space-y-1">
                                    {usabilityTesting.task.map((step, index) => (
                                    <li key={index}>{step}</li>
                                    ))}
                                </ol>
                                ) : (
                                <p className="text-gray-500 italic">No tasks available</p>
                                )}
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="mb-2">
                            <p className="font-semibold text-gray-600 mb-1">Duration:</p>
                            <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-gray-800">
                                {usabilityTesting.duration} minutes
                            </div>
                        </div>

                        {/* Website */}
                        {usabilityTesting.website_link && (
                            <div className="mb-2">
                                <p className="font-semibold text-gray-600 mb-1">Website:</p>
                                <a
                                    href={usabilityTesting.website_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-blue-600 hover:underline break-words"
                                >
                                    {usabilityTesting.website_link}
                                </a>
                            </div>
                        )}

                        {/* Figma */}
                        {usabilityTesting.figma_embed_code && (
                            <div className="mb-2">
                                <p className="font-semibold text-gray-600 mb-1">Figma Embed Code:</p>
                                <div className="block bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-blue-600 hover:underline break-words">
                                    {usabilityTesting.figma_embed_code}
                                </div>
                            </div>
                        )}

                        {/* No data fallback */}
                        {!usabilityTesting.website_link && !usabilityTesting.figma_embed_code && (
                            <p className="text-red-500 font-medium">
                                No website link or prototype embed code available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestingInfo;

