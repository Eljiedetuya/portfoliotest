import React from "react"

export default function Navbar() {
  const links = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ]

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "#e5e7eb",
            letterSpacing: "0.5px",
            cursor: "pointer"
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#fff",
              boxShadow: "0 6px 16px rgba(102,126,234,0.5)"
            }}
          >
            EJ
          </span>
          Eljie Magaso
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: 26,
            alignItems: "center"
          }}
        >
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              style={{
                color: "#cbd5f5",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                position: "relative",
                padding: "6px 4px",
                transition: "all 0.25s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#fff"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#cbd5f5"
              }}
            >
              {link.name}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "0%",
                  height: 2,
                  background: "linear-gradient(90deg, #667eea, #764ba2)",
                  transition: "width 0.3s ease"
                }}
                className="nav-underline"
              />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          style={{
            padding: "10px 18px",
            borderRadius: 20,
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 600,
            boxShadow: "0 6px 16px rgba(102,126,234,0.5)",
            transition: "all 0.25s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"
            e.currentTarget.style.boxShadow =
              "0 10px 24px rgba(102,126,234,0.7)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)"
            e.currentTarget.style.boxShadow =
              "0 6px 16px rgba(102,126,234,0.5)"
          }}
        >
          Hire Me
        </a>
      </div>

      {/* Hover underline animation fix */}
      <style>
        {`
          a:hover .nav-underline {
            width: 100%;
          }
        `}
      </style>
    </nav>
  )
}
