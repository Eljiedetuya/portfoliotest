import React from "react"

export default function Hero() {
  return (
    <section id="home"
      style={{
        padding: "60px 40px",
        borderRadius: 16,
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "#ffffff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        marginBottom: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3.5rem",
            fontWeight: "bold",
            boxShadow: "0 10px 30px rgba(99,102,241,0.4)",
            flexShrink: 0,
          }}
        >
          EJ
        </div>

        {/* Info */}
        <div style={{ maxWidth: 700 }}>
          <h1 style={{ margin: 0, fontSize: "2.8rem", fontWeight: "800" }}>
            Hi, I’m Eljie Detuya 👋
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: "#a5b4fc",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            BSIT Student • Full-Stack Developer • Creative Designer
          </p>

          <p
            style={{
              marginTop: 16,
              lineHeight: 1.8,
              color: "#e5e7eb",
              fontSize: "1rem",
            }}
          >
            I’m a BSIT student at Cebu Technological University – Ginatilan Extension
            Campus with a strong passion for building modern web applications. I work
            with React, Node.js, and Django to create functional systems, and I also
            design visuals and edit videos using Adobe Photoshop, Illustrator, and
            Premiere Pro.
          </p>

          {/* Tech Stack */}
          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {[
              "React",
              "Node.js",
              "Django",
              "JavaScript",
              "Python",
              "Photoshop",
              "Illustrator",
              "Premiere Pro",
            ].map((item) => (
              <span
                key={item}
                style={{
                  padding: "6px 14px",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 20,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 15,
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:eljiedetuya@gmail.com"
              style={{
                padding: "12px 26px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)"
                e.target.style.boxShadow = "0 10px 25px rgba(99,102,241,0.4)"
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              📧 Contact Me
            </a>

            <a
              href="#projects"
              style={{
                padding: "12px 26px",
                background: "transparent",
                color: "#a5b4fc",
                border: "2px solid #6366f1",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#6366f1"
                e.target.style.color = "#fff"
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent"
                e.target.style.color = "#a5b4fc"
              }}
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
