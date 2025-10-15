const BIBPreview = ({ usabilityTesting }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-grow overflow-y-auto">
                <div className="mx-80 my-20 px-32">
                    {/* Display Website Preview */}
                    {usabilityTesting.website_link && (
                        <div>
                            <p className="font-funnel mb-4">
                                Website:{" "}
                                <a
                                    href={usabilityTesting.website_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    {usabilityTesting.website_link}
                                </a>
                            </p>
                            <iframe
                                src={usabilityTesting.website_link}
                                title="Website Preview"
                                className="w-full h-[600px] border rounded"
                            />
                        </div>
                    )}

                    {/* Display Figma Prototype Preview */}
                    {usabilityTesting.figma_embed_code && (
                        <div>
                            <p className="font-funnel mb-4">
                                Prototype:
                            </p>
                            <iframe
                                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                                className="w-full h-[600px]"
                                src={`https://www.figma.com/embed?embed_host=share&url=${usabilityTesting.figma_embed_code}`}
                                allowFullScreen
                                title="Figma Prototype"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BIBPreview;
