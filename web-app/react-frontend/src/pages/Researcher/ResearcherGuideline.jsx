const ResearcherGuideline = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold mb-4">📝 Researcher Guideline</h1>

      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>Create New Project</strong>
          <ul className="list-disc list-inside ml-5">
            <li>Click the <b>Create New Project</b> button.</li>
            <li>Fill in project details:
              <ul className="list-disc list-inside ml-5">
                <li>Project Name</li>
                <li>Description</li>
                <li>Category</li>
                <li>Organization</li>
                <li>Number of Participants</li>
                <li>Start Date & End Date</li>
                <li>Side Notes</li>
              </ul>
            </li>
          </ul>
        </li>

        <li>
          <strong>Consent Form</strong>
          <ul className="list-disc list-inside ml-5">
            <li>Click <b>Next</b> after project details.</li>
            <li>Edit the Consent Form as needed.</li>
          </ul>
        </li>

        <li>
          <strong>Cover Photo</strong>
          <ul className="list-disc list-inside ml-5">
            <li>Upload or choose a cover photo.</li>
            <li>Submit → see success message.</li>
            <li>Your project will now appear in the <b>Dashboard</b>.</li>
          </ul>
        </li>

        <li>
          <strong>Dashboard Sections</strong>
          <ul className="list-disc list-inside ml-5">
            <li><b>Project Overview</b> → Shows basic project details.</li>
            <li><b>Project Criteria</b> → Add participant requirements (gender, age group, interests).</li>
            <li><b>SUS Questionnaire</b> → Edit usability survey questions.</li>
            <li><b>Create Usability Testing</b> → Add Figma prototype or website link.</li>
          </ul>
        </li>

        <li>
          <strong>Publish Project</strong>
          <ul className="list-disc list-inside ml-5">
            <li>Click <b>Publish</b> when ready.</li>
            <li>Participants can now view the project.</li>
          </ul>
        </li>

        <li>
          <strong>Collaboration</strong>
          <ul className="list-disc list-inside ml-5">
            <li>Search and invite researchers by email.</li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default ResearcherGuideline;
