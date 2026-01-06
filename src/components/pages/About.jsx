import React from "react"

export default function About() {
  return (
    <section id="about" style={{ marginBottom: 80 }}>
      <h2
        style={{
          fontSize: "2.2rem",
          marginBottom: 24,
          fontWeight: "800",
          color: "#0f172a",
        }}
      >
        About Me
      </h2>

      <div style={{ maxWidth: 900 }}>
        <p
          style={{
            color: "#334155",
            lineHeight: 1.9,
            fontSize: "1rem",
            marginBottom: 20,
          }}
        >
          I am a Bachelor of Science in Information Technology (BSIT) student at
          Cebu Technological University – Ginatilan Extension Campus. I am
          passionate about building modern, functional, and user-friendly web
          applications that solve real-world problems.
        </p>

        <p
          style={{
            color: "#334155",
            lineHeight: 1.9,
            fontSize: "1rem",
            marginBottom: 20,
          }}
        >
          I work as a full-stack developer using technologies such as React,
          Node.js, and Django. I enjoy creating complete systems from frontend to
          backend, focusing on clean code, responsive design, and good user
          experience.
        </p>

        <p
          style={{
            color: "#334155",
            lineHeight: 1.9,
            fontSize: "1rem",
            marginBottom: 20,
          }}
        >
          In addition to programming, I also have strong creative skills in
          graphic design and video editing. I use Adobe tools such as Photoshop,
          Illustrator, and Premiere Pro to design visuals, edit videos, and
          create engaging digital content for projects and branding.
        </p>

        {/* Highlight Box */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: 14,
            padding: 28,
            marginTop: 30,
            color: "#e5e7eb",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          }}
        >
          <h3
            style={{
              margin: "0 0 16px 0",
              color: "#a5b4fc",
              fontWeight: "700",
              fontSize: "1.2rem",
            }}
          >
            Key Highlights
          </h3>

          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9 }}>
            <li>BSIT student at Cebu Technological University – Ginatilan Campus</li>
            <li>Full-stack web development using React, Node.js, and Django</li>
            <li>Experience building POS systems, APIs, and web applications</li>
            <li>Graphic design using Adobe Photoshop & Illustrator</li>
            <li>Video editing using Adobe Premiere Pro</li>
            <li>Strong focus on clean UI, usability, and visual presentation</li>
          </ul>
        </div>

        <p
          style={{
            color: "#334155",
            lineHeight: 1.9,
            fontSize: "1rem",
            marginTop: 30,
          }}
        >
          I enjoy learning by building real projects and improving my skills in
          both development and creative design. My goal is to become a
          well-rounded professional who can create digital products that not
          only work well but also look great.
        </p>
      </div>
    </section>
  )
}
