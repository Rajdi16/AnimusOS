import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Article from '#models/article'
import Game from '#models/game'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await db.from('articles').delete()

    const shadows = await Game.findBy('title', "Assassin's Creed Shadows")
    const unity = await Game.findBy('title', "Assassin's Creed Unity")

    await Article.createMany([
      {
        title: "Assassin’s Creed Shadows: Claws of Awaji Expansion",
        excerpt: "Ubisoft launches the first major expansion for Shadows, featuring a new island region, enemies, and deep-dive content for Naoe.",
        content: "The 'Claws of Awaji' expansion for Assassin's Creed Shadows is now available. This major content update introduces a brand new island region to explore, offering over 10 hours of additional gameplay. Players will face new challenges, encounter unique enemies, and unlock powerful gear and abilities for Naoe. The expansion also features a new narrative arc that delves deeper into the shadows of feudal Japan.",
        imageUrl: "/images/ac-shadows.jpg",
        badge: "EXPANSION",
        badgeColor: "danger",
        publishedAt: DateTime.fromISO('2026-03-10T10:00:00.000Z'),
        gameId: shadows?.id
      },
      {
        title: "Assassin's Creed: Into 2026 Roadmap",
        excerpt: "Ubisoft reveals the roadmap for the franchise, centering on the Animus Hub and future expansions for Shadows and beyond.",
        content: "As part of the 'Assassin's Creed: Into 2026' event, Ubisoft has outlined the roadmap for the franchise over the coming year. The focus remains on expanding the Animus Hub as a central platform for all future experiences. Key milestones include the release of multiple expansions for Shadows, further details on Project Hexe, and the first beta tests for the Codename Invictus multiplayer experience.",
        imageUrl: "/images/ac-banner.jpg",
        badge: "ROADMAP",
        badgeColor: "archived",
        publishedAt: DateTime.fromISO('2026-03-15T09:00:00.000Z'),
        gameId: shadows?.id
      },
      {
        title: "Assassin's Creed Unity: 60 FPS Protocol Engaged",
        excerpt: "Abstergo engineers successfully synchronize the Unity simulation at 60 FPS for next-gen consoles. Revisit Paris with unprecedented clarity.",
        content: "In a surprise update for initiates, Assassin's Creed Unity has received a technical overhaul for PlayStation 5 and Xbox Series X|S. The simulation now runs at a stable 60 FPS, providing the smoothest experience of the French Revolution to date. This update also includes minor stability fixes and improved texture filtering, ensuring that the streets of Paris remain as vibrant as ever.",
        imageUrl: "/images/mirage.jpg",
        badge: "SYSTEM UPDATE",
        badgeColor: "",
        publishedAt: DateTime.fromISO('2026-03-05T14:00:00.000Z'),
        gameId: unity?.id
      },
      {
        title: "Netflix Transmission: Series Casting Confirmed",
        excerpt: "Noomi Rapace and Sean Harris join the live-action Assassin's Creed series. Production enters the next phase of synchronization.",
        content: "New reports from the Netflix Front indicate that several high-profile actors have joined the recurring cast of the upcoming live-action Assassin's Creed series. Noomi Rapace and Sean Harris are confirmed for major roles, joining previously announced cast members. The series promises to deliver a high-budget exploration of the eternal conflict between the Brotherhood and the Templar Order, spanning multiple historical eras.",
        imageUrl: "https://placehold.co/800x400/1a1a1a/8a2be2?text=NETFLIX+SERIES",
        badge: "MEDIA LOG",
        badgeColor: "archived",
        publishedAt: DateTime.fromISO('2026-02-28T12:00:00.000Z')
      }
    ])
  }
}