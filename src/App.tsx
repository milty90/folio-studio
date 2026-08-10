import { FormSection } from "./ui/layout/FormSection";
import { ProjectsSection } from "./ui/layout/ProjectsSection";
import Header from "./ui/layout/Header";

function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-start min-h-screen bg-bg/30 text-ink">
        <div className="flex flex-col gap-5 w-full max-w-(--maxw) px-7 pb-10">
          <FormSection />
          <ProjectsSection />
        </div>
      </main>
    </>
  );
}

export default App;
