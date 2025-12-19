# RTN Prototype - Receipt Substantiation Flow

An interactive prototype demonstrating the real-time notification flow for receipt substantiation. Built with React, Vite, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Prototype Flows

The prototype includes two flow variations you can toggle between:

### ✨ Optimal Flow (Recommended)
A streamlined 3-screen experience with real-time AI validation:
1. **Landing** - Direct camera/upload options
2. **Camera + Preview** - Capture and preview in one step
3. **AI Validation** - Real-time feedback with specific error messaging

### 📋 Dev Spec Flow
The original 5-screen flow per development specifications:
1. **Landing** - Transaction details with upload CTA
2. **Upload Modal** - Method selection (camera/gallery)
3. **Preview** - Image confirmation
4. **Processing** - Upload and validation
5. **Outcome** - Success/failure states

## Using the Control Panel

A control panel on the right side of the screen allows you to:
- **Toggle between flows** - Switch between Optimal and Dev Spec versions
- **Jump to any screen** - Directly navigate to specific screens
- **Simulate outcomes** - Test success, under review, and error states
- **Choose error types** - For the Optimal flow, select specific error scenarios (blurry, missing date, etc.)
- **Reset** - Return to the beginning of the flow

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Bolt.new GitHub Sync Setup

This project supports Bolt.new's native GitHub sync for easy sharing and collaboration.

### One-time Setup
1. Log into [Bolt.new](https://bolt.new) and authorize GitHub access (click the GitHub icon)
2. Navigate to: `bolt.new/github/78Fieo/realtime-notifications`
3. Bolt.new will create a hard-linked project that syncs with your GitHub repository

### Daily Workflow
1. Make changes in your local development environment (Cursor, VS Code, etc.)
2. Commit and push changes to GitHub
3. Refresh the Bolt.new tab (or click "Sync" if prompted)
4. Changes automatically appear in the WebContainer environment
5. Use Bolt.new's **"Publish"** option to share a live URL with stakeholders

## Tech Stack

- **React 18** - UI framework
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first styling
- **PostCSS** - CSS processing

## Project Structure

```
rtn-prototype/
├── src/
│   ├── App.jsx          # Main app with flow logic
│   ├── index.css        # Global styles and wireframe theme
│   ├── main.jsx         # Entry point
│   └── screens/         # All screen components
│       ├── AIValidation.jsx
│       ├── CameraPreview.jsx
│       ├── ConfirmationSMS.jsx
│       ├── Expired.jsx
│       ├── ImagePreview.jsx
│       ├── Landing.jsx
│       ├── LandingOptimal.jsx
│       ├── ReminderSMS.jsx
│       ├── SMSTrigger.jsx
│       ├── SoftError.jsx
│       ├── SpecificError.jsx
│       ├── Success.jsx
│       ├── SuccessNotSubstantiated.jsx
│       ├── TerminalFailure.jsx
│       ├── Thinking.jsx
│       ├── UnderReview.jsx
│       ├── UploadFailed.jsx
│       └── UploadMethodModal.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

