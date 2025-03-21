import React, { useState } from 'react';

const MultiPointProgressBar = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [1, 2, 3];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center">
                {steps.map((step, index) => (
                <React.Fragment key={step}>
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            currentStep >= step ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                    >
                    {step}
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`w-20 h-1 ${
                            currentStep > step ? 'bg-blue-500' : 'bg-gray-400'
                            }`}
                        ></div>
                    )}
                </React.Fragment>
                ))}
            </div>

            <div className="mt-8">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="px-4 py-2 mr-4 text-white bg-blue-500 rounded disabled:bg-gray-400"
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length}
                    className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
                >
                 Next
                </button>
            </div>
        </div>
    );
};

export default MultiPointProgressBar;