// AddCriteriaForm.jsx
import React from 'react';
import {X} from "lucide-react"; 

const AddCriteriaForm = ({ tempSelectedCriteria, handleCheckboxChange, confirmCriteria, setShowAddCriteriaModal }) => {
    return (
        <div className="font-funnel fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative">

                {/* Title and Close Button Section */}
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
                    <h2 className="font-semibold font-funnel text-lg">Add Project Criteria</h2>
                    <button
                        className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
                        onClick={() => setShowAddCriteriaModal(false)}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300"></div>

                <div className="bg-white w-full p-6">
                    {/* Gender */}
                    <div className="mb-4">
                        <h3 className="font-medium">Gender</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Male", "Female", "Other", "Prefer not to say"].map((option) => (
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
                    <div className="flex justify-end">
                        <button
                            className="bg-[#C4BDED] text-black py-2 px-4 rounded-lg hover:bg-[#ACA3E3] mt-4"
                            onClick={confirmCriteria}
                        >
                            Confirm
                        </button>
                    </div>
                    
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300"></div>

                {/* Bottom and Close Button Section */}
                <div className="flex items-center font-funnel justify-between p-3 bg-gray-100 rounded-b-lg relative">
                    <h2 className="font-semibold text-base">Koalytics</h2>
                </div>

            </div>
        </div>
    );
};

export default AddCriteriaForm;

