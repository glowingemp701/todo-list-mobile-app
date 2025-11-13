# 📌 Todo App — React Native (TypeScript)

A clean and minimal **Todo Management** mobile application built with **React Native + TypeScript**, featuring:

- Custom **Splash Screen**
- Modern **Home** screen with tasks & calendar
- **Add Task** screen with form inputs
- **Reusable UI components**
- **Localization** (English & Urdu)
- **Custom fonts** (Nunito)

---

## 🚀 Tech Stack

- **React Native** (CLI)
- **TypeScript**
- **React Navigation (Native Stack)**
- **i18next + react-i18next** (localization)
- **Nunito** font family
- Modular folder structure with reusable components

---

## 📁 Project Structure

```bash
Todo/
├── setup.js
├── react-native.config.js
├── src/
│   ├── App.tsx
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── app-icon.png
│   │   │   ├── profile-demo.png
│   │   │   ├── search.png
│   │   │   ├── notification.png
│   │   │   ├── file.png
│   │   │   ├── add.png
│   │   │   ├── back-icon.png
│   │   │   ├── subject.png
│   │   │   ├── date.png
│   │   │   └── task.png
│   │   ├── fonts/
│   │   │   ├── Nunito-Regular.ttf
│   │   │   ├── Nunito-Bold.ttf
│   │   │   └── Nunito-SemiBold.ttf
│   │   └── assets.ts
│   │
│   ├── localization/
│   │   ├── en.json
│   │   ├── ur.json
│   │   └── i18n.ts
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── RootNavigation.ts
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppHeader.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── PrimaryButton.tsx
│   │   │   └── FAB.tsx
│   │   └── home/
│   │       ├── Calendar.tsx
│   │       └── TaskCard.tsx
│   │
│   ├── screens/
│   │   ├── splash/
│   │   │   └── index.tsx
│   │   ├── home/
│   │   │   └── index.tsx
│   │   └── task/
│   │       └── add/
│   │           └── index.tsx
│   │
│   └── theme/
│       ├── colors.ts
│       └── fonts.ts
└── ...
