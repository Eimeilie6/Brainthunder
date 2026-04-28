# Brainthunder
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Brainthunder - Arbeitsblätter Download</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        header {
            text-align: center;
            color: white;
            margin-bottom: 40px;
        }

        header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        main {
            max-width: 1200px;
            margin: 0 auto;
        }

        .search-bar {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
        }

        #searchInput {
            width: 100%;
            max-width: 400px;
            padding: 12px 20px;
            border: none;
            border-radius: 25px;
            font-size: 1rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .filters {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .filter-btn {
            padding: 10px 20px;
            border: 2px solid white;
            background-color: transparent;
            color: white;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .filter-btn:hover {
            background-color: white;
            color: #667eea;
            transform: scale(1.05);
        }

        .filter-btn.active {
            background-color: white;
            color: #667eea;
        }

        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .grid-item {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .grid-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .grid-item-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .grid-item-header h2 {
            font-size: 1.3rem;
        }

        .grid-item-category {
            background: rgba(255, 255, 255, 0.3);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
        }

        .grid-item-content {
            padding: 20px;
        }

        .grid-item-description {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.5;
        }

        .download-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .download-btn:hover {
            transform: scale(1.05);
        }

        @media (max-width: 768px) {
            header h1 {
                font-size: 1.8rem;
            }

            .grid-container {
                grid-template-columns: 1fr;
            }

            .filters {
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>📚 Brainthunder</h1>
        <p>Arbeitsblätter gratis zum Herunterladen</p>
    </header>

    <main>
        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Arbeitsblatt suchen...">
        </div>

        <div class="filters">
            <button class="filter-btn active" data-category="alle">Alle</button>
            <button class="filter-btn" data-category="mathe">Mathematik</button>
            <button class="filter-btn" data-category="englisch">Englisch</button>
            <button class="filter-btn" data-category="deutsch">Deutsch</button>
        </div>

        <div class="grid-container" id="worksheetGrid"></div>
    </main>

    <script>
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

            if (currentCategory !== 'alle') {
                filtered = filtered.filter(w => w.category === currentCategory);
            }

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
    </script>
</body>
</html>

