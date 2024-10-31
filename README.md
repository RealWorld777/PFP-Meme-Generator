# CFB Generator

The CFB Generator allows users to create their own customized PFP or meme face.

### How it Works

- **Manual Selection:** Browse through various assets and choose your preferred options for background, body, skin, eyes, top, mouth, glasses, and earrings.
- **Random Selection:** Click the 'Shuffle' button for automatic random assembly.

### Downloading Options

Once assembled, you can download your custom CFB via:

- **Download HD:** Ideal for publishing CFB on X or creating personalized memes.
- **Download PFP:** Perfect for using CFB as a profile picture on X, Discord, and other platforms.

### Sharing and Extras

- After downloading, a fortune cookie appears for added fun!
- A share button appears at the bottom right of the created image, allowing easy posting on X.

## Getting Started

### Install Packages

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

## Firebase Integration

- **Configuration:** Add your Firebase configuration data to `src/app/config/firebase.ts` (available in Firebase project settings > General > Your Apps).
- **Storage Setup:** At the root of your Firebase bucket storage, create two folders: `heads` and `bodies`.
- **Asset Management:** Insert assets into their respective folders. Ensure assets are named in the format `*var(var number).png`, where the var number corresponds to the type of head/body.
  - **Matching Assets:** Selecting a head will display the corresponding type of body and vice versa.
  - **Universal Assets:** To have a head asset that matches all bodies, name the asset as `*varALL.png`.
- **Storage Rules:** In the rules section of Firebase storage, paste the following:

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

### Change Firestore Mode

Refer to the [Firestore or Datastore Documentation](https://cloud.google.com/datastore/docs/firestore-or-datastore) for guidance.

### Dev Mode for Avoiding Image CORS Error

```bash
gsutil cors set cors.json gs://<your-bucket-name>
```

## Hosting on Firebase

```bash
firebase experiments:enable webframeworks
firebase init hosting
firebase deploy
```
