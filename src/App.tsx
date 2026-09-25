import { Routes, Route } from "react-router-dom";
import { CinematicHome } from "./screens/MacbookPro/CinematicHome";
import { ModernActor } from "./screens/MacbookPro/ModernActor";
import { ModernAuthor } from "./screens/MacbookPro/ModernAuthor";
import { Professor } from "./screens/MacbookPro/Professor";
import { Courses } from "./screens/MacbookPro/Courses";
import { Contact } from "./screens/MacbookPro/Contact";
import { NotFound } from "./screens/MacbookPro/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<CinematicHome />} />
        <Route path="/actor" element={<ModernActor />} />
        <Route path="/author" element={<ModernAuthor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
