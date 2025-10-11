const ResearcherGuideline = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Researcher User Guide</h1>

            <div className="max-w-3xl mx-auto">
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li>
                        Create a project for participants to test the usability of a
                        <strong> website</strong> or a <strong>Figma prototype</strong>.
                    </li>
                    <li>
                        Collaborate with other researchers by inviting them to work on projects.
                    </li>
                    <li>
                        Analyze and use the biometric and survey results to upgrade and improve
                        the overall <strong>User Experience (UX)</strong>.
                    </li>
                </ul>

                {/* Screenshot Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Sample Screenshots</h3>
                    <div className="space-y-4">
                        <div className="border rounded-lg p-3 text-center text-gray-500 bg-gray-100">
                            <p>Screenshot of project creation page here</p>
                        </div>
                        <div className="border rounded-lg p-3 text-center text-gray-500 bg-gray-100">
                            <p>Screenshot of project analytics page here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResearcherGuideline;