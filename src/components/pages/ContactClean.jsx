import React from "react"

export default function Contact() {
  return (
    <section id="contact" style={{ marginBottom: 100 }}>
      <h2
        style={{
          fontSize: "2.2rem",
          marginBottom: 24,
          fontWeight: "800",
          color: "#0f172a",
        }}
      >
        Contact Me
      </h2>

      <p
        style={{
          maxWidth: 700,
          color: "#334155",
          lineHeight: 1.8,
          marginBottom: 32,
        }}
      >
        I’m open to collaboration, freelance projects, school projects, and
        junior-level opportunities. If you’re interested in working together or
        have any questions, feel free to reach out.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {/* Email */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            padding: 28,
            borderRadius: 16,
            color: "#e5e7eb",
            boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#a5b4fc" }}>📧 Email</h3>
          <p style={{ margin: 0, lineHeight: 1.7 }}>eljiedetuya@gmail.com</p>
        </div>

        {/* Facebook */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            padding: 28,
            borderRadius: 16,
            color: "#e5e7eb",
            boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#a5b4fc" }}>📘 Facebook</h3>
          <p style={{ margin: 0, lineHeight: 1.7 }}>facebook.com/eljie.detuya</p>
        </div>

        {/* GitHub */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            padding: 28,
            borderRadius: 16,
            color: "#e5e7eb",
            boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#a5b4fc" }}>💻 GitHub</h3>
          <p style={{ margin: 0, lineHeight: 1.7 }}>github.com/Eljiedetuya</p>
        </div>
      </div>
    </section>
  )
}
