import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "@/components/sections/home-page"
import { ProjectPage } from "@/components/sections/project-page"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
