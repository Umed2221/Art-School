import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import FeaturedLessons from './components/FeaturedLessons';
import LessonCatalog from './components/LessonCatalog';
import Teachers from './components/Teachers';
import Materials from './components/Materials';
import Auth from './pages/Auth';
import LessonDetail from './pages/LessonDetail';
import Premium from './pages/Premium';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FeaturedLessons />
        <LessonCatalog />
        <Teachers />
        <Materials />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/lesson/:id" element={<LessonDetail />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </Router>
  );
}

export default App;
