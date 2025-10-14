import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#F0EEED] min-h-screen flex flex-col items-center justify-center px-6 py-16 font-funnel">
            <HeaderBar />
            <div className="max-w-4xl text-center">
                <img
                    src="/static/images/logo.png"
                    alt="Logo"
                    className="h-14 w-auto mx-auto mb-6"
                />

                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    About Koalytics
                </h1>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    Koalytics is a next-generation biometric usability testing platform
                    that bridges the gap between human experience and digital performance.
                    Our mission is to help researchers and designers understand users on
                    a deeper level through emotion recognition and behavioral insights.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    Built for both participants and researchers, Koalytics offers an
                    integrated environment for running usability studies with biometric
                    data such as facial expression. We combine traditional usability metrics 
                    with real-time emotional and physiological data to provide a 
                    more comprehensive picture of user experience.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                    Our vision is to empower UX researchers, educators, and developers to
                    design more empathetic, data-driven, and human-centered products. With
                    Koalytics, every interaction tells a story — and every emotion
                    matters.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;

