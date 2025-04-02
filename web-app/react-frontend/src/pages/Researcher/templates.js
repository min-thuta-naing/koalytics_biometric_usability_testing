// src/templates/templates.js
export const consentTemplates = {
    biometric: `
      <h2>Subject: Consent for Participation in Biometric Usability Testing</h2>
      <p>Dear Participant,</p>
      <p>We invite you to take part in a biometric usability testing study conducted by [Your Organization/Institution Name]. The purpose of this study is to analyze facial emotion data and video recordings to improve usability and user experience in [describe application or purpose, e.g., human-computer interaction, AI model training, etc.].</p>
  
      <h3>Your Rights and Voluntary Participation</h3>
      <ul>
        <li>Your participation is entirely voluntary, and you may withdraw from the study at any time without any consequences.</li>
        <li>You have the right to request the deletion of your recorded data at any stage before the study concludes.</li>
        <li>You may ask questions about the study at any time by contacting [Researcher's Name and Contact Information].</li>
      </ul>
  
      <h3>Confidentiality and Data Protection</h3>
      <ul>
        <li>All collected data will be stored in encrypted and password-protected systems.</li>
        <li>Facial emotion data and video recordings will be anonymized where possible and used only for the stated research purposes.</li>
        <li>Your identity will not be disclosed in any reports, publications, or presentations.</li>
      </ul>
  
      <h3>Consent Statement</h3>
      <p>By signing this consent form, you acknowledge that:</p>
      <ul>
        <li>You have read and understood the purpose and procedures of this study.</li>
        <li>You voluntarily agree to participate and allow the collection of your facial emotion data and video recordings.</li>
        <li>You understand that you may withdraw at any time without penalty.</li>
      </ul>
    `,
    
    // Add more templates as needed
    medical: `
      <h2>Medical Research Consent Form</h2>
      <p>[Your template here]</p>
    `
  };
  
  // Helper function to clean template whitespace
  export const getConsentTemplate = (templateName) => {
    return consentTemplates[templateName]?.replace(/\n\s+/g, '') || '';
  };