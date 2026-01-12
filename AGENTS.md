# Support Me - Shadcn UI Showcase Project

## 📋 Project Overview

**Support Me** is a modern, beautifully crafted UI showcase project built to demonstrate the power and versatility of Shadcn UI components with Next.js. This is a **UI-only project** with no backend functionality or authentication - it's purely designed to showcase beautiful, accessible, and highly customizable UI components.

## 🎯 Purpose

The primary goal of this project is to:

- Showcase the elegant design patterns of Shadcn UI
- Demonstrate modern Next.js App Router capabilities
- Provide a reference implementation for multi-language support
- Illustrate smooth animations and transitions using Framer Motion
- Serve as a template for building beautiful, accessible web applications

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Bun** - Fast JavaScript runtime and package manager

### UI & Components

- **Shadcn UI** - Beautiful, accessible component library
- **Lucide React 0.562.0** - Icon library
- **Framer Motion 12.26.1** - Animation library for smooth transitions

### Form Management

- **React Hook Form 7.71.0** - Performant form library
- **Zod 4.3.5** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.2** - Form validation resolvers

### Internationalization

- **i18next 25.7.4** - Internationalization framework
- **react-i18next 16.5.2** - React bindings for i18next
- **Supported Languages**: English (en), Arabic (ar), Kurdish/Sorani (ckb)

### UI Enhancements

- **next-themes 0.4.6** - Theme management (dark/light mode)
- **Sonner 2.0.7** - Beautiful toast notifications

## 📁 Project Structure

```
support_me/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── signin/              # Sign-in page
│   ├── signup/              # Sign-up page
│   └── dashboard/           # Dashboard page
├── components/              # React components
│   ├── forms/              # Form components
│   │   ├── sign-in-form.tsx
│   │   └── sign-up-form.tsx
│   ├── shared/             # Shared components
│   │   ├── animate.tsx     # Framer Motion animations
│   │   ├── header.tsx      # Header with toggles
│   │   └── footer.tsx      # Footer with attribution
│   ├── ui/                 # Shadcn UI components
│   ├── theme-toggle.tsx    # Theme switcher
│   └── lang-toggle.tsx     # Language switcher
├── i18n/                   # Internationalization
│   ├── i18n.ts            # i18next configuration
│   └── locales/           # Translation files
│       ├── en.json        # English
│       ├── ar.json        # Arabic
│       └── ckb.json       # Kurdish
├── lib/                    # Utilities and configs
├── providers/              # React context providers
│   ├── theme-provider.tsx
│   └── language-provider.tsx
└── docs/                   # Documentation
```

## 🎨 Features

### Pages

1. **Home Page** (`/`)

   - Centered logo and project name "Support Me"
   - Three action buttons: Sign In, Sign Up, Dashboard
   - Beautiful stagger animations on load
   - Fully responsive design

2. **Sign In Page** (`/signin`)

   - Username and password fields
   - Password visibility toggle (eye icon)
   - Form validation with error messages
   - Helper text under inputs
   - Toast notifications on submit
   - Link to sign-up page

3. **Sign Up Page** (`/signup`)

   - Full name, username, email, and password fields
   - Password visibility toggle
   - Comprehensive form validation
   - Toast notifications on submit
   - Link to sign-in page

4. **Dashboard Page** (`/dashboard`)
   - Simple card-based layout
   - Placeholder for future functionality
   - Animated card entrance

### Global Features

- **Theme Switching**: Light/Dark mode toggle in header
- **Language Support**: Switch between English, Arabic, and Kurdish
- **RTL Support**: Automatic text direction for Arabic and Kurdish
- **Animations**: Smooth Framer Motion animations throughout
- **Toast Notifications**: Beautiful Sonner toasts for user feedback
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Accessibility**: Built with Shadcn UI's accessible components

### Form Features

- **Real-time Validation**: Instant feedback using Zod schemas
- **Error Display**: Clear error messages under each field
- **Helper Text**: Guidance for users on input requirements
- **Password Toggle**: Eye icon to show/hide password
- **Submit Handling**: Toast notifications on success/error
- **Type Safety**: Full TypeScript support

## 🎭 Animation Components

All animations are centralized in [components/shared/animate.tsx](components/shared/animate.tsx):

- `FadeIn` - Simple fade in effect
- `FadeInUp` - Fade in with upward motion
- `ScaleIn` - Scale and fade in effect
- `SlideInLeft` - Slide from left
- `SlideInRight` - Slide from right
- `StaggerContainer` - Container for staggered children
- `StaggerItem` - Individual staggered items

## 🌐 Internationalization

The project supports three languages with full translations:

- **English (en)** - LTR, default language
- **Arabic (ar)** - RTL
- **Kurdish/Sorani (ckb)** - RTL

All text content is externalized in JSON files for easy translation management.

## 🎨 Shadcn UI Components Used

- Button
- Input
- Label
- Card
- Form (with Field, Item, Label, Control, Description, Message)
- Dropdown Menu
- Sonner (Toast)

## 👨‍💻 Author

**Ahmad Software**

- Portfolio: [https://www.ahmad-software.com/](https://www.ahmad-software.com/)
- GitHub: [https://github.com/Ahmad-Softwaree](https://github.com/Ahmad-Softwaree)

## 📝 Notes

- This is a **UI showcase only** - no backend, no real authentication
- All form submissions show toast notifications but don't persist data
- The project follows strict folder conventions (see `/docs`)
- Uses Bun for faster package management and development
- Built with accessibility and best practices in mind

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build

# Start production server
bun start
```

Visit `http://localhost:3000` to see the application.
