const fs = require('fs');
const https = require('https');

const books = [
  "Assassin's Creed Renaissance",
  "Assassin's Creed Brotherhood novel",
  "Assassin's Creed The Secret Crusade",
  "Assassin's Creed Revelations novel",
  "Assassin's Creed Forsaken",
  "Assassin's Creed Black Flag novel",
  "Assassin's Creed Unity novel",
  "Assassin's Creed Underworld",
  "Assassin's Creed Desert Oath",
  "Assassin's Creed Odyssey novel",
  "Assassin's Creed Geirmund's Saga",
  "Assassin's Creed Heresy",
  "Assassin's Creed The Ming Storm",
  "Assassin's Creed The Desert of Night",
  "Assassin's Creed The Witches of Edo",
  "Assassin's Creed Children of Highlands",
  "Assassin's Creed The Barbarian Knight",
  "Assassin's Creed Last Descendants",
  "Assassin's Creed Tomb of the Khan",
  "Assassin's Creed Fate of the Gods",
  "Assassin's Creed The Golden City",
  "Assassin's Creed Sword of White Horse",
  "Assassin's Creed The Magus Conspiracy",
  "Assassin's Creed The Resurrection Plot",
  "Assassin's Creed Daughter of No One",
  "Blade of Shao Jun 1",
  "Blade of Shao Jun 2",
  "Blade of Shao Jun 3",
  "Blade of Shao Jun 4",
  "Assassin's Creed Valhalla Blood Brothers",
  "Assassin's Creed Valhalla Song of Glory",
  "Assassin's Creed Conspiracies",
  "Assassin's Creed Bloodstone",
  "Assassin's Creed Comic Titan",
  "Assassin's Creed Templars Comic",
  "Assassin's Creed Locus",
  "Assassin's Creed Reflections",
  "Assassin's Creed Origins Comic",
  "Assassin's Creed Uprising",
  "Abstergo Employee Manual"
];

async function searchCover(title) {
  return new Promise((resolve, reject) => {
    const query = encodeURIComponent(title);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.items && parsed.items.length > 0) {
            const thumbnail = parsed.items[0].volumeInfo.imageLinks?.thumbnail;
            if (thumbnail) {
              // Convert to https and remove zoom=1/edge=curl to get better quality
              let betterImage = thumbnail.replace('http:', 'https:').replace('&edge=curl', '');
              resolve(betterImage);
              return;
            }
          }
          resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', (e) => resolve(null));
  });
}

async function main() {
  const results = {};
  for (let title of books) {
    console.log(`Fetching ${title}...`);
    const cover = await searchCover(title);
    if (cover) {
      results[title] = cover;
    }
    // rate limit
    await new Promise(r => setTimeout(r, 500));
  }
  
  fs.writeFileSync('covers.json', JSON.stringify(results, null, 2));
  console.log('Done mapping covers!');
}

main();
