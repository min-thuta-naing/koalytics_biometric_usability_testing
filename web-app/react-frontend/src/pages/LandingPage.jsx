import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const useTypingEffect = (text = "", speed = 100) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText(""); // Reset before starting the animation
        if (!text) return; // Ensure text is not empty

        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.substring(0, index + 1)); // Avoids "undefined"
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return displayedText;
};

const images = [
    { src: "/images/ss1.png", alt: "Screenshot 1" },
    { src: "/images/ss2.png", alt: "Screenshot 2" },
    { src: "/images/ss3.png", alt: "Screenshot 3" } // Add more images if needed
];

const LandingPage = () => {
    const headline1 = useTypingEffect("Revolutionizing ", 200);
    const headline2 = useTypingEffect("Usability Testing ", 200);
    const headline3 = useTypingEffect("with Biometrics", 200);

    const [index, setIndex] = useState(0);

    const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white py-3 px-6 sticky top-0 z-10 flex justify-between items-center border-b border-gray-300">
                <div className="flex items-center gap-3">
                    <img src="/static/images/logo.png" alt="Logo" className="h-7 w-auto" />
                    <h1 className="font-funnel font-bold text-3xl text-black">Koalytics</h1>
                </div>
                <div className="flex gap-4">
                    {/* Login button now navigates to the login page */}
                    <Link to="/loginpage">
                    <button className="bg-transparent text-black text-sm px-4 py-2 rounded-lg border border-gray-400 rounded-full">
                        Log In
                    </button>
                </Link>

                    <Link to="/signup">
                        <button className="bg-violet-400 text-black text-sm px-4 py-2 rounded-lg hover:bg-violet-500 border border-gray-400 rounded-full">
                            Register
                        </button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto">
                <div className="bg-white flex flex-row items-center py-3 px-12 gap-10">
                    <div className="w-1/2">
                        <h1 className="font-funnel font-bold text-6xl mt-2">{headline1}</h1>
                        <h1 className="font-funnel font-bold text-6xl mt-2">{headline2}</h1>
                        <h1 className="font-funnel font-bold text-6xl mt-2">{headline3}</h1>
                        <p className="text-4xl text-gray-500 mt-4">
                            Gain deeper insights into user experience <br />
                            through emotion detection, respiratory rate, <br />
                            and heart rate monitoring.
                        </p>
                    </div>

                    <div className="w-1/2 flex justify-end">
                        <img src="/static/images/photo1.png" alt="Logo" className="h-auto w-auto" />
                    </div>
                </div>

                <div className="py-3 px-6 bg-gradient-to-b from-violet-100 via-white to-white">
                    <div className="h-10"></div>
                    <div className="flex flex-row items-center py-3 px-6 gap-10">
                        <div className="w-1/6 flex justify-center">
                            <img src="/static/images/1openquote.png" alt="quote" className="h-auto w-20" />
                        </div>
                        <div className="w-4/6 px-8">
                            <h1 className="text-2xl text-center ">
                                Koalytics is a remote usability testing platform that connects researchers and participants. 
                                Researchers can create SUS surveys and biometric usability tests, setting specific criteria to 
                                reach the right audience. Participants can explore available studies, contribute valuable insights, 
                                and earn points for their participation. Start shaping the future of user experience today!
                            </h1>
                        </div>
                        <div className="w-1/6 flex justify-center">
                            <img src="/static/images/1closequote.png" alt="quote" className="h-auto w-20" />
                        </div>
                    </div>
                    <div className="h-10"></div>
                    <div className="flex flex-row justify-center items-center py-3 px-6 gap-10">
                        <img src="/static/images/person1.png" alt="quote" className="h-auto w-20" />
                        <img src="/static/images/person2.png" alt="quote" className="h-auto w-20" />
                        <img src="/static/images/person3.png" alt="quote" className="h-auto w-20" />
                        <img src="/static/images/person4.png" alt="quote" className="h-auto w-20" />
                        <img src="/static/images/person5.png" alt="quote" className="h-auto w-20" />
                    </div>
                </div>
            </main>

            <footer className="text-black text-center py-6 bg-gradient-to-t from-violet-200 via-white to-white">
                <p>&copy; 2025 Koalytics</p>
            </footer>
        </div>
    );
};

export default LandingPage;
