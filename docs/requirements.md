Here is the Requirement Specification for "Midnight Commit" (Working Title).
Game Design Document (GDD) & Requirements BAsed on the cabanet club from yakuza 0.

1. High-Level Concept

A web-based idle/management game where you run a boutique IT Consultancy.

    The Goal: Grow from a basement startup to a global tech giant.

    The Vibe: Chill lo-fi aesthetics, satisfying UI feedback, humorous "tech life" meta-commentary.

    Core Loop: Clients send project requests → You assign the right Consultant based on stats → You manage Consultant stress (Burnout) → Profit.

2. Core Entities (Data Structures)
   A. The Consultants (The "Hostesses")

Instead of Cute/Sexy/Funny, Consultants have Tech Stacks.

    Stats (0-100):

        Frontend (React/CSS icon)

        Backend (Database/Server icon)

        DevOps (Cloud icon)

        Design (Paintbrush icon)

    HP / Stamina: Renamed to "Energy."

        Decreases while working.

        If 0, they enter "Burnout" and cannot work for a cooldown period.

    Rank: Junior, Mid, Senior, Lead, Architect.

B. The Clients/Projects (The "Customers")

Instead of specific people entering the club, Project Briefs arrive at the desk.

    Requirement: A project will demand specific stats.

        Example: "Legacy Bank Migration" requires High Backend, High DevOps, but Low Design.

    Patience: How long the client waits for you to assign someone before the contract expires.

    Budget: The payout per tick.

3. Gameplay Mechanics
   A. The Matching System (Primary Mechanic)

This is the heart of the Yakuza feel.

    Incoming Request: A project card appears in an open slot.

    The Assignment: The player clicks a project, then selects a Consultant from the roster.

    Stat Comparison:

        Perfect Match: Consultant stats > Project requirements.

            Result: Revenue generates fast. Client Happiness goes up.

        Mismatch: Consultant stats < Project requirements.

            Result: Revenue is slow. Random "Bug Events" occur. Client Happiness drops.

B. Support Actions (The "Hand Signals")

In Yakuza, hostesses ask for a towel, menu, or ice. In this game, Consultants ask for help while working.

    Trigger: A bubble appears over a working Consultant.

    Player Choice: You have 3 seconds to select the right response:

        "I'm stuck!" → Provide Docs (Boosts Speed).

        "I'm tired..." → Send Coffee (Restores Energy).

        "The client is yelling!" → Manager Intervene (Restores Client Happiness).

    Chill Factor: If you miss the prompt, nothing explodes; you just miss a bonus.

C. Flow State (The "Fever Time")

When enough successful tickets are closed, a meter fills up.

    Activation: Player clicks "FLOW STATE."

    Effect: Music shifts to a high-energy remix. All Consultants have infinite Energy. Revenue is 2x. Projects complete instantly.

    Visuals: Matrix code rains down or the screen glows neon.

D. Training & Certifications (The "Makeover")

In Yakuza, you dress up hostesses to change stats. Here, you send them on Training.

    Action: Send a Consultant "Away" (Training Arc).

    Cost: Costs money and time (e.g., 2 minutes).

    Result: They return with a permanent stat boost or a "Certificate" badge (e.g., "AWS Certified" gives +10 DevOps).

4. Game Progression (Tycoon Elements)
   A. Office Expansion

You start in a garage. As you earn money, you buy "Office Skins" (Backgrounds).

    Garage: 1 Project Slot, 2 Consultants.

    Coworking Space: 2 Project Slots, 4 Consultants.

    Downtown Office: 4 Project Slots, 8 Consultants.

    Tech Campus: 6 Project Slots, 12 Consultants.

B. Rivals (The "Five Stars")

To unlock new tiers, you must beat a "Rival Firm" in a Hackathon Battle.

    This is a timed event where you must earn more revenue than the AI within 2 minutes.

5.  UI/UX Requirements (Frontend Focus)
    Layout (Landscape Mode)

        Left Panel (The Bench): List of available Consultants (Avatars + Stats).

        Center Panel (The Workspace): The visual representation of the office.

            Desks where Consultants sit when assigned to a Project Card.

            Animations of typing, sipping coffee, or panicking.

        Right Panel (Project Queue): Incoming contracts waiting for assignment.

        Top Bar: Money, Current Revenue/Sec, Flow State Meter.

Visual Polish (The "Juice")

    Floating Text: Green numbers (+$50) float up on every tick.

    Progress Bars: Smooth CSS transitions for project completion.

    Popups: When a Consultant levels up, a flashy modal appears (like getting a rare item in an RPG).

6. New Gameplay Mechanics (Proposed & Accepted)

   A. Technical Debt
   Concept: Patching a Mismatch instantly completes a project but adds "Technical Debt".
   Consequence: High Debt reduces revenue or causes freeze events.
   Resolution: Senior Consultants can "Refactor" to clear debt.

   B. Legacy Code Projects
   Concept: High-paying, rare projects locked to ancient stacks.
   Risk: High burnout chance for Juniors.

   C. Consultant Quirks
   Traits that add personality and stat modifiers (e.g., "Night Owl", "Coffee Snob").

   D. Office Peripherals (Meta-Progression)
   Upgradable office items satisfying passive bonuses (e.g., Coffee Machine for energy regen).

   E. Narrative Events
   "Slack-alike" chat window for random events and choices.
