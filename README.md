# Gemini AI Travel Assistant

A portfolio-ready **concept project** demonstrating how the Gemini API can power a travel-planning assistant. This repository contains a lightweight web app where a user can enter a Gemini API key, ask for a trip plan, and receive a structured itinerary.

> **Project status:** Demo / prototype. This is not a deployed travel service. The UI concept image is illustrative; the app functionality is implemented separately in this repository.

## Features

- Gemini API integration using the `generateContent` REST endpoint
- Natural-language travel requests
- Structured itinerary, estimated budget, and practical travel tips
- Responsive dark dashboard UI
- API key entered at runtime and kept only in the current browser tab's memory
- Clear loading and error states

## Run locally

1. Clone this repository.
2. Open `index.html` in a modern browser, or serve the folder with a local static server.
3. Create an API key in [Google AI Studio](https://aistudio.google.com/app/apikey).
4. Paste the key into the app's API key field.
5. Enter a destination, duration, and preferences, then select **Generate itinerary**.

No build step or package installation is required.

## Security note

This is a learning/demo app. The API key is sent from the browser directly to Google's Gemini API and is not saved by this app. Do not use a personal or production key in a public deployment: browser-side keys can be inspected by users. For production, move Gemini requests to a backend, store the key in an environment variable or secret manager, add authentication, rate limiting, and usage controls.

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Gemini API

## Suggested next steps

- Add a backend proxy for secure API-key handling
- Add Maps / Places integration for verified locations
- Add export-to-PDF and saved itineraries
- Add tests, rate limiting, and deployment configuration

## Author

Sandeep Singh

Built as a hands-on exploration of generative AI agents and tool-oriented product experiences.
