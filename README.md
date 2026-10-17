# dialogai.lt

Viešojo dialogo svetainė. Next.js puslapis, stiliai Tailwind klasėmis. Šaka skirta šiam perkėlimui. Į `main` ji jungiama tik tada, kai Hostingerio planas paleidžia Node.js programą.

## Paleisti vietoje

Reikia Node.js 20 ar naujesnės versijos.

```bash
npm install
npm run dev
```

Svetainė atsiveria [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run build
npm start
```

## Straipsniai

`lib/articles.ts` ima tekstus iš `ARTICLES_API_URL`. Kol kintamojo nėra, rodomi vietiniai tekstai iš `lib/article-source.ts`.

Šaltinis grąžina JSON masyvą arba objektą `{ "articles": [...] }`. Įrašo laukai: `slug`, `title`, `excerpt`, `body`, `publishedAt`. `body` pastraipos atskiriamos tuščia eilute. `slug` sudaro lotyniškos raidės, skaičiai ir brūkšneliai.

## Užklausos

Mygtukas „Paprašyti dialogo“ atidaro langą. Forma siunčia `POST /api/uzklausa`. Serveris persiunčia JSON į `https://domussolis.org/api/v1/inquiries` (arba `INQUIRY_API_URL`) su antrašte `Authorization: Bearer` iš `INQUIRY_API_TOKEN`. Raktas lieka serveryje ir į naršyklės kodą nepatenka.

Laukai: `name`, `email`, `audience` (`person`, `school`, `community`, `organization`), nebūtina `organization` (tik kai kreipiasi ne asmuo), `message`. Temos lauko nėra. Pridedami `source` (`dialogai.lt`) ir tuščias `website`. Sėkmė yra atsakymas 201. Lauko klaidos ateina kaip 422. Kol rakto nėra, langas to nevadina sėkme ir palieka el. paštą `info@domussolis.org`.

Kintamųjų pavyzdys yra `.env.example`. Hostingerio skydelyje juos reikia nurodyti prieš diegimą. Raktas nėra `NEXT_PUBLIC_`.
