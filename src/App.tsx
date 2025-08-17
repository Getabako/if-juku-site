import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { injectNavigationTransparency } from './styles/navigationOverride';

// ページコンポーネント
import HomePage from './pages/HomePage';
import BlogPost from './BlogPost';
import BlogList from './BlogList';
import MaterialsList from './MaterialsList';

const App: React.FC = () => {
  useEffect(() => {
    // Inject navigation transparency styles on app mount
    injectNavigationTransparency();
    
    // Re-inject after a delay to ensure it overrides any lazy-loaded styles
    setTimeout(() => {
      injectNavigationTransparency();
    }, 1000);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router basename="/if-juku-site">
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:category" element={<BlogList />} />
            <Route path="/materials" element={<MaterialsList />} />
            <Route path="/post/:id" element={<BlogPost />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;