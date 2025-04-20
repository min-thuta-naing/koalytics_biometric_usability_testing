import { useState } from "react";
import { X } from "lucide-react";

const ChooseProjectCategory = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> 
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full relative flex flex-col">
                {/* Title and Close Button Section */}
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
                    <h2 className="font-semibold font-funnel text-lg">Create a New SUS Form </h2>
                    {!isSubmitted && ( // Only show close button if not on thank you page
                        <button
                            onClick={onClose}
                            className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300"></div>

                <div className="bg-white p-8 w-full h-[400px] overflow-y-auto">

                    
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

export default ChooseProjectCategory; 