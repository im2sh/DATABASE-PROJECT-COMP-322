import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/intro/IntroPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ChangePasswordPage from "./pages/changePassword/ChangePasswordPage";
import WriteDiaryPage from "./pages/writediary/WriteDiaryPage";
import AddDiaryLocationPage from "./pages/addDiaryLocation/AddDiaryLocationPage";
import DiaryFeedPage from "./pages/diaryFeed/DiaryFeedPage";
import SearchPage from "./pages/search/SearchPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route
            path="/changePassword"
            element={<ChangePasswordPage />}
          ></Route>
          <Route path="/writeDiary" element={<WriteDiaryPage />} />
          <Route path="/addDiaryLocation" element={<AddDiaryLocationPage />} />
          <Route path="/diary" element={<DiaryFeedPage />} />
          <Route path="/diary/:placeId" element={<DiaryFeedPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
