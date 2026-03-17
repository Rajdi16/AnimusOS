import Game from '#models/game'
import Character from '#models/character'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
    async run() {
        const ac1 = await Game.findByOrFail('title', "Assassin's Creed")
        const ac2 = await Game.findByOrFail('title', "Assassin's Creed II")
        const ac3 = await Game.findByOrFail('title', "Assassin's Creed III")
        const ac4 = await Game.findByOrFail('title', "Assassin's Creed IV: Black Flag")
        const rogue = await Game.findByOrFail('title', "Assassin's Creed Rogue")
        const unity = await Game.findByOrFail('title', "Assassin's Creed Unity")
        const syndicate = await Game.findByOrFail('title', "Assassin's Creed Syndicate")
        const origins = await Game.findByOrFail('title', "Assassin's Creed Origins")
        const odyssey = await Game.findByOrFail('title', "Assassin's Creed Odyssey")
        const valhalla = await Game.findByOrFail('title', "Assassin's Creed Valhalla")
        const mirage = await Game.findByOrFail('title', "Assassin's Creed Mirage")
        const shadows = await Game.findByOrFail('title', "Assassin's Creed Shadows")

        // 2. INJECT GENETIC PROFILES
        await Character.createMany([
            // The Levantine Brotherhood
            {
                name: "Altaïr Ibn-La'Ahad",
                gameId: ac1.id,
                affiliation: 'Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/altair.png',
                bio: 'A Master Assassin of the Levantine Brotherhood who revolutionized the Order.'
            },
            // The Italian Brotherhood
            {
                name: 'Ezio Auditore da Firenze',
                gameId: ac2.id,
                affiliation: 'Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/ezio.png',
                bio: 'A Florentine nobleman who became the Mentor of the Italian Brotherhood.'
            },
            // The Colonial Brotherhood
            {
                name: 'Connor (Ratonhnhaké:ton)',
                gameId: ac3.id,
                affiliation: 'Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/connor.png',
                bio: 'A Master Assassin of the Colonial Brotherhood during the American Revolutionary War.'
            },
            {
                name: 'Haytham Kenway',
                gameId: ac3.id,
                affiliation: 'Templar',
                isPlayable: true,
                imageUrl: '/images/characters/haytham.png',
                bio: 'First Grand Master of the Colonial Rite of the Templar Order. Father of Connor.'
            },
            {
                name: 'Edward Kenway',
                gameId: ac4.id,
                affiliation: 'Pirate / Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/edward.png',
                bio: 'A Welsh privateer-turned-pirate and member of the Assassin Brotherhood. Grandfather of Connor.'
            },
            {
                name: 'Shay Patrick Cormac',
                gameId: rogue.id,
                affiliation: 'Templar',
                isPlayable: true,
                imageUrl: '/images/characters/shay.png',
                bio: 'An Assassin who defected to the Templar Order after a catastrophic disaster.'
            },
            {
                name: 'Arno Dorian',
                gameId: unity.id,
                affiliation: 'Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/arno.png',
                bio: 'A French-Austrian Assassin active during the French Revolution in Paris.'
            },
            {
                name: 'Jacob Frye',
                gameId: syndicate.id,
                affiliation: 'Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/jacob.png',
                bio: 'A Master Assassin of the British Brotherhood. Co-founder of the Rooks.'
            },
            {
                name: 'Evie Frye',
                gameId: syndicate.id,
                affiliation: 'Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/evie.png',
                bio: 'A Master Assassin of the British Brotherhood and twin sister to Jacob.'
            },
            // The Antiquity Trilogy
            {
                name: 'Bayek of Siwa',
                gameId: origins.id,
                affiliation: 'Hidden One',
                isPlayable: true,
                imageUrl: '/images/characters/bayek.png',
                bio: 'The last Medjay of Egypt and co-founder of the Hidden Ones.'
            },
            {
                name: 'Aya (Amunet)',
                gameId: origins.id,
                affiliation: 'Hidden One',
                isPlayable: true,
                imageUrl: '/images/characters/aya.png',
                bio: 'Co-founder of the Hidden Ones who established a bureau in Rome.'
            },
            {
                name: 'Kassandra',
                gameId: odyssey.id,
                affiliation: 'Misthios',
                isPlayable: true,
                imageUrl: '/images/characters/kassandra.png',
                bio: 'A Spartan mercenary operating during the Peloponnesian War. The Eagle Bearer.'
            },
            {
                name: 'Alexios',
                gameId: odyssey.id,
                affiliation: 'Misthios',
                isPlayable: true,
                imageUrl: '/images/characters/alexios.png',
                bio: 'A Spartan mercenary operating during the Peloponnesian War. The Eagle Bearer.'
            },
            {
                name: 'Eivor Varinsdottir',
                gameId: valhalla.id,
                affiliation: 'Raven Clan',
                isPlayable: true,
                imageUrl: '/images/characters/eivor.png',
                bio: 'A Viking shield-maiden who led her clan to settle in England during the 9th Century.'
            },
            // The Modern Era Games
            {
                name: 'Basim Ibn Ishaq',
                gameId: mirage.id,
                affiliation: 'Hidden One',
                isPlayable: true,
                imageUrl: '/images/characters/basim.png',
                bio: 'A Master Assassin of the Hidden Ones operating in 9th-century Baghdad.'
            },
            {
                name: 'Naoe',
                gameId: shadows.id,
                affiliation: 'Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/naoe.png',
                bio: 'A skilled shinobi from Iga Province seeking to fulfill her destiny in Sengoku-era Japan.'
            },
            {
                name: 'Yasuke',
                gameId: shadows.id,
                affiliation: 'Samurai',
                isPlayable: true,
                imageUrl: '/images/characters/yasuke.png',
                bio: 'A powerful African samurai serving under the legendary Oda Nobunaga.'
            },// --- MODERN DAY (ABSTERGO) ---
        ])

        await Character.createMany([
            {
                name: 'Desmond Miles',
                gameId: ac1.id, // Make sure this matches your AC1 variable
                affiliation: 'Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/desmond.png',
                bio: 'Subject 17. A modern-day bartender who was kidnapped by Abstergo Industries to explore the genetic memories of his ancestors.'
            },
            {
                name: 'Dr. Warren Vidic',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'Lead scientist of the Animus Project at Abstergo Industries and a high-ranking member of the Templar Order.'
            },
            {
                name: 'Lucy Stillman',
                gameId: ac1.id,
                affiliation: 'Assassin',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'An undercover Assassin working as Dr. Vidic\'s assistant at Abstergo to protect Desmond.'
            },
            // --- THE LEVANTINE BROTHERHOOD ---
            {
                name: "Altaïr Ibn-La'Ahad",
                gameId: ac1.id,
                affiliation: 'Assassin',
                isPlayable: true,
                imageUrl: '/images/characters/altair.png',
                bio: 'A disgraced Master Assassin seeking redemption by hunting the nine Templar leaders during the Third Crusade.'
            },
            {
                name: 'Al Mualim',
                gameId: ac1.id,
                affiliation: 'Assassin / Templar',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'The Mentor of the Levantine Brotherhood based in Masyaf. He secretly possesses a Piece of Eden.'
            },
            {
                name: 'Malik Al-Sayf',
                gameId: ac1.id,
                affiliation: 'Assassin',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'An Assassin who lost his brother and his left arm due to Altaïr\'s arrogance. He serves as the Rafiq of the Jerusalem Bureau.'
            },
            {
                name: 'Kadar Al-Sayf',
                gameId: ac1.id,
                affiliation: 'Assassin',
                isPlayable: false,
                bio: 'Malik\'s younger brother who was tragically killed in Solomon\'s Temple.'
            },
            {
                name: 'Abbas Sofian',
                gameId: ac1.id,
                affiliation: 'Assassin',
                isPlayable: false,
                bio: 'A bitter rival to Altaïr within the Brotherhood who holds a deep-seated grudge.'
            },
            // --- THE TEMPLAR ORDER (THE NINE TARGETS) ---
            {
                name: 'Tamir',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'A wealthy black market merchant in Damascus who supplies weapons to both the Saracens and Crusaders.'
            },
            {
                name: 'Garnier de Naplouse',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'The Grand Master of the Knights Hospitalier in Acre, who performs twisted medical experiments on his patients.'
            },
            {
                name: 'Talal',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'A cunning slave trader in Jerusalem who supplies test subjects for Templar experiments.'
            },
            {
                name: "Abu'l Nuqoud",
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'The wealthy Merchant King of Damascus who funds the Templar Order.'
            },
            {
                name: 'William of Montferrat',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'The arrogant regent of Acre who plans to kill King Richard to seize control of the city.'
            },
            {
                name: 'Majd Addin',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'A tyrant who seized power in Jerusalem, ruling through fear and public executions.'
            },
            {
                name: 'Sibrand',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'The paranoid Grand Master of the Teutonic Order, tasked with blockading the ports of Acre.'
            },
            {
                name: 'Jubair al Hakim',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'Saladin\'s chief scholar in Damascus, who burns the city\'s books to erase history and control the populace.'
            },
            {
                name: 'Robert de Sablé',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'The Grand Master of the Templar Order and Altaïr\'s ultimate target.'
            },
            // --- HISTORICAL FIGURES ---
            {
                name: 'King Richard the Lionheart',
                gameId: ac1.id,
                affiliation: 'Crusader',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'The King of England and leader of the Crusader army in the Holy Land.'
            },
            {
                name: 'Maria Thorpe',
                gameId: ac1.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'A fiercely loyal Templar and Robert de Sablé\'s body double. She later becomes Altaïr\'s wife.'
            },
            // --- THE AUDITORE FAMILY ---
            {
                name: 'Mario Auditore',
                gameId: ac2.id,
                affiliation: 'Assassin',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'Ezio\'s uncle and ruler of Monteriggioni. He introduced Ezio to the ways of the Brotherhood.'
            },
            {
                name: 'Giovanni Auditore',
                gameId: ac2.id,
                affiliation: 'Assassin',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'Ezio\'s father and a high-ranking Assassin who worked as a banker for the Medici family.'
            },
            {
                name: 'Claudia Auditore',
                gameId: ac2.id,
                affiliation: 'Assassin',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'Ezio\'s sister who took over the financial management of Villa Auditore.'
            },

            // --- THE ITALIAN ALLIES ---
            {
                name: 'Leonardo da Vinci',
                gameId: ac2.id,
                affiliation: 'Unspecified',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'A legendary polymath and Ezio\'s closest friend who deciphered the Codex pages.'
            },
            {
                name: 'Niccolò Machiavelli',
                gameId: ac2.id,
                affiliation: 'Assassin',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'A philosopher and strategist who helped lead the Italian Brotherhood.'
            },
            {
                name: 'Caterina Sforza',
                gameId: ac2.id,
                affiliation: 'Unspecified',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'The Countess of Forlì and Imola. A powerful noblewoman and ally to the Assassins.'
            },
            {
                name: 'La Volpe',
                gameId: ac2.id,
                affiliation: 'Assassin',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'The mysterious leader of the Florentine Thieves Guild.'
            },
            {
                name: 'Bartolomeo d\'Alviano',
                gameId: ac2.id,
                affiliation: 'Assassin',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'A mercenary commander and member of the Brotherhood in Venice.'
            },
            {
                name: 'Lorenzo de\' Medici',
                gameId: ac2.id,
                affiliation: 'Unspecified',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'The ruler of Florence and a powerful ally to the Auditore family.'
            },

            // --- THE SPAWNED CONSPIRACY (Antagonists) ---
            {
                name: 'Rodrigo Borgia',
                gameId: ac2.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'Known as "The Spaniard." Grand Master of the Templar Order and Ezio\'s arch-nemesis.'
            },
            {
                name: 'Uberto Alberti',
                gameId: ac2.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'The corrupt Gonfaloniere who betrayed the Auditore family.'
            },
            {
                name: 'Vieri de\' Pazzi',
                gameId: ac2.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'A young and arrogant noble of the Pazzi family and Ezio\'s early rival.'
            },
            {
                name: 'Francesco de\' Pazzi',
                gameId: ac2.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'A high-ranking Templar who orchestrated the Pazzi Conspiracy against the Medici.'
            },
            {
                name: 'Emilio Barbarigo',
                gameId: ac2.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'A merchant prince who used Templar influence to control the city of Venice.'
            },
            {
                name: 'Marco Barbarigo',
                gameId: ac2.id,
                affiliation: 'Templar',
                isPlayable: false,
                imageUrl: '/images/characters/templar_silhouette.png',
                bio: 'The Templar-installed Doge of Venice.'
            },
            {
                name: 'Girolamo Savonarola',
                gameId: ac2.id,
                affiliation: 'Unspecified',
                isPlayable: false,
                imageUrl: '/images/characters/assassin_silhouette.png',
                bio: 'A radical monk who used a Piece of Eden to seize control of Florence.'
            }

        ])
    }
}
