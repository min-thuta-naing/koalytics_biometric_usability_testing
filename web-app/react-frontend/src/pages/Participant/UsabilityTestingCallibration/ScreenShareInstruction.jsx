import React from 'react';

const ScreenShareInstruction = () => {
    return (
        <div className="w-[520px] max-w-full mx-auto">
            <video
                className="w-full rounded-md shadow-md"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/static/videos/screenshare_guide.mov" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default ScreenShareInstruction;
