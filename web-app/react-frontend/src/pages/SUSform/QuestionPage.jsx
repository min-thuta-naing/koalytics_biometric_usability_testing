import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuestionPage = () => {
    const { formId } = useParams();
    const [form, setForm] = useState(null);
    const [formTitle, setFormTitle] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                // Ensure the correct endpoint
                const response = await fetch(`http://127.0.0.1:8000/api/project/${formId}/forms`);
                
                // Set form data if successful
                setForm(response.data);
            } catch (error) {
                console.error("Error fetching form:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [formId]);

    if (loading) return <p>Loading form...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold">{form.title}</h1>
            <p>Form ID: {formId}</p>
            {form && (
                <div>
                    <p><strong>Title:</strong> {form.title}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionPage;