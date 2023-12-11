
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Login from './components/Login'
import QuizForm from './components/QuizForm';
import AddQuestion from './components/AddQuestion';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Album from './components/QuizList';
import AddQuest from './components/AddQuest';
// import StudentDashboard from './components/StudentDashboard';
import StudentDashboard1 from './components/StudentDashboard';
import Dashboard1 from './components/StudentDashboard';
import Quiz from './components/Quiz';
import QuizIns from './components/quizIns';
import Leaderboard from './components/Leaderboard';
import "./App.css"

function App() {
  return ( 

   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Home></Home>}></Route>
    <Route path='/admin' element={<Admin></Admin>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
    <Route path='/quiz' element={<QuizForm></QuizForm>}></Route>
    <Route path='/ques' element={<AddQuest></AddQuest>}></Route>
    <Route path='/trainer' element={<Dashboard></Dashboard>}></Route>
    <Route path='/quizlist' element={<Album></Album>}></Route>
    <Route path='/studentDashboard1' element={<StudentDashboard1 />} />
    <Route path='/quiz/student/questionPaper/:id' element={<Quiz />} />
    <Route path='/ins/:id' element={<QuizIns />} />
    <Route path='/leaderboard' element={<Leaderboard />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
