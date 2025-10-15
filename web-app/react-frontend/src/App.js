import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/SignupPage";
import './index.css'; 
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/Participant/HomePage";
import SideandTopBar from "./components/SideandTopBar";
import MyAccount from "./pages/auth/MyAccount";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
import Question1 from "./pages/auth/Question1";
import Question2 from "./pages/auth/Question2";
import Question3 from "./pages/auth/Question3";
import Question4 from "./pages/auth/Question4";
import Question5 from "./pages/auth/Question5";
import LoginPage from "./pages/auth/LoginPage";
import NewProjectPage from "./pages/Researcher/Project/CreateProjects";
import ProjectDashboard from "./pages/Researcher/Project/ProjectDashboard";
import FormDetail from "./pages/SUSform/FormDetail";
import CreateQuestions from "./pages/SUSform/CreateQuestions";
import CreateSUSQuestion from "./pages/SUSform/CreateSUSQuestion";
import ViewResults from "./pages/SUSform/ViewResults";
import Guide from "./pages/Guide";
import DetailedEmotion from "./pages/Researcher/Project/UsabilityTest/DetailedEmotion";
import AnswerForm from "./pages/Participant/AnswerForms";
import ChooseTest from "./pages/Participant/ChooseTest";
import UsabilityTestingDetail from "./pages/Researcher/Project/UsabilityTest/UsabilityTestingHeader";
import TestInfo from "./pages/Participant/TestInfo";
import CalibrationPopUp from "./pages/Participant/UsabilityTestingCallibration/CalibrationPopUp";
import TempoFacial from "./pages/Participant/TempoFacial";
import BrowserInBrowser from "./pages/Participant/BrowserInBrowser";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="*" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="loginpage" element={<LoginPage/>}/>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/new-project" element={<NewProjectPage />} />
        <Route path="/create" element={<CreateQuestions/>}/>
        <Route path="/create-susque" element={<CreateSUSQuestion/>}/>
        <Route path="/guide" element={<Guide/>}/>
        <Route path="/results" element={<ViewResults/>}/>
        <Route path="/project/:projectId" element={<ProjectDashboard />} />
        <Route path="/researcher-dashboard" element={<SideandTopBar />} />
        <Route path="/form/:formId" element={<FormDetail />} />
        <Route path="/usability_testing/:usabilityTestingId" element={<UsabilityTestingDetail />} />
        <Route path="/all-project/:projectId" element={<ChooseTest />} />
        <Route path="/related-form/:formId/:projectId" element={<AnswerForm />} />
        <Route path="/related-usability-testing/:usabilityTestingId" element={<TestInfo/>}/>
        <Route path="/calibration-pop-up" element={<CalibrationPopUp/>}/> 
        <Route path="/usability-testing/:usabilityTestingId/emotion-details" element={<DetailedEmotion />} />
        <Route path="/question1" element={<Question1 />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/question3" element={<Question3 />} />
        <Route path="/question4" element={<Question4 />} />
        <Route path="/question5" element={<Question5 />} />

        {/* temporary page */}
        <Route path="/facial" element={<TempoFacial />} />
        <Route path="/browser-in-browser" element={<BrowserInBrowser/>}/>
      </Routes>
    </Router>
  );
}

export default App;
