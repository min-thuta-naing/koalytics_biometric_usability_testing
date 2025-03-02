// AddCriteriaForm.jsx
import React from 'react';

const AddCriteriaForm = ({ tempSelectedCriteria, handleCheckboxChange, confirmCriteria, setShowAddCriteriaModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full relative">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowAddCriteriaModal(false)}
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-6">Add Project Criteria</h2>
                
                {/* Gender */}
                <div className="mb-4">
                    <h3 className="font-medium">Gender</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Male", "Female", "Non-binary", "Prefer not to say"].map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={tempSelectedCriteria.gender.includes(option)}
                                    onChange={() => handleCheckboxChange("gender", option)}
                                    className="form-checkbox h-4 w-4 text-teal-600"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Age Group */}
                <div className="mb-4">
                    <h3 className="font-medium">Age Group</h3>
                    <div className="flex flex-wrap gap-2">
                        {["18-24", "25-34", "35-44", "45+"].map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={tempSelectedCriteria.ageGroup.includes(option)}
                                    onChange={() => handleCheckboxChange("ageGroup", option)}
                                    className="form-checkbox h-4 w-4 text-teal-600"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Interest */}
                <div className="mb-4">
                    <h3 className="font-medium">Interest</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Sports and Fitness", "Music and Performing Arts", "Reading and Writing", "Outdoor Activities", "Technology and Gaming", "Cooking and Baking", "Travel and Adventure"].map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={tempSelectedCriteria.interest.includes(option)}
                                    onChange={() => handleCheckboxChange("interest", option)}
                                    className="form-checkbox h-4 w-4 text-teal-600"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Confirm Button */}
                <button
                    className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 mt-4"
                    onClick={confirmCriteria}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default AddCriteriaForm;

