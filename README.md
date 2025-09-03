# 🎨 Tone Picker Text Tool - Frontend

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-teal)
![Deploy-Vercel](https://img.shields.io/badge/Deploy-Vercel-blue)
![License](https://img.shields.io/badge/License-Unlicensed-red)

A **modern React application** that transforms text into different tones using AI.  
This app features a **visual tone matrix**, **real-time text transformation**, **undo/redo functionality**, and **local storage persistence** for a smooth and efficient writing experience.

🔗 **Backend Repo:** [Tone Picker Backend](https://github.com/ankit-0903/Tone-Picker-Text-Tool_Backend)

---

## 📚 Table of Contents
1. [✨ Features](#-features)
2. [🎨 Tone Options](#-tone-options)
3. [🛠️ Tech Stack](#️-tech-stack)
4. [📋 Prerequisites](#-prerequisites)
5. [🚀 Installation](#-installation)
6. [📦 Available Scripts](#-available-scripts)
7. [🏗️ Project Structure](#️-project-structure)
8. [🎯 Core Features Explained](#-core-features-explained)
9. [🔧 Configuration](#-configuration)
10. [🔌 API Integration](#-api-integration)
11. [🚀 Deployment](#-deployment)
12. [🔮 Future Enhancements](#-future-enhancements)
13. [🐛 Troubleshooting](#-troubleshooting)
14. [🤝 Contributing](#-contributing)
15. [📄 License](#-license)

---

## ✨ Features
- 🎛️ **Visual Tone Matrix**: Intuitive 3x3 grid for tone selection  
- ⚡ **Real-time AI Transformation**: Instant tone adjustments  
- ↩️ **Undo/Redo History**: Full text history tracking  
- 💾 **Local Storage Persistence**: Auto-save your writing progress  
- 📱 **Responsive UI**: Optimized for all screen sizes  
- 🔄 **Smooth Loading States**: Visual feedback on API calls  
- 🎨 **Modern Design**: Dark theme, gradients, and glassmorphism  

---

## 🎨 Tone Options

|                | More Confident           |                 |
|----------------|-------------------------|-----------------|
| **More Professional** | Professional & Confident | Professional | Professional & Friendly |
|                | More Confident          | **Neutral** (Center) | More Friendly |
| **More Casual**| Confident & Casual      | More Casual    | Friendly & Casual |

---

## 🛠️ Tech Stack
- **React 19** – Latest React with hooks  
- **Vite 5** – Lightning-fast build tool  
- **Tailwind CSS 4** – Utility-first styling  
- **Heroicons** – Elegant icon set  
- **ESLint** – Enforced coding standards  

---

## 📋 Prerequisites
- Node.js **v16+**
- npm or yarn package manager
- Backend API (See [Backend Repo](https://github.com/ankit-0903/Tone-Picker-Text-Tool_Backend))

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/ankit-0903/Tone-Picker-Text-Tool_Frontend.git
cd Tone-Picker-Text-Tool_Frontend

# Install dependencies
npm install

# Start development server
npm run dev
````

App runs at: `http://localhost:5173`

---

## 📦 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build app for production                 |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |

---

## 🏗️ Project Structure

```bash
Tone-Picker-Text-Tool_Frontend/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images and assets
│   ├── App.jsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── package.json            # Dependencies and scripts
```

---

## 🎯 Core Features Explained

### 🪝 `useHistory` Hook

* Provides **undo/redo** functionality
* Maintains a full transformation history
* Optimized memory management

### 💾 Local Storage

* Auto-saves text changes
* Restores session data on reload
* Graceful error handling

### 🎨 Responsive UI

* Mobile-first design
* Adaptive grid for all devices
* Touch-friendly interaction

---

## 🔧 Configuration

**API Endpoint:**

* Default: `https://tone-picker-text-tool-backend.onrender.com/api/transform-tone`
* Local: `VITE_API_URL=http://localhost:3000/api/transform-tone`

**Tailwind Customization:**
Use `index.css` or extend Tailwind themes for custom design.

---

## 🔌 API Integration

**Endpoint:** `POST /api/transform-tone`

**Request Example:**

```json
{
  "text": "Your text here",
  "tone": "More Professional"
}
```

**Response Example:**

```json
{
  "transformedText": "Your professionally toned text"
}
```

---

## 🚀 Deployment

| Platform           | Instructions                                                     |
| ------------------ | ---------------------------------------------------------------- |
| **Vercel**         | `npm install -g vercel` → `vercel`                               |
| **Netlify**        | Connect repo or upload `dist/` folder                            |
| **GitHub Pages**   | `npm install -g gh-pages` → `npm run build` → `gh-pages -d dist` |
| **Custom Hosting** | Upload built `dist/` folder to your hosting platform             |

---

## 🔮 Future Enhancements

* [ ] Add more tone options
* [ ] Implement authentication
* [ ] Export text in multiple formats
* [ ] Keyboard shortcuts
* [ ] Dark/Light theme toggle
* [ ] Multi-language support
* [ ] Real-time collaboration

---

## 🐛 Troubleshooting

<details>
<summary>Expand</summary>

### API Issues

* Ensure backend server is running
* Check API URL in `.env`
* Verify CORS settings

### Styling Issues

* Clear browser cache
* Rebuild project
* Verify Tailwind setup

### Local Storage Issues

* Check browser storage settings
* Try incognito mode

</details>

---

## 🤝 Contributing

1. Fork this repo
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---



