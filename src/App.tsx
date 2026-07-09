import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import './App.css';

function LegacyArticleRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/${slug}` : '/'} replace />;
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learning-hub" element={<Navigate to="/" replace />} />
        <Route path="/learning-hub/:slug" element={<LegacyArticleRedirect />} />
        <Route path="/:slug" element={<ArticlePage />} />
      </Routes>
    </div>
  );
}

export default App;
