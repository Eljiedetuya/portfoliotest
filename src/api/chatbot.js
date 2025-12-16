// Netlify/Vercel serverless endpoint
export default async function handler(req, res) {
  const { message } = req.body;

  // Replace with your Gemini API endpoint & key
  const response = await fetch("https://api.gemini.com/v1/your-endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
    },
    body: JSON.stringify({ prompt: message }),
  });

  const data = await response.json();
  res.status(200).json({ reply: data.reply });
}
