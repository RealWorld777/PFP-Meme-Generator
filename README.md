# PFP Generator

This project is a PFP meme generator of Qubic Blockchain.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- A Firebase project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/real-venus/memGenerator.git
   cd pfp-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com/).

2. In your Firebase project settings (Project settings > General > Your apps), find your configuration object and update `src/app/config/firebase.ts` with these values.

3. Set up Firebase Storage:
   - In the Firebase Console, go to Storage and create a new bucket if you haven't already.
   - At the root of your storage bucket, create two folders: `heads` and `bodies`.
   - Upload your assets to their respective folders.

4. Asset Naming Convention:
   - Name your assets as `*var(number).png`, where the number corresponds to the type of head/body.
   - For a head asset that matches all bodies, name it `*varALL.png`.

5. Configure Firebase Storage Rules:
   In the Firebase Console, go to Storage > Rules and paste the following:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if true;
       }
     }
   }
   ```