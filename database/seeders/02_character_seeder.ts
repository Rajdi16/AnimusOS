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
                bio: 'A Master Assassin of the Levantine Brotherhood who revolutionized the Order.'
            },
            // The Italian Brotherhood
            {
                name: 'Ezio Auditore da Firenze',
                gameId: ac2.id,
                affiliation: 'Assassin',
                isPlayable: true,
                bio: 'A Florentine nobleman who became the Mentor of the Italian Brotherhood.'
            },
            // The Colonial Brotherhood
            {
                name: 'Connor (Ratonhnhaké:ton)',
                gameId: ac3.id,
                affiliation: 'Assassin',
                isPlayable: true,
                bio: 'A Master Assassin of the Colonial Brotherhood during the American Revolutionary War.'
            },
            {
                name: 'Haytham Kenway',
                gameId: ac3.id,
                affiliation: 'Templar',
                isPlayable: true,
                bio: 'First Grand Master of the Colonial Rite of the Templar Order. Father of Connor.'
            },
            {
                name: 'Edward Kenway',
                gameId: ac4.id,
                affiliation: 'Pirate / Assassin',
                isPlayable: true,
                bio: 'A Welsh privateer-turned-pirate and member of the Assassin Brotherhood. Grandfather of Connor.'
            },
            {
                name: 'Shay Patrick Cormac',
                gameId: rogue.id,
                affiliation: 'Templar',
                isPlayable: true,
                bio: 'An Assassin who defected to the Templar Order after a catastrophic disaster.'
            },
            {
                name: 'Arno Dorian',
                gameId: unity.id,
                affiliation: 'Assassin',
                isPlayable: true,
                bio: 'A French-Austrian Assassin active during the French Revolution in Paris.'
            },
            {
                name: 'Jacob Frye',
                gameId: syndicate.id,
                affiliation: 'Assassin',
                isPlayable: true,
                bio: 'A Master Assassin of the British Brotherhood. Co-founder of the Rooks.'
            },
            {
                name: 'Evie Frye',
                gameId: syndicate.id,
                affiliation: 'Assassin',
                isPlayable: true,
                bio: 'A Master Assassin of the British Brotherhood and twin sister to Jacob.'
            },
            // The Antiquity Trilogy
            {
                name: 'Bayek of Siwa',
                gameId: origins.id,
                affiliation: 'Hidden One',
                isPlayable: true,
                bio: 'The last Medjay of Egypt and co-founder of the Hidden Ones.'
            },
            {
                name: 'Aya (Amunet)',
                gameId: origins.id,
                affiliation: 'Hidden One',
                isPlayable: true,
                bio: 'Co-founder of the Hidden Ones who established a bureau in Rome.'
            },
            {
                name: 'Kassandra',
                gameId: odyssey.id,
                affiliation: 'Misthios',
                isPlayable: true,
                bio: 'A Spartan mercenary operating during the Peloponnesian War. The Eagle Bearer.'
            },
            {
                name: 'Alexios',
                gameId: odyssey.id,
                affiliation: 'Misthios',
                isPlayable: true,
                bio: 'A Spartan mercenary operating during the Peloponnesian War. The Eagle Bearer.'
            },
            {
                name: 'Eivor Varinsdottir',
                gameId: valhalla.id,
                affiliation: 'Raven Clan',
                isPlayable: true,
                bio: 'A Viking shield-maiden who led her clan to settle in England during the 9th Century.'
            },
            // The Modern Era Games
            {
                name: 'Basim Ibn Ishaq',
                gameId: mirage.id,
                affiliation: 'Hidden One',
                isPlayable: true,
                bio: 'A Master Assassin of the Hidden Ones operating in 9th-century Baghdad.'
            },
            {
                name: 'Naoe',
                gameId: shadows.id,
                affiliation: 'Assassin',
                isPlayable: true,
                bio: 'A skilled shinobi from Iga Province seeking to fulfill her destiny in Sengoku-era Japan.'
            },
            {
                name: 'Yasuke',
                gameId: shadows.id,
                affiliation: 'Samurai',
                isPlayable: true,
                bio: 'A powerful African samurai serving under the legendary Oda Nobunaga.'
            }
        ])
    }
}