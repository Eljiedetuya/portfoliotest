import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Chatbot from "../components/Chatbot";

export default function Home() {
  const projects = [
    { title: "ThinkOfATitle", desc: "AI-powered title generator", tech: "React, Node.js", link: "#" },
    { title: "Bilis Delivery", desc: "Delivery web app", tech: "React, Firebase", link: "#" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="p-8">
        <section id="about" className="my-8">
          <h2 className="text-2xl font-bold">About Me</h2>
          <p className="mt-2">I’m a web developer building interactive AI-powered projects.</p>
        </section>
        <section id="projects" className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, idx) => <ProjectCard key={idx} {...p} />)}
        </section>
      </main>
      <Chatbot />
    </div>
  );
}
