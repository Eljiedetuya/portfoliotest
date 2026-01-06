import React from "react"

export default function Projects() {
  const projects = [
    {
      title: "POS System (Point of Sale)",
      description:
        "A full-stack POS system built for managing products, sales, customers, and transactions. Designed for real-world usage with clean UI and structured backend logic.",
      tech: ["React", "Node.js", "Django", "MySQL"],
      icon: "🧾",
    },
    {
      title: "Student Organizational Fee Management System",
      description:
        "A mobile and web-based system for managing student fees and records. Built using Django REST API for the backend and Flutter for the mobile frontend.",
      tech: ["Django REST", "Flutter", "MySQL", "API"],
      icon: "🎓",
    },
    {
      title: "Personal Portfolio Website",
      description:
        "A modern, responsive portfolio website built with React. Designed to showcase my development projects, creative work, and technical skills.",
      tech: ["React", "Vite", "CSS", "Responsive Design"],
      icon: "🌐",
    },
    {
      title: "Graphic Design Projects",
      description:
        "A collection of graphic design works including posters, banners, and social media visuals created using Adobe Photoshop and Illustrator.",
      tech: ["Photoshop", "Illustrator", "Design"],
      icon: "🎨",
    },
    {
      title: "Video Editing Projects",
      description:
        "Edited short-form and long-form videos for digital content using Adobe Premiere Pro. Focused on clean cuts, transitions, and visual storytelling.",
      tech: ["Premiere Pro", "Video Editing", "Media"],
      icon: "🎬",
    },
    {
      title: "Web API & CRUD Applications",
      description:
        "Developed multiple CRUD-based web applications and APIs for practice and school projects, focusing on clean architecture and data handling.",
      tech: ["Node.js", "Django", "REST API", "CRUD"],
      icon: "🔧",
    },
  ]

  return (
    <section style={{ marginBottom: 90 }}>
      <h2
        style={{
          fontSize: "2.2rem",
          marginBottom: 30,
          fontWeight: "800",
          color: "#0f172a",
        }}
      >
        Featured Projects
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 26,
        }}
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              borderRadius: 16,
              padding: 28,
              color: "#e5e7eb",
              boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)"
              e.currentTarget.style.boxShadow =
                "0 25px 50px rgba(99,102,241,0.35)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow =
                "0 18px 40px rgba(0,0,0,0.25)"
            }}
          >
            {/* Icon */}
            <div style={{ fontSize: "2.4rem", marginBottom: 14 }}>
              {project.icon}
            </div>

            {/* Title */}
            <h3
              style={{
                margin: "0 0 10px 0",
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              style={{
                color: "#cbd5f5",
                lineHeight: 1.7,
                fontSize: "0.95rem",
                marginBottom: 16,
                flex: 1,
              }}
            >
              {project.description}
            </p>

            {/* Tech Stack */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 10,
              }}
            >
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "5px 12px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 20,
                    fontSize: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#e5e7eb",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
