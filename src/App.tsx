import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "@/components/sections/home-page"
import { ProjectPage } from "@/components/sections/project-page"
import { Cursor } from "@/components/cursor"
import { ScrollToTop } from "@/components/scroll-to-top"

export function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
