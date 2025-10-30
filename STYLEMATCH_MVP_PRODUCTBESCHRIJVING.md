# **Dressed - MVP Productbeschrijving**

## **Executive Summary**

Dressed is een persoonlijke styling-app die vrouwen (primair 16-35 jaar) helpt om dagelijks de perfecte outfit samen te stellen uit hun eigen kledingkast. De app elimineert de frustratie van "niets om aan te doen" door slimme suggesties te geven op basis van weersomstandigheden, gelegenheid, persoonlijke stijl en actuele modetrends.

---

## **Core Problem & Solution**

**Probleem:** Vrouwen verspillen dagelijks 15-45 minuten aan het zoeken naar de juiste outfit, wat leidt tot stress, frustratie en verminderd zelfvertrouwen - ondanks een volle kleerkast.

**Oplossing:** Een AI-gestuurde outfit assistent die in seconden gepersonaliseerde outfit-suggesties creëert, rekening houdend met weer, gelegenheid, persoonlijke stijl en comfort voorkeuren.

---

## **Target User**

**Primaire doelgroep:**
- Vrouwen 16-35 jaar
- Tieners en jonge professionals
- Mode-bewust maar tijd-arm
- Dagelijks worstelen met outfit keuzes

**Gebruik scenario:**
- Ochtend routine (7:00-9:00)
- Thuis, voor het huis verlaten
- Gemiddeld 5-7x per week gebruik
- Sessie duur: 2-5 minuten

---

## **MVP Feature Set**

### **FASE 1: Core Functionaliteit (Prioriteit A)**

#### 1. **Digitale Kledingkast**

**Functionaliteit:**
- Foto upload van kledingstukken (één item per foto)
- Automatische AI-herkenning en categorisering:
  - Bovenstukken (shirts, blouses, tops, truien)
  - Onderstukken (broeken, rokken, shorts)
  - Jassen & outerwear
  - Schoenen
  - Accessoires (tassen, riemen, sjaals, hoeden)
- Automatische kleurdetectie
- Manuele aanpassing mogelijk (indien AI fout zit)

**Data opslag per item:**
- Categorie
- Kleuren (primair + secundair)
- Seizoen geschiktheid (automatisch gesuggereerd)
- Formaliteit level (casual - semi-formeel - formeel)
- Tags (optioneel): merk, favorieten, nieuw

#### 2. **Smart Outfit Generator**

**Input factoren:**
- Weer van vandaag (temperatuur, neerslag, wind)
- Gelegenheid (dropdown selectie):
  - Dagelijks/werk/school
  - Casual uitje
  - Date night
  - Feest/verjaardag
  - Formeel event
  - Sollicitatie/business meeting
  - Begrafenis
  - Vakantie/weekend trip
  - Sport/actief
- Persoonlijke stijl profiel (zie punt 3)

**Output:**
- **Primaire suggestie:** Meest passende outfit (compleet: bovenstuk + onderstuk + schoenen + jas indien nodig + accessoire optie)
- Visuele presentatie: Foto's van items naast elkaar
- Weer indicator: "Perfect voor 15°C en bewolkt"
- Match score: "95% match met jouw stijl"

**Interactie:**
- ✅ Accepteren → Outfit opgeslagen in "Gedragen vandaag"
- ➡️ Swipe voor alternatieve suggesties (5-10 opties)
- 🔄 Vervang specifiek item (bijv. andere broek kiezen)
- ❤️ Favoriet maken voor later

#### 3. **Persoonlijk Stijl Profiel**

**Onboarding vragenlijst (bij eerste gebruik):**
- **Stijl voorkeur** (meerdere keuzes mogelijk):
  - Minimalistisch & modern
  - Bohemian/vrij
  - Klassiek & chic
  - Streetwear/urban
  - Romantisch & vrouwelijk
  - Edgy/alternatief/emo
  - Sportief & casual
- **Kleuren voorkeur:**
  - Favoriete kleuren
  - Kleuren die je vermijdt
  - Neutraal vs. kleurrijk spectrum
- **Comfort level:**
  - Hakken: ja/soms/nee
  - Strakke kleding: comfortabel/soms/liever niet
  - Rok vs. broek voorkeur
  - Laagjes vs. simpel
- **Body confidence:**
  - Lichaamsdelen die je graag accentueert
  - Lichaamsdelen waar je comfort wilt (optioneel)

**Profiel update:**
- Aanpasbaar in settings
- Leert van gebruiker feedback (swipes en acceptaties)

#### 4. **Weer Integratie**

- Automatische locatie detectie
- Real-time weer data (vandaag + komende 3 dagen)
- Slimme outfit aanpassingen:
  - <10°C: Warme lagen, jassen, laarzen
  - 10-20°C: Transitie items, lichte jas optioneel
  - >20°C: Luchtige stoffen, zomerse items
  - Regen: Regenjas suggestie, waterdichte schoenen
  - Wind: Vermijd rokken/jurken suggestie

---

### **FASE 2: Inspiratie & Trends (Prioriteit B)**

#### 5. **Trend Feed**

**Functionaliteit:**
- Verticale scroll feed (Instagram-style)
- Dagelijkse updates (3-5 nieuwe posts per dag)
- Content types:
  - Catwalk highlights (Fashion Weeks)
  - Street style inspiratie
  - Seizoen trends ("5 must-haves voor herfst 2025")
  - Styling tips ("Hoe draag je oversized blazers")
  - Kleur trends
  - Outfit formules ("3 manieren om een witte blouse te stylen")

**Interactie:**
- 📌 Save voor later (apart tabblad)
- ❤️ Like (verbetert personalisatie)
- 💬 "Shop similar" (toekomstige feature)

**Integratie met Outfit Generator:**
- Tag op outfit suggestie: "Trending Now! 🔥"
- "Try this trend" button → genereert outfit met trend item uit jouw kast
- Notificatie: "Je hebt items voor deze trending look!"

---

### **FASE 3: Kledingkast Beheer (Geleidelijke uitbouw)**

#### 6. **Kast Organisatie**

- Filter opties: categorie, kleur, seizoen, formaliteit
- Zoekfunctie
- "Niet gedragen sinds..." statistieken
- "Meest gedragen items" inzichten

#### 7. **Outfit Historie**

- Kalender view met gedragen outfits
- Voorkomt herhaling: "Je droeg dit 3 dagen geleden"
- "Herdragen" button voor favoriete combinaties

---

## **Technical Requirements**

### **Frontend**

- **Platform:** Responsive web app (desktop + mobiel)
- **Framework:** React (voor interactiviteit en state management)
- **Design:**
  - Modern, minimalistisch interface
  - Zachte, mode-geïnspireerde kleuren (bijv. beige, nude, zwart, goud accenten)
  - Grote, duidelijke knoppen (touch-friendly)
  - Snelle laadtijden (<2 seconden)
  - Swipe gestures voor mobiel

### **Backend & Data**

- **Image Processing:**
  - AI clothing recognition (categorisering + kleurdetectie)
  - Suggestie: Clarifai API of Google Cloud Vision API
- **Weer API:**
  - OpenWeatherMap of WeatherAPI
  - Locatie: Browser geolocation API
- **Data opslag:**
  - Per-user persistent storage (zie storage API instructies)
  - Structuur:
    ```
    user-profile: {stijl, kleuren, comfort, locatie}
    wardrobe-items: [{id, foto, categorie, kleur, seizoen, formaliteit}]
    outfit-history: [{datum, items[], gelegenheid}]
    favorites: {outfits[], trends[]}
    ```

### **AI/Logic**

- **Outfit matching algoritme:**
  - Kleur harmonie (complementair, analoog, monochroom)
  - Stijl consistentie (niet emo top met preppy rok)
  - Formaliteit matching (gelegenheid-appropriate)
  - Weer geschiktheid
  - Seizoen relevantie
- **Learning component:**
  - Track swipes (left = dislike, right = like)
  - Adjust toekomstige suggesties op basis van user behavior

### **Content Management**

- **Trend Feed:**
  - Manual upload (CMS) of API feed (Pinterest, fashion blogs)
  - Dagelijkse scheduling (3-5 posts om 6:00 AM)
  - Image + korte beschrijving + tags

---

## **User Flow - Happy Path**

### **Eerste gebruik:**

1. Welcome screen + app uitleg (30 seconden)
2. Stijl profiel vragenlijst (2-3 minuten)
3. "Voeg je eerste items toe" tutorial
4. Upload 5-10 basis items
5. Genereer eerste outfit → gebruiker is impressed ✨

### **Dagelijks gebruik:**

1. Open app (ochtend)
2. Dashboard toont:
   - Weer van vandaag
   - "Waar ga je naartoe?" dropdown
3. Selecteer gelegenheid → instant outfit suggestie
4. Swipe door alternatieven of accepteer
5. Klaar! (totaal <2 minuten)

### **Inspiratie browse:**

1. Ga naar "Trends" tab
2. Scroll door feed
3. Save interessante looks
4. "Try this trend" → outfit uit eigen kast

---

## **Success Metrics (KPIs)**

- **Engagement:**
  - Dagelijkse actieve gebruikers (DAU)
  - Gemiddelde sessie duur
  - Outfits gegenereerd per week

- **Satisfaction:**
  - Outfit acceptatie rate (hoeveel eerste suggesties worden geaccepteerd)
  - Favorite rate
  - App usage retention (week 1, maand 1)

- **Content:**
  - Trend feed engagement (likes, saves)
  - Gemiddeld aantal items in kledingkast

---

## **Future Enhancements (Post-MVP)**

- Outfit planning (week vooruit)
- Deel outfits met vrienden (social component)
- "Shop the look" integratie (affiliate)
- Virtual try-on (AR filter)
- Packing lists voor reizen
- Sustainability score (hergebruik tracking)
- Stylist consulatie (premium feature)

---

## **Design Mockup Beschrijving**

### **Home Screen:**
- Top: Weer widget (icoon, temperatuur, locatie)
- Hero: "Waar ga je vandaag naartoe?" dropdown
- CTA button: "Genereer Outfit ✨"
- Bottom nav: Home | Kledingkast | Trends | Profiel

### **Outfit Generator Screen:**
- Center: 4 foto's (bovenstuk, onderstuk, schoenen, accessoire)
- Top: Match score + weer info
- Bottom: ✅ Dragen | ➡️ Volgende | 🔄 Vervang item | ❤️ Favoriet

### **Trend Feed:**
- Verticale scroll
- Card design: Grote foto + titel + kort tekst + Like/Save buttons

---

**Gemaakt door:** Katie
**Datum:** 30 Oktober 2025 
**Versie:** MVP 1.0
**App naam:** Dressed
