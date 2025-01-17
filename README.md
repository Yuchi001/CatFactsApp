# Cat Facts Blackjack Game

This project consists of a backend and a frontend that work together to create a fun and interactive game simulating Blackjack using cat facts!

## Project Overview

The backend provides a set of random cat facts, and the frontend allows users to play a simplified version of Blackjack. The game mechanics are based on cat facts, and players aim to reach 9 stacks without exceeding it. Each "Hit Me!" gives you a new cat fact, and for each occurrence of the word "cat" in the fact, you receive a stack.

### Important!
- **Goal:** The objective is to get as close as possible to 9 stacks without exceeding that number.
- **Hit Me! Button:** Get a new cat fact, and earn a stack for every occurrence of the word "cat."
- **Enough! Button:** Once you're satisfied with your stacks, click this button to compare your score with the computer’s score.
- **Save Facts:** You can save the facts you've received, but they will reset if you lose the game!

## Getting Started

### Prerequisites

1. **Frontend**: Yarn (for managing frontend dependencies)
2. **Backend**: ASP.NET Core (for building the backend)

Make sure you have these tools installed:

- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [ASP.NET Core SDK](https://dotnet.microsoft.com/download/dotnet)

### Setting Up Backend

1. Go into backend folder:
   ```bash
   cd backend\CatFactsAPI\CatApi
   ```
2. Install the required .NET dependencies: (as administrator)
   ```bash
    dotnet restore
   ```
3. Run backend server:
   ```bash
    dotnet run
   ```

### Setting Up Frontend

1. Go into frontend folder:
   ```bash
   cd frontend\CatFactsPage
   ```
2. Install the required dependencies using Yarn: (as administrator)
   ```bash
   yarn install
   ```
4. Start frontend development server:
   ```bash
   yarn start
   ```

### Game Flow

- **Start the game** by loading the frontend in your browser.
- **Click "Hit Me!"** to receive a new cat fact and gain stacks based on the occurrence of the word "cat" in the fact.
- **Click "Enough!"** to compare your score to the computer's.
- **Save your facts** anytime, but keep in mind that they will reset if you lose the game.

### Technologies Used

- **Frontend**: React, Yarn
- **Backend**: ASP.NET Core
