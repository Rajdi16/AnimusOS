import { DateTime } from 'luxon'
import Game from '#models/game'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { time } from 'console'

export default class extends BaseSeeder {
  async run() {
    const games = [
      {
        title: "Assassin's Creed",
        era: 'Third Crusade',
        description: 'The beginning of the series featuring Altaïr Ibn-La\'Ahad.',
        releaseDate: '2007-11-13',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/6/6a/Accover.jpg/revision/latest?cb=20210519104609'
      },
      {
        title: "Assassin's Creed II",
        era: 'Italian Renaissance',
        description: 'The legendary journey of Ezio Auditore da Firenze begins.',
        releaseDate: '2009-11-17',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/0/09/AC2coverHighRes.jpg/revision/latest?cb=20120706023159'
      },
      {
        title: "Assassin's Creed: Brotherhood",
        era: 'Italian Renaissance (Rome)',
        description: 'Ezio rebuilds the Brotherhood in the heart of Rome to defeat the Borgia.',
        releaseDate: '2010-11-16',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/2/2a/Assassins_Creed_brotherhood_cover.jpg/revision/latest?cb=20210519124648'
      },
      {
        title: "Assassin's Creed: Revelations",
        era: 'Ottoman Empire',
        description: 'Ezio travels to Constantinople to uncover the secrets of Altaïr.',
        releaseDate: '2011-11-15',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/5/51/ACR_Boxart.jpg/revision/latest?cb=20110703195808'
      },
      {
        title: "Assassin's Creed III",
        era: 'American Revolution',
        description: 'The story of Connor Kenway and the fight for freedom in the New World.',
        releaseDate: '2012-10-30',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/e/ec/Assassin%27s_Creed_III_Cover.jpg/revision/latest?cb=20120812182759'
      },
      {
        title: "Assassin's Creed IV: Black Flag",
        era: 'Golden Age of Piracy',
        description: 'The swashbuckling adventures of the pirate-assassin Edward Kenway.',
        releaseDate: '2013-10-29',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/6/6d/Assassin%27s_Creed_IV_Black_Flag.jpg/revision/latest?cb=20220912072218'
      },
      {
        title: "Assassin's Creed Rogue",
        era: 'Seven Years\' War',
        description: 'Shay Patrick Cormac\'s betrayal and transition into an Assassin Hunter.',
        releaseDate: '2014-11-11',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/e/e5/Assassin%27s_Creed_Rogue_-_Cover_Art.jpeg/revision/latest?cb=20140809155555'
      },
      {
        title: "Assassin's Creed Unity",
        era: 'French Revolution',
        description: 'Arno Dorian navigates the chaos of the French Revolution in Paris.',
        releaseDate: '2014-11-11',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/0/0b/Assassin%27s_Creed_Unity_Cover.jpg/revision/latest?cb=20220912072010'
      },
      {
        title: "Assassin's Creed Syndicate",
        era: 'Industrial Revolution',
        description: 'Twins Jacob and Evie Frye take back London from Templar control.',
        releaseDate: '2015-10-23',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/c/c2/ACS_Box_art_icon.jpg/revision/latest?cb=20150512162954'
      },
      {
        title: "Assassin's Creed Origins",
        era: 'Ptolemaic Egypt',
        description: 'The tragic origins of the Hidden Ones forged by Bayek and Aya.',
        releaseDate: '2017-10-27',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/2/2f/ACOrigins_cover.jpg/revision/latest?cb=20200127122455'
      },
      {
        title: "Assassin's Creed Odyssey",
        era: 'Peloponnesian War',
        description: 'A grand adventure as a Spartan Misthios holding the Spear of Leonidas.',
        releaseDate: '2018-10-05',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/5/5d/ACOD_Kassandra_Box_Art.jpg/revision/latest?cb=20231029162433'
      },
      {
        title: "Assassin's Creed Valhalla",
        era: 'Viking Age',
        description: 'The saga of Eivor and the Viking expansion into the British Isles.',
        releaseDate: '2020-11-10',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/6/65/AC_Valhalla_cover.jpg/revision/latest/scale-to-width-down/1000?cb=20200430195147'
      },
      {
        title: "Assassin's Creed Mirage",
        era: '9th Century Baghdad',
        description: 'The coming-of-age story of Basim Ibn Ishaq joining the Hidden Ones.',
        releaseDate: '2023-10-05',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/3/3a/AC_Mirage_cover.png/revision/latest?cb=20220920212825'
      },
      {
        title: "Assassin's Creed Shadows",
        era: 'Sengoku Period Japan',
        description: 'The intertwined destinies of shinobi Naoe and samurai Yasuke.',
        releaseDate: '2025-02-14',
        imageUrl: 'https://static.wikia.nocookie.net/assassinscreed/images/2/29/AC_Shadows_Cover.png/revision/latest?cb=20250725151217'
      },

    ]

    await Game.createMany(
      games.map((game) => ({
        ...game,
        releaseDate: DateTime.fromISO(game.releaseDate),
      }))
    )
  }
}