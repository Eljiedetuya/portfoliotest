export default function ProjectCard({ title, desc, tech, link }) {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm my-2">{desc}</p>
      <p className="text-xs text-gray-500">Tech: {tech}</p>
      <a href={link} target="_blank" className="text-blue-500 mt-2 inline-block">View Project</a>
    </div>
  );
}
