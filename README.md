# AI Chatbot

A modern AI chatbot application built with React Router v7 and the Vercel AI SDK.

## Tech Stack

- **Framework**: React Router v7 with File-System Routes
- **Language**: TypeScript
- **Styling**:
  - Tailwind CSS
  - shadcn/ui components
  - Radix UI primitives
- **AI Integration**:
  - Vercel AI SDK
  - OpenAI integration
- **Development Tools**:
  - Vite
  - Prettier with Tailwind plugin
  - TypeScript
- **Data Validation**:
  - Zod for runtime type checking
- **UI Components**:
  - Lucide React icons
  - Custom components with shadcn/ui
  - Auto-resizing textarea

## Features

- Modern file-system based routing
- Real-time AI chat interface
- Responsive design
- Dark mode support
- Type-safe development
- Code formatting with Prettier
- Runtime type validation with Zod
- Automatic code formatting on commit

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Then edit `.env` and add your OpenAI API key.

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Environment Variables

Required variable:

- `OPENAI_API_KEY`: Your OpenAI API key

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking

### Git Hooks

This project uses husky and lint-staged to automatically format code before commits. The following files will be automatically formatted:

- JavaScript/TypeScript files (_.js, _.jsx, _.ts, _.tsx)
- CSS files (\*.css)
- Markdown files (\*.md)

No additional setup is required - the hooks will run automatically when you commit changes.

## License

MIT
