document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.getElementById("exploreBtn");
  const storeSection = document.getElementById("store");
  const notification = document.getElementById("notification");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  const gameDatabase = [
    { title: "God of War 4", link: "game1.html" },
    { title: "God of War Ragnarok", link: "ragnork.html"},
    { title: "GTA V", link: "game2.html" },
    { title: "Red Dead Redemption 2", link: "game3.html" },
    { title: "Super Mario Odyssey", link: "game4.html" },
    { title: "Sekiro Shadows Die Twice", link: "game5.html" },
    { title: "Hollow Knight Silksong", link: "game6.html" },
    { title: "The Binding of Isaac Rebirth", link: "game7.html" },
    { title: "Super Meat Boy", link: "game8.html" },
    { title: "Cuphead", link: "game9.html" },
    { title: "GTA 6 ", link: "game10.html" },
    { title: "Resident Evil: Requiem ", link: "game11.html" },
    { title: "Ghost of Yeti  ", link: "game10.html" },
    { title: "Call of Duty", link: "game13.html" },
    { title: "Final Fantasy VII Rebirth", link: "ff7remake.html" },
    { title: "Final Fantasy XV", link: "ffXV.html"},
    { title: "Final Fantasy XVI Remake", link: "ff7remake.html"
    },
    { title: "World Of Tanks", link: "tanks.html"

    },
     { title: "Adventure", link: "adventure.html"
    },
     { title: "Crime Thriller", link: "crime.html"
    },
     { title: "RPG", link: "rpg.html"
    },
     { title: "Indie ", link: "indie.html"
    },
  ];

  const categoryDatabase = [
    { title: "adventure", link: "adventure.html" },
    { title: "indie", link: "indie.html" },
    { title: "rpg", link: "rpg.html" },
    { title: "crime", link: "crime.html" }
  ];

  function normalizeTitle(title) {
    return title.toLowerCase().replace(/^(the |a |an )/, "");
  }

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      if (storeSection) {
        storeSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "fstore.html";
      }
    });
  }

  if (searchBtn && searchInput) {
    let resultsContainer = document.getElementById("searchResultsContainer");
    if (!resultsContainer) {
      resultsContainer = document.createElement("div");
      resultsContainer.id = "searchResultsContainer";
      resultsContainer.style.marginTop = "1em";
      searchInput.parentNode.insertBefore(resultsContainer, searchInput.nextSibling);
    }

    let suggestionContainer = document.getElementById("suggestionContainer");
    if (!suggestionContainer) {
      suggestionContainer = document.createElement("div");
      suggestionContainer.id = "suggestionContainer";
      suggestionContainer.style.position = "absolute";
      suggestionContainer.style.backgroundColor = "#fff";
      suggestionContainer.style.color = "#000";
      suggestionContainer.style.border = "1px solid #ccc";
      suggestionContainer.style.maxHeight = "200px";
      suggestionContainer.style.overflowY = "auto";
      suggestionContainer.style.zIndex = "10000";
      suggestionContainer.style.cursor = "pointer";
      suggestionContainer.style.display = "none";
      document.body.appendChild(suggestionContainer);
    }

    const positionSuggestions = () => {
      const rect = searchInput.getBoundingClientRect();
      suggestionContainer.style.width = rect.width + "px";
      suggestionContainer.style.top = rect.bottom + window.scrollY + "px";
      suggestionContainer.style.left = rect.left + window.scrollX + "px";
    };

    window.addEventListener("resize", positionSuggestions);
    window.addEventListener("scroll", positionSuggestions);
    positionSuggestions();

    const clearSuggestions = () => {
      suggestionContainer.innerHTML = "";
      suggestionContainer.style.display = "none";
    };

    const renderSuggestions = (matches) => {
      clearSuggestions();
      if (matches.length === 0) return;

      matches.forEach(game => {
        const div = document.createElement("div");
        div.textContent = game.title;
        div.style.padding = "5px 10px";
        div.style.userSelect = "none";
        div.style.color = "#000";
        div.style.backgroundColor = "#fff";

        div.addEventListener("mouseenter", () => {
          div.style.backgroundColor = "#e1e1e1";
        });

        div.addEventListener("mouseleave", () => {
          div.style.backgroundColor = "#fff";
        });

        div.addEventListener("mousedown", e => {
          e.preventDefault();
          searchInput.value = game.title;
          clearSuggestions();
          window.location.href = game.link;
        });

        suggestionContainer.appendChild(div);
      });
      suggestionContainer.style.display = "block";
      positionSuggestions();
    };

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      if (!query) {
        clearSuggestions();
        return;
      }

      const matches = gameDatabase.filter(game => {
        const normTitle = normalizeTitle(game.title);
        const words = normTitle.split(/\s+/);
        return words.some(word => word.startsWith(query));
      });

      renderSuggestions(matches);
    });

    document.addEventListener("click", e => {
      if (e.target !== searchInput && !suggestionContainer.contains(e.target)) {
        clearSuggestions();
      }
    });

    const clearResults = () => {
      resultsContainer.innerHTML = "";
    };

    const renderResults = (matches) => {
      clearResults();
      if (matches.length === 0) {
        resultsContainer.textContent = "No matching games found.";
        return;
      }
      const ul = document.createElement("ul");
      matches.forEach(game => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = game.link;
        a.textContent = game.title;
        a.style.cursor = "pointer";
        li.appendChild(a);
        ul.appendChild(li);
      });
      resultsContainer.appendChild(ul);
    };

    const searchGame = () => {
      clearSuggestions();
      const query = searchInput.value.toLowerCase().trim();
      if (!query) {
        clearResults();
        return;
      }

      const matches = gameDatabase.filter(game =>
        game.title.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        renderResults(matches);
        return;
      }

      const categoryMatch = categoryDatabase.find(cat =>
        query.includes(cat.title)
      );

      if (categoryMatch) {
        window.location.href = `searchresult.html?category=${encodeURIComponent(categoryMatch.title)}`;
        return;
      }

      clearResults();
      window.location.href = "store.html";
    };

    searchBtn.addEventListener("click", searchGame);

    searchInput.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchGame();
      }
    });
  }
});
