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

Kontaktų forma siunčia `POST /api/uzklausa`. Serveris persiunčia JSON į `INQUIRY_API_URL`. Kol adresas nenurodytas, forma to nevaizduoja kaip sėkmės ir palieka el. paštą `info@domussolis.org`.

Persiunčiami laukai: `name`, `email`, `city`, `organization`, `topic`, `message`, `sentAt`.

Kintamųjų pavyzdys yra `.env.example`. Hostingerio skydelyje juos reikia nurodyti prieš diegimą.
