# Feature Breakdown

This document breaks down the "Midnight Commit" requirements into isolated development features/epics.

## Phase 1: Core Engine & Data

**Goal**: Establish the game loop and data structures.

### [F-001] Game Loop & State

- **Global Store**: Setup Zustand store for Money, Revenue, Time/Ticks.
- **Tick System**: A unified 1-second (or sub-second) tick interval that drives all game systems.
- **Persistence**: Save/Load game state using `idb-keyval`.

### [F-002] Entity Data Models

- **Consultant Model**: Schema for Name, Avatar, Stats (Frontend, Backend, DevOps, Design), Energy, Rank.
- **Project Model**: Schema for Name, Requirements (Stats), Budget, TimeLimit.
- **Project Generator**: Logic to randomly generate projects based on current "Level/Reputation".

## Phase 2: Core Gameplay (MVP)

**Goal**: Playable loop of assigning consultants to projects.

### [F-003] The Workspace (UI)

- **Project Queue**: Visual list of incoming projects.
- **The Bench**: Visual list of available consultants.
- **The Office**: Grid of "Desks" (Slots) where work happens.

### [F-004] Drag & Drop System

- **Interaction**: Drag Consultant -> Desk. Drag Project -> Desk.
- **Validation**: Ensure valid assignment logic (Slot is empty, etc.).
- **Library**: Implement using `@dnd-kit/core`.

### [F-005] Work Simulation

- **Matching Logic**: Calculate "Match Score" (Consultant Stats vs Project Reqs).
- **Revenue Tick**: Generate $ based on Match Score per tick.
- **Energy Decay**: Reduce Consultant Energy per tick while working.
- **Completion**: Project finishes -> Reward -> Slot frees up.

## Phase 3: Interactive Mechanics

**Goal**: Add player agency and "management" feel.

### [F-006] Support Actions ("Hand Signals")

- **Event Trigger**: Random chance per tick for a Consultant to request help (Icon bubble).
- **Player Input**: UI to select response (Docs, Coffee, Manager).
- **Resolution**: Apply effect (Boost Speed, Restore Energy, etc.) or miss penalty.

### [F-007] Technical Debt & Mismatches

- **Mismatch Handling**: Logic for "Bad Match" (Slow progress, high bug chance).
- **Tech Debt System**: Accumulation of debt currency.
- **Refactoring**: Mechanic to assign Senior devs to clear debt.

## Phase 4: Progression & Meta

**Goal**: Long-term retention and growth.

### [F-008] Office Expansion

- **Upgrades**: Purchase new Office tiers (Garage -> Coworking -> Campus).
- **Effect**: Unlock more Desk slots and Roster capacity.
- **Peripherals**: Buy items (Coffee Machine) for passive buffs.

### [F-009] Training & Rivals

- **Training**: "Send Away" mechanic to upgrade Consultant stats.
- **Rival Battle**: Special "Hackathon" mode logic (Timed revenue race).

## Phase 5: Polish & Juice

**Goal**: "Game feel" and aesthetics.

### [F-010] Visual Feedback

- **Animations**: Framer Motion transitions for cards, floaty text for money.
- **Particles**: Matrix rain or glow effects for "Flow State".

### [F-011] Audio System

- **Sound Engine**: Howler.js setup.
- **SFX**: Typing, Cash register, Alert sounds.
- **BGM**: Lo-fi track management.
