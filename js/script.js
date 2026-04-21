// Arbeitsblätter Daten
const worksheets = [
    // Mathematik
    {
        id: 1,
        title: "Bruchrechnung",
        category: "mathe",
        description: "Grundlagen der Bruchrechnung mit Übungsaufgaben",
        file: "bruchrechnung.pdf"
    },
    {
        id: 2,
        title: "Gleichungen lösen",
        category: "mathe",
        description: "Lineare und quadratische Gleichungen",
        file: "gleichungen.pdf"
    },
    {
        id: 3,
        title: "Geometrie Basics",
        category: "mathe",
        description: "Flächen, Volumen und Winkel berechnen",
        file: "geometrie.pdf"
    },
    {
        id: 4,
        title: "Prozentrechnung",
        category: "mathe",
        description: "Prozente und Zinsrechnung",
        file: "prozente.pdf"
    },

    // Englisch
    {
        id: 5,
        title: "Present Simple",
        category: "englisch",
        description: "Grundzeitentraining für Anfänger",
        file: "present-simple.pdf"
    },
    {
        id: 6,
        title: "Vokabeln Tiere",
        category: "englisch",
        description: "Englische Vokabeln zum Thema Tiere",
        file: "vokabeln-tiere.pdf"
    },
    {
        id: 7,
        title: "Past Simple",
        category: "englisch",
        description: "Vergangenheit im Englischen üben",
        file: "past-simple.pdf"
    },
    {
        id: 8,
        title: "Phrasal Verbs",
        category: "englisch",
        description: "Englische Phrasal Verbs mit Beispielen",
        file: "phrasal-verbs.pdf"
    },

    // Deutsch
    {
        id: 9,
        title: "Grammatik Grundlagen",
        category: "deutsch",
        description: "Nominativ, Akkusativ, Dativ, Genitiv",
        file: "grammatik.pdf"
    },
    {
        id: 10,
        title: "Rechtschreibung",
        category: "deutsch",
        description: "Häufige Fehler und Tipps zur Rechtschreibung",
        file: "rechtschreibung.pdf"
    },
    {
        id: 11,
        title: "Literaturanalyse",
        category: "deutsch",
        description: "Methoden zur Analyse von Literaturwerken",
        file: "literaturanalyse.pdf"
    },
    {
        id: 12,
        title: "Kommasetzung",
        category: "deutsch",
        description: "Alle Regeln der Kommasetzung im Überblick",
        file: "kommasetzung.pdf"
    }
];

// DOM Elemente
const worksheetGrid = document.getElementById('worksheetGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentCategory = 'alle';
let currentSearch = '';

// Arbeitsblätter anzeigen
function displayWorksheets(filtered = worksheets) {
    worksheetGrid.innerHTML = '';

    if (filtered.length === 0) {
        worksheetGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; font-size: 1.1rem; color: #999;">Keine Arbeitsblätter gefunden.</p>';
        return;
    }

    filtered.forEach(worksheet => {
        const card = document.createElement('div');
        card.className = 'grid-item';
        card.innerHTML = `
            <div class="grid-item-header">
                <h2>${worksheet.title}</h2>
                <div class="grid-item-category">${getCategoryLabel(worksheet.category)}</div>
            </div>
            <div class="grid-item-content">
                <p class="grid-item-description">${worksheet.description}</p>
                <button class="download-btn" onclick="downloadPDF('${worksheet.file}', '${worksheet.title}')">
                    📥 PDF Herunterladen
                </button>
            </div>
        `;
        worksheetGrid.appendChild(card);
    });
}

// Kategorie Label
function getCategoryLabel(category) {
    const labels = {
        mathe: 'Mathematik',
        englisch: 'Englisch',
        deutsch: 'Deutsch'
    };
    return labels[category] || category;
}

// PDF Download Simulation
function downloadPDF(filename, title) {
    alert(`📥 "${title}" wird heruntergeladen!\n\nDatei: ${filename}\n\nPlatziere deine PDF-Dateien im Ordner: /pdfs/${getCurrentCategoryFolder(title)}/`);
    
    // Hier könnte später echtes Download-Handling hinzugefügt werden:
    // const link = document.createElement('a');
    // link.href = `pdfs/mathe/${filename}`;
    // link.download = filename;
    // link.click();
}

// Aktuelle Kategorie aus Titel bestimmen
function getCurrentCategoryFolder(title) {
    const currentSheets = worksheets.filter(w => w.title === title);
    if (currentSheets.length > 0) {
        return currentSheets[0].category;
    }
    return 'mathe';
}

// Filter nach Kategorie
function filterByCategory(category) {
    currentCategory = category;
    applyFilters();
}

// Suche implementieren
function filterBySearch(searchTerm) {
    currentSearch = searchTerm.toLowerCase();
    applyFilters();
}

// Filter kombinieren
function applyFilters() {
    let filtered = worksheets;

    // Kategorie Filter
    if (currentCategory !== 'alle') {
        filtered = filtered.filter(w => w.category === currentCategory);
    }

    // Suchfilter
    if (currentSearch) {
        filtered = filtered.filter(w => 
            w.title.toLowerCase().includes(currentSearch) ||
            w.description.toLowerCase().includes(currentSearch)
        );
    }

    displayWorksheets(filtered);
}

// Event Listener
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterByCategory(btn.dataset.category);
    });
});

searchInput.addEventListener('input', (e) => {
    filterBySearch(e.target.value);
});

// Initial Load
displayWorksheets();