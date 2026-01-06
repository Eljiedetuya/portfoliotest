import React from "react"

export default function Footer() {
  const socials = [
    { icon: "📄", label: "Resume", url: "#" },
    { icon: "💻", label: "GitHub", url: "https://github.com/Eljiedetuya" },
    { icon: "📷", label: "Instagram", url: "https://instagram.com" },
    { icon: "✉️", label: "Gmail", url: "mailto:eljie.magaso@example.com" },
    { icon: "💼", label: "LinkedIn", url: "https://linkedin.com" },
    { icon: "👍", label: "Facebook", url: "https://facebook.com" },
    { icon: "💬", label: "WhatsApp", url: "https://wa.me/1234567890" }
  ]

  return (
    <footer
      style={{
        marginTop: 80,
        padding: "50px 20px 30px",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        textAlign: "center",
        color: "#e5e7eb"
      }}
    >
      {/* Social Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 18,
          flexWrap: "wrap",
          marginBottom: 24
        }}
      >
        {socials.map((social, idx) => (
          <a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.label}
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.08)",
              color: "#e5e7eb",
              textDecoration: "none",
              fontSize: "1.2rem",
              transition: "all 0.25s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              backdropFilter: "blur(6px)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #667eea, #764ba2)"
              e.currentTarget.style.transform = "translateY(-4px) scale(1.05)"
              e.currentTarget.style.boxShadow =
                "0 10px 24px rgba(102,126,234,0.5)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)"
              e.currentTarget.style.transform = "translateY(0) scale(1)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)"
            }}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          height: 1,
          margin: "0 auto 20px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
        }}
      />

      {/* Copyright */}
      <p
        style={{
          color: "#626d7cff",
          fontSize: "0.85rem",
          margin: 0,
          letterSpacing: "0.3px"
        }}
      >
        © 2025 <span style={{ color: "#e5e7eb", fontWeight: 600 }}>Eljie Magaso</span>. All rights reserved.
      </p>

      {/* Sub text */}
      <p
        style={{
          marginTop: 6,
          color: "#64748b",
          fontSize: "0.75rem"
        }}
      >
        Built with passion • Design • Code • Creativity
      </p>
    </footer>
  )
}
