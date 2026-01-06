import React from "react"

export default function Certifications() {
  const achievements = [
    {
      title: "BSIT Student – Cebu Technological University",
      issuer: "CTU Ginatilan Extension Campus",
      year: "Present",
      icon: "🎓",
    },
    {
      title: "Full-Stack Web Development Projects",
      issuer: "Personal & Academic Projects",
      year: "2024 – 2025",
      icon: "💻",
    },
    {
      title: "Graphic Design using Adobe Photoshop & Illustrator",
      issuer: "Self-Taught / Project-Based Learning",
      year: "2023 – 2025",
      icon: "🎨",
    },
    {
      title: "Video Editing using Adobe Premiere Pro",
      issuer: "Creative Projects & Content Editing",
      year: "2023 – 2025",
      icon: "🎬",
    },
    {
      title: "POS System & API Development",
      issuer: "School & Personal Projects",
      year: "2024 – 2025",
      icon: "🧾",
    },
    {
      title: "UI/UX Design & Responsive Layouts",
      issuer: "Web Projects & Practice",
      year: "2024 – 2025",
      icon: "📱",
    },
  ]

  return (
    <section style={{ marginBottom: 80 }}>
      <h2
        style={{
          fontSize: "2.2rem",
          marginBottom: 30,
          fontWeight: "800",
          color: "#0f172a",
        }}
      >
        Certifications & Achievements
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {achievements.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              borderRadius: 14,
              padding: 26,
              color: "#e5e7eb",
              boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
              transition: "all 0.3s ease",
              cursor: "default",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)"
              e.currentTarget.style.boxShadow =
                "0 20px 40px rgba(99,102,241,0.35)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow =
                "0 15px 30px rgba(0,0,0,0.25)"
            }}
          >
            <div
              style={{
                fontSize: "2.4rem",
                marginBottom: 14,
              }}
            >
              {item.icon}
            </div>

            <h3
              style={{
                margin: "0 0 8px 0",
                fontWeight: "700",
                fontSize: "1.05rem",
                color: "#ffffff",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                margin: "0 0 6px 0",
                color: "#a5b4fc",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              {item.issuer}
            </p>

            <p
              style={{
                margin: 0,
                color: "#9ca3af",
                fontSize: "0.85rem",
              }}
            >
              {item.year}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
