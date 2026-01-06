import React from "react"

export default function Skills() {
  const skillGroups = [
    {
      title: "Development",
      skills: ["React", "Node.js", "Django", "JavaScript", "Python", "MySQL", "REST API"],
      icon: "💻",
    },
    {
      title: "Design",
      skills: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "UI/UX Design"],
      icon: "🎨",
    },
    {
      title: "Video Editing",
      skills: ["Adobe Premiere Pro", "Video Editing", "Content Editing"],
      icon: "🎬",
    },
    {
      title: "Tools & Others",
      skills: ["Git", "GitHub", "VS Code", "Flutter", "Vite"],
      icon: "🛠️",
    },
  ]

  return (
    <section id="skills" style={{ marginBottom: 90 }}>
      <h2
        style={{
          fontSize: "2.2rem",
          marginBottom: 30,
          fontWeight: "800",
          color: "#0f172a",
        }}
      >
        Skills
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 26,
        }}
      >
        {skillGroups.map((group, idx) => (
          <div
            key={idx}
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              borderRadius: 16,
              padding: 28,
              color: "#e5e7eb",
              boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>{group.icon}</div>

            <h3
              style={{
                margin: "0 0 14px 0",
                fontWeight: "700",
                color: "#a5b4fc",
              }}
            >
              {group.title}
            </h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "6px 14px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 20,
                    fontSize: "0.8rem",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
