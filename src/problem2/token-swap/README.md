# Token Swap Form (Vite + React + Radix + TypeScript)

This document provides a **technical overview** of the Token Swap orm built with **Vite, React, Radix UI, Typescript**.

---

## Tech Stack
- **Vite** → lightning-fast development build tool.
- **React** → component-driven UI, hooks for state management.
- **Radix UI** → accessible UI primitives, themes.
- **Typescript** → strictly typed and enhanced developer experience

---

## Core Features

### 1. Token selection (From / To)
- Built using **Radix Select** component.
- Disabled tokens if it is used.
- User-friendly dropdowns with clean UI.

### 2. Swap input fields
- **From Amount** → user inputs.
- **To Amount** → automatically calculated.
- **Bi-directional logic**: if user changes “From”, “To” updates.
- Validation:
  - Must be a positive number.
  - Prevents swapping the same token.
  - Error handling.

### 3. Exchange
- Calculation using price feed.
- Updates instantly when user changes tokens or amounts.

### 4. Swap button
- **Swap button (⇅)** flips “From” and “To” tokens with animation.

### 5. Error Handling & UX
- Inline errors (`red text`).
- Loading states when calculating output value.
- Responsive design for mobile/desktop.


## User Flow
1. User selects **From token** and **To token**.
2. Enters an amount.
3. Conversion is shown instantly.
4. User presses **Swap icon button**.
6. Transaction logic would automatically execute.

---

## Key Takeaways
- Demonstrates **frontend engineering** with modern tools.
- **interactivity** with **responsive design** with Radix.
---

