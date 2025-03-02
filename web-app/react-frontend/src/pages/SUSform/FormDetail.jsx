import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FormDetail = () => {
  const { formId } = useParams(); // Get form ID from URL
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/forms/${formId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch form details.");
        }
        const data = await response.json();
        setForm(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFormDetails();
  }, [formId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!form) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Form Details</h2>
      <p><strong>Form ID:</strong> {form.id}</p>
      <p><strong>Title:</strong> {form.title}</p>
    </div>
  );
};

export default FormDetail;
