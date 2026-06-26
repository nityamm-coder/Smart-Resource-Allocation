# 🚀 Smart Resource Allocation & Trust Protocol (SRA-TP)

[![Hackathon Project](https://img.shields.io/badge/Hackathon-Project-blueviolet.svg)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-Node%20%7C%20Express%20%7C%20Firebase%20%7C%20EVM%20Blockchain%20%7C%20Gemini-orange.svg)](#)
[![Aesthetics](https://img.shields.io/badge/Design-Glassmorphic%20Dark-ff69b4.svg)](#)

A real-time, AI-driven disaster response, relief coordination, and immutable trust validation system. It connects victims with nearby skilled volunteers while ensuring corruption-free aid tracking and tamper-proof reputation verification using a hybrid Web2/Web3 architecture.

---

## 🌐 Deployed Link
* **Deployed Web URL:** https://smart-resource-allocation-six.vercel.app/  
  *(Ready for Vercel deployment with configuration provided in `vercel.json`)*

---

## 📌 Table of Contents
1. [📖 Problem & Use Case](#-problem--use-case)
2. [💡 Concept & Architecture](#-concept--architecture)
3. [🛠️ Tech Stack](#️-tech-stack)
4. [🌟 Key Features](#-key-features)
5. [🎛️ How the Hybrid Flow Works](#️-how-the-hybrid-flow-works)
6. [🔗 Smart Contract & Blockchain Specifications](#-smart-contract--blockchain-specifications)
7. [⚙️ Local Setup & Installation](#️-local-setup--installation)
8. [📊 Volunteer Matching Algorithm](#-volunteer-matching-algorithm)
9. [🔮 Future Scope](#-future-scope)
10. [📁 Directory Structure](#-directory-structure)

---

## 📖 Problem & Use Case

During natural or man-made disasters (e.g., floods, earthquakes, industrial accidents), relief efforts are often plagued by:
- **Chaotic Communication & Language Barriers:** Victims send pleas for help in local dialects, Hinglish, or regional languages, which slows categorization.
- **Inefficient Volunteer Allocation:** Responders are dispatched without skill-matching or proximity awareness, leading to resource bottlenecks.
- **Relief Supply Corruption & Black Markets:** Lack of traceability allows emergency inventory (food, medical kits) to be diverted, lost, or hoarded without clear accountability.
- **Fake Reviews & Rating Inflation:** Bad-faith actors can inflate volunteer ratings or fabricate emergency completions.
- **Low Connectivity Barriers:** Traditional complex web forms fail in zones where internet speeds drop, making offline SMS gateway integrations vital.

---

## 💡 Concept & Architecture: The Hybrid Web2/Web3 "Trust Layer"

To solve this, the **Smart Resource Allocation & Trust Protocol** separates operations into a high-performance database tier and a permanent blockchain validator tier:

1. **Web2 Speed & Performance (Firebase Firestore + Google Gemini AI):** Handles real-time communication, duplicate clustering, SMS mapping, Leaflet maps, and instant UI responsiveness.
2. **Web3 Trust Layer (L2 EVM Ledger / Arbitrum Sepolia):** Every time a volunteer resolves a crisis, the action is anchored on-chain. Supply packs are represented as **ERC-1155 semi-fungible tokens**, tracking inventory transfer from NGO donors to volunteers and finally to the victim. Volunteer feedback and ratings are permanently minted as **ERC-721 Soulbound Tokens (SBTs)**, preventing review manipulation.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | Node.js + Express.js | High-concurrency APIs, SMS routing, and blockchain interactions. |
| **Database** | Firebase Firestore | NoSQL cloud database for high-frequency logs, map coordinates, and active UI sync. |
| **AI / NLP** | Google Gemini 2.5 Flash | Translates regional dialects, extracts categories (`Food`, `Medical`, `Shelter`), and assigns urgency scores (1-5). |
| **Smart Contracts** | Solidity (`^0.8.20`) | The logic engine of the Trust Layer (`RescueTrust.sol`) implementing ERC-1155 and Custom SBTs. |
| **Web3 Interface** | ethers.js (v6) | Connects the backend server seamlessly to any L2 EVM network (or local fallback). |
| **Frontend UI** | HTML5, CSS3, ES6+ JS, Leaflet.js | Glassmorphic Dark UI, interactive maps with pulsating status nodes, and real-time step trackers. |
| **Security** | Express Rate Limit | Anti-spam and request throttling for victim forms, SMS, and restocks. |

---

## 🌟 Key Features

### 🧠 Core System Features
- **AI-Powered dialect parsing:** Converts regional text (Hindi, Marathi, Hinglish, English) into structured data with urgency indexing.
- **Interactive Dark Mode Map View:** Powered by Leaflet.js and CartoDB Dark Matter. Plots active requests as color-coded, pulsating markers (pulsing faster for higher urgency).
- **Duplicate Request Clustering:** Prevents double-dispatch by grouping reports with high spatial/semantic similarity.
- **Offline SMS Simulator:** Parses simulated incoming SMS messages, leveraging Gemini to extract locations, category, and priority.
- **Dynamic Kanban Dashboard:** Real-time drag-and-drop workflow status updates.

### ⛓️ Web3 Trust Layer Features
- **ERC-1155 Tokenized Relief Packs:** Supply items (Food=1, Medical=2, Shelter=3, Other=4) are minted and tracked on-chain. When a request is resolved, tokens are transferred from the NGO to the volunteer.
- **Non-Transferable Soulbound Tokens (SBTs):** Volunteer ratings and feedback are minted into immutable ERC-721-compliant SBTs associated with the volunteer's wallet. They cannot be traded, sold, or modified, creating a permanent reputation score.
- **Simulated L2 EVM Ledger & Block Explorer:** In the absence of live RPC nodes, the backend activates a built-in persistent L2 simulator, writing transactions to a local ledger. The dashboard renders a real-time block explorer, displaying current block height, hash history, and gas stats.
- **Victim Delivery Confirmation:** When victims mark a request as resolved, they sign off on the feedback. The system then mints the volunteer's SBT on-chain, proving the supply pack was delivered.

---

## 🎛️ How the Hybrid Flow Works

```
                                  ┌──────────────────────────┐
                                  │  Victim Submits Crisis   │ (Web or SMS Simulator)
                                  └────────────┬─────────────┘
                                               │
                                               ▼
                                  ┌──────────────────────────┐
                                  │   Google Gemini 2.5 AI   │ (Extracts urgency, category, translations)
                                  └────────────┬─────────────┘
                                               │
                                               ▼
                                  ┌──────────────────────────┐
                                  │    Matching Engine       │ (Pairs with closest, skilled volunteer)
                                  └────────────┬─────────────┘
                                               │
                                               ▼
 ┌─────────────────────────────────────────────┴─────────────────────────────────────────────┐
 │                                                                                           │
 ▼                                                                                           ▼
 [WEB2 PERSISTENCE LAYER]                                                    [WEB3 TRUST LAYER (EVM / L2)]
 ┌──────────────────────────┐                                                ┌──────────────────────────┐
 │    Firebase Firestore    │ (Realtime UI updates)                          │  Supply Pack Minted      │ (ERC-1155)
 └───────────┬──────────────┘                                                └───────────┬──────────────┘
             │                                                                           │
             ▼                                                                           ▼
 ┌──────────────────────────┐                                                ┌──────────────────────────┐
 │   Volunteer Resolves     │ (NGO confirms task)                            │  Transfer to Volunteer   │ (On-chain receipt)
 └───────────┬──────────────┘                                                └───────────┬──────────────┘
             │                                                                           │
             ▼                                                                           ▼
 ┌──────────────────────────┐                                                ┌──────────────────────────┐
 │  Victim Signs Feedback   │ (Submits rating)                               │  Mint Reputation SBT     │ (ERC-721 Soulbound)
 └──────────────────────────┘                                                └──────────────────────────┘
```

---

## 🔗 Smart Contract & Blockchain Specifications

The system utilizes [RescueTrust.sol](file:///c:/Users/Hi/Desktop/Hackathon/contracts/RescueTrust.sol) to run its trust layer:

- **State Ledger (`RescueRecord`):** Stores requestId, volunteer address, category, hours worked, and victim rating on-chain.
- **SBT Minting (`mintSBT`):** Creates non-transferable ERC-721 tokens (`VRES-SBT`) verifying volunteer performance. Overrides `transferFrom` and approvals to revert, keeping tokens locked to the volunteer's address.
- **ERC-1155 Supplies (`mintSupply` & `transferSupply`):**
  - **Token ID 1:** Food Packs
  - **Token ID 2:** Medical Kits
  - **Token ID 3:** Shelter Kits
  - **Token ID 4:** Other Supplies

---

## ⚙️ Local Setup & Installation

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (bundled with Node)
- **Google Gemini API Key** (Get one at [Google AI Studio](https://aistudio.google.com/))
- **Firebase Project** with Firestore Database enabled.

### 1. Clone & Enter Directory
```bash
git clone https://github.com/nityamm-coder/Smart-Resource-Allocation.git
cd Smart-Resource-Allocation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Admin Credential JSON as a single-line string:
FIREBASE_SERVICE_ACCOUNT_KEY='{"type": "service_account", "project_id": "...", "private_key_id": "...", "private_key": "...", ...}'

# OPTIONAL: Configure live L2 EVM Blockchain (e.g., Arbitrum Sepolia)
# If left blank, the system automatically falls back to the persistent simulated local ledger
BLOCKCHAIN_PROVIDER_URL=https://sepolia-rollup.arbitrum.io/rpc
BLOCKCHAIN_PRIVATE_KEY=your_wallet_private_key_here
BLOCKCHAIN_CONTRACT_ADDRESS=your_deployed_rescue_trust_contract_address
```

### 4. Run the Project
* **Development Mode (Auto-reloads server):**
  ```bash
  npm run dev
  ```
* **Production Mode:**
  ```bash
  npm start
  ```

Open your browser to:
- **Victim Request Panel:** [http://localhost:3000/index.html](http://localhost:3000/index.html)
- **NGO Control Dashboard:** [http://localhost:3000/dashboard.html](http://localhost:3000/dashboard.html)
- **Victim Live Tracking Portal:** [http://localhost:3000/tracking.html](http://localhost:3000/tracking.html)

---

## 📊 Volunteer Matching Algorithm

Every crisis submission invokes a real-time matching query:
1. **Available Filter:** Filters out volunteers currently assigned to any unresolved (`Open`/`In Progress`) request to ensure single-task dedication.
2. **Weighted Scoring:**
   - **Category Match (+2 Points):** Volunteer holds specific skills corresponding to the crisis (e.g., medical expertise).
   - **Zone Match (+1 Point):** Volunteer is located within the geographic neighborhood of the victim.
3. **Execution:** The highest-scoring volunteer is assigned. If no available volunteers match, the request remains open for manual dispatch by the NGO.

---

## 🔮 Future Scope

- **Real-world SMS Gateway:** Hooking the Express endpoints into Twilio/Africa's Talking API to support physical mobile text inputs.
- **Multi-Signature Aid Approvals:** Require cryptographic signatures from both the NGO coordinator and the field volunteer before high-value supplies (e.g. specialized medical devices) are released on-chain.
- **Decentralized Identifiers (DIDs):** Integrating DID/VC models for victims to request aid anonymously while preserving data privacy.
- **Routing Optimization:** Adding Mapbox/OSRM routing engines to map the fastest routes for volunteers to bypass flood zones.

---

## 📁 Directory Structure

```
smart-resource-allocation/
├── contracts/
│   └── RescueTrust.sol   # Solidity Smart Contract (Reputation SBTs & Supply Tracking)
├── public/
│   ├── index.html        # Victim Form (Dialect Translation & Urgency Classification)
│   ├── dashboard.html    # Coordinator Panel, L2 Block Explorer, CartoDB Interactive Map
│   ├── tracking.html     # Live Request timeline & feedback gateway
│   ├── app.js            # Frontend interactions and updates
│   └── style.css         # Styling with Dark glassmorphism elements
├── server.js             # API backend, matching engine, and Gemini routing
├── blockchainService.js  # L2 Provider layer & local persistent EVM simulator
├── .local_blockchain.json# Persisted transaction ledger for simulated environment
├── package.json          # Node dependencies
└── vercel.json           # Cloud deployment instructions
```

---

# **Coding Today! Engineering Tomorrow!**
**Made By:** Nityam Mishra  
**Email:** nityamm2005@gmail.com  
**GitHub:** [nityamm-coder](https://github.com/nityamm-coder)