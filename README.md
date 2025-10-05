# 🧙‍♂️ MTG Mox — Magic: The Gathering Deckbuilder

A full-stack web application for **Magic: The Gathering** players to search, filter, and build decks using live data from the **Scryfall API**.  
MTG Mox makes it easy to explore cards, create and manage decks, and even contact local shops with completed decklists.

---
## 💡 Motivation

As a longtime Magic: The Gathering player, I was frustrated by how scattered and time-consuming the deckbuilding process had become.  
I constantly found myself jumping between multiple websites to:
- Search for cards and check prices  
- Track which cards I already owned  
- Copy and paste decklists across different platforms  

**MTG Mox** was created to fix that.  
It brings **everything into one unified platform** — letting players:
- Search and filter cards using the **Scryfall API**
- Build and catalog decks easily  
- Keep track of cards they already own  
- Send completed decklists directly to local shops to r

## ✨ Features

- **Card Search & Filtering**
  - Integrated with the [Scryfall API](https://scryfall.com/docs/api) for real-time card search.
  - Filter cards by name, type, color, mana cost, rarity, and set.
  - Utilizes efficient data structures for fast lookup, and filtering.

- **Deck Building**
  - Create, edit, save, and view decks directly from the UI.
  - Add or remove cards dynamically.
  - Track deck composition (lands, spells, creatures, etc.).
  - Export or share completed decks.

- **Shop Integration**
  - Send completed decklists directly to local card shops.
  - Streamlined deck submission for price requests or inventory checks.

- **User Authentication**
  - Secure login and registration with **Spring Security**.
  - Decks and saved cards are restricted to authenticated users.
  - All user data is stored securely and isolated.

- **Modern UI/UX**
  - Built with **React** for a fast, responsive experience.
  - Real-time search and interactive deck views.
  - Smooth animations and clean layout for improved usability.

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Axios
- TailwindCSS (or your chosen CSS framework)
- Vite / Create React App

**Backend:**
- Java 21+
- Spring Boot (MVC Architecture)
- Spring Data JPA
- Spring Security
- PostgreSQL / MySQL
- Maven

**APIs:**
- [Scryfall API](https://scryfall.com/docs/api) — for fetching card data

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone git@github.com:ToroDDT/MTG-Mox.git
cd MTG-Mox
