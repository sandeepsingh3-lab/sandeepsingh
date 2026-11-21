const $ = (id) => document.getElementById(id);
const apiKeyInput = $("apiKey");
$("toggleKey").addEventListener("click", () => {
  const show = apiKeyInput.type === "password";
  apiKeyInput.type = show ? "text" : "password";
  $("toggleKey").textContent = show ? "Hide" : "Show";
});

function setResult(text) {
  const box = $("result");
  box.classList.remove("empty");
  box.innerHTML = "";
  const content = document.createElement("div");
  content.className = "result-content";
  content.textContent = text;
  box.appendChild(content);
}

$("generate").addEventListener("click", generateItinerary);

async function generateItinerary() {
  const key = apiKeyInput.value.trim();
  const destination = $("destination").value.trim();
  const duration = $("days").value;
  const budget = $("budget").value;
  const interests = $("interests").value.trim();
  const error = $("error");
  const button = $("generate");

  error.hidden = true;
  error.textContent = "";
  if (!key) return showError("Please paste your Gemini API key first.");
  if (!destination) return showError("Please enter a destination.");

  button.disabled = true;
  button.textContent = "Planning your trip…";
  $("resultStatus").textContent = "Generating";
  setResult("Gemini is preparing your itinerary. This can take a few seconds.");

  const prompt = `You are a thoughtful travel-planning assistant. Create a realistic ${duration} itinerary for ${destination}. Budget preference: ${budget}. Interests: ${interests || "General sightseeing"}. Organize the response by day with morning, afternoon and evening suggestions. Include a brief budget estimate with currency clearly stated, local transport suggestions, food ideas, practical tips, and a short note that opening hours, prices and availability must be verified before travel. Do not invent live bookings or claim to have checked real-time availability. Be concise and useful.`;

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1800 }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      const message = data?.error?.message || `Gemini API returned HTTP ${response.status}`;
      throw new Error(message);
    }
    const answer = data?.candidates?.[0]?.content?.parts?.map(part => part.text || "").join("\n").trim();
    if (!answer) throw new Error("The API returned no text. Try again with a different prompt.");
    setResult(answer);
    $("resultStatus").textContent = "Response received";
  } catch (err) {
    showError(err.message || "Something went wrong. Please try again.");
    $("resultStatus").textContent = "Request failed";
    setResult("No itinerary was generated. Check the error message above and try again.");
  } finally {
    button.disabled = false;
    button.innerHTML = '<span>✦</span> Generate itinerary <span class="arrow">→</span>';
  }
}

function showError(message) {
  $("error").textContent = message;
  $("error").hidden = false;
}
