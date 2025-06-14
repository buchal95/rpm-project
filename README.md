# RPM Gamified - Rapid Planning Method

A gamified web application implementing Tony Robbins' Rapid Planning Method (RPM) with levels, experience points, and achievements to make productivity more engaging.

## Features

- **RPM Planning System**: Implement the core RPM methodology
  - Results-focused planning
  - Purpose-driven actions
  - Massive Action Plans (MAP)
  
- **Gamification Elements**:
  - Experience Points (XP) for completing tasks
  - Level progression system
  - Achievement badges
  - Progress tracking and visualization
  - Streaks and daily challenges

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context (planned)
- **Database**: TBD (likely PostgreSQL with Prisma)
- **Authentication**: TBD (likely NextAuth.js)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/buchal95/rpm-project.git
cd rpm-project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
rpm-project/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions and shared logic
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
└── public/          # Static assets
```

## Development Roadmap

- [ ] Core RPM planning functionality
- [ ] User authentication
- [ ] XP and leveling system
- [ ] Achievement system
- [ ] Dashboard with progress visualization
- [ ] Mobile responsive design
- [ ] Data persistence
- [ ] Social features (leaderboards, challenges)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.