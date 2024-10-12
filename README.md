This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

install packages

```bash
npm i
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Firebase Integration

- put the firebase configuration data in src/app/config/firebase.ts (available in firebase project settings > general > your apps)
- at the root of your firebase bucket storage, create two folders: heads & bodies
- insert assets in their respective folders
- make sure assets are named as *var(var number).png, where the var number will correspond to the type of head/body
- selecting a head will show same type of body and vice versa, because of this
- in the case of having a head asset that matches all bodies, name that asset as *varALL.png
- in the rules section of firebase storage paste this
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

