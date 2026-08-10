import { ProjectCard } from "../componenets/ProjectCard";

const projects = [
  {
    id: 3,
    created_at: "2026-08-06T17:01:21.31062+00:00",
    title: "EPG Collector API",
    descr:
      "Dieses Projekt erfasst TV-Daten von einer Website und stellt sie als JSON-Schnittstelle (API) zur Verfügung. Entwickelt mit Express, Playwright und Cheerio, nutzt die Anwendung Caching, um unnötige Anfragen zu vermeiden.",
    img: "https://imuizdkqtklnuihiogdp.supabase.co/storage/v1/object/sign/images/data2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZTMxMDFmMy1mMTg3LTQ0MTMtYWRkZC1jYmU0NTI0MGJlMTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvZGF0YTIuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NjI1ODkzMCwiZXhwIjoxODE3Nzk0OTMwfQ.Mrv8b5FhWVeJWvc8kS8LXQtVnKvmNKJj9eWSgNXWMys",
    tags: [
      "Node.js",
      "Express",
      "TypeScript",
      "CORS",
      "Playwright",
      "Cheerio",
      "Docker",
    ],
    code: "https://github.com/milty90/tv-scraper",
    live: "denied",
    desc: null,
  },
  {
    id: 6,
    created_at: "2026-08-06T17:01:21.31062+00:00",
    title: "Dev _Board",
    descr:
      "DevBoard ist ein kompaktes Projektmanagement-Tool auf Basis von React, TypeScript, Tailwind CSS und shadcn/ui. Es bietet eine intuitive Drag-and-Drop Oberfläche.",
    img: "https://imuizdkqtklnuihiogdp.supabase.co/storage/v1/object/sign/images/devboard.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZTMxMDFmMy1mMTg3LTQ0MTMtYWRkZC1jYmU0NTI0MGJlMTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvZGV2Ym9hcmQuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NjI1ODk4MCwiZXhwIjoxODE3Nzk0OTgwfQ.D4ldNnbmsAyJH4fNIEII6pdLvcZp6tgIWDF62SL9GtI",
    tags: ["React", "Tailwind CSS", "TypeScript", "Shadcn UI", "Drag and Drop"],
    code: "https://github.com/milty90/spark-kvp-management",
    live: "https://devboard-7vsd.onrender.com/boards",
    desc: null,
  },
  {
    id: 2,
    created_at: "2026-08-06T17:01:21.31062+00:00",
    title: "Webseite Mamma Mia",
    descr:
      "Eine responsive Webseite für das Restaurant Mamma Mia, erstellt mit HTML5 und CSS3. Inklusive moderner Layouts, Animationen.",
    img: "https://imuizdkqtklnuihiogdp.supabase.co/storage/v1/object/sign/images/project_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZTMxMDFmMy1mMTg3LTQ0MTMtYWRkZC1jYmU0NTI0MGJlMTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcHJvamVjdF8xLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODYyNTkwMjYsImV4cCI6MTgxNzc5NTAyNn0.u7bhjyneBdYegzHmez9KsEE0GFMPWJkxhCNO8bLKKco",
    tags: ["HTML5", "CSS3", "Responsive Design"],
    code: "https://github.com/milty90/The-Restaurant-Project",
    live: "https://the-restaurant-project.onrender.com/",
    desc: null,
  },
  {
    id: 1,
    created_at: "2026-08-06T17:01:21.31062+00:00",
    title: "Spark KVP Management",
    descr:
      "Spark ist die digitale KVP-Lösung zum Erfassen, Strukturieren und Nachverfolgen von Verbesserungsideen. Für ein transparentes und kontinuierliches Ideenmanagement im Arbeitsalltag.",
    img: "https://imuizdkqtklnuihiogdp.supabase.co/storage/v1/object/sign/images/spark.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZTMxMDFmMy1mMTg3LTQ0MTMtYWRkZC1jYmU0NTI0MGJlMTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvc3BhcmsucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NjI1OTA0NiwiZXhwIjoxODE3Nzk1MDQ2fQ.o3B3cg9KianQAykosaEABWCcoXveg62HQGSbSpbOWhE",
    tags: ["React", "Tailwind CSS", "TypeScript", "Vite", "Supabase"],
    code: "https://github.com/milty90/kvp-management-main",
    live: "https://pdcamanagement.com",
    desc: null,
  },
  {
    id: 4,
    created_at: "2026-08-06T17:01:21.31062+00:00",
    title: "Tv now",
    descr:
      "TV Now nutzt die EPG Collector API, um Fernsehdaten übersichtlich darzustellen. Ermöglicht Nutzern den schnellen Zugriff auf das aktuelle und nachfolgende TV-Programm.",
    img: "https://imuizdkqtklnuihiogdp.supabase.co/storage/v1/object/sign/images/tvnow.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZTMxMDFmMy1mMTg3LTQ0MTMtYWRkZC1jYmU0NTI0MGJlMTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvdHZub3cucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NjI1OTA2NSwiZXhwIjoxODE3Nzk1MDY1fQ.AtTr5XOUrNbYQR1eLfIHryu1sKbLW1nk521huD4bArM",
    tags: ["React", "SCSS", "JavaScript", "API"],
    code: "https://github.com/milty90/my-tv-app-master",
    live: "https://tv-now.com",
    desc: null,
  },
  {
    id: 5,
    created_at: "2026-08-06T17:01:21.31062+00:00",
    title: "Wetter App",
    descr:
      "Eine moderne Wetter-App auf Basis von Vanilla JS, HTML und SCSS, die aktuelle Wetterdaten einer öffentlichen API verarbeitet. Sie sorgt für ein ansprechendes Layout und ein zeitgemäßes Design.",
    img: "https://imuizdkqtklnuihiogdp.supabase.co/storage/v1/object/sign/images/wetter.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hZTMxMDFmMy1mMTg3LTQ0MTMtYWRkZC1jYmU0NTI0MGJlMTEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvd2V0dGVyLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODYyNTkwNzksImV4cCI6MTgxNzc5NTA3OX0.XjrHA4l0ahiPPvVTcvd6ZonKJZR_vUWBxaHJSNBxJKA",
    tags: ["HTML5", "SCSS", "JavaScript", "Vite", "API", "BEM"],
    code: "https://github.com/milty90/wetter-app",
    live: "https://wetter-app-5zxj.onrender.com/",
    desc: null,
  },
];

export function ProjectsSection() {
  return (
    <section className="flex flex-col pt-10 gap-3">
      <div className="flex flex-row justify-between items-center gap-5">
        <p className=" uppercase pl-4 text-nowrap font-medium text-ink-soft tracking-wider mr-1 text-sm font-monospace">
          Projekte
        </p>
        <p className="flex flex-row items-center gap-2 cursor-pointer text-nowrap text-ink-soft tracking-wide mr-1 text-sm font-monospace">
          ↻ refresh
        </p>
        <div className="text-line border-b w-svw mr-4"></div>
      </div>
      <div className="bg-bg-alt border border-line rounded-2xl p-6 pb-4 justify-between items-center gap-5">
        <div className="flex flex-col divide-y divide-line/60 bp-6 justify-between items-center gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              position={index + 1}
              title={project.title}
              description={project.descr}
              tags={project.tags}
              imageUrl={project.img}
              githubUrl={project.code}
              liveDemoUrl={project.live}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
