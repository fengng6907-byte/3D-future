"use client";

import { useState, useCallback } from "react";
import JournalEditor from "@/components/JournalEditor";
import Timeline from "@/components/Timeline";
import Header from "@/components/Header";

const MOOD_TAGS = [
  "Grateful", "Dreamy", "Playful", "Cozy", "Adventurous",
  "Nostalgic", "Inspired", "Peaceful", "Romantic", "Hopeful",
];

const INITIAL_ENTRIES = [
  {
    id: "e1",
    author: "Partner",
    text: "Woke up to the sound of rain on the windows. Made us both coffee and watched the droplets race down the glass. Some mornings are so perfectly still, they feel like a secret the world keeps just for us.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=480&q=80",
    tags: ["Cozy", "Peaceful"],
    timestamp: new Date(2026, 5, 15, 8, 22),
  },
  {
    id: "e2",
    author: "You",
    text: "I keep thinking about that little bookshop we found on the corner of Rue de Rivoli. The way the afternoon light came through those tall windows, turning everything golden. We need to go back someday.",
    image: null,
    tags: ["Nostalgic", "Romantic"],
    timestamp: new Date(2026, 5, 14, 21, 45),
  },
  {
    id: "e3",
    author: "Together",
    text: "Anniversary dinner at that rooftop place with the fairy lights. We laughed so hard the couple next to us started laughing too. Three years and still the best person to share a dessert with.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=480&q=80",
    tags: ["Grateful", "Romantic"],
    timestamp: new Date(2026, 5, 13, 20, 10),
  },
  {
    id: "e4",
    author: "Partner",
    text: "You left a little note in my coat pocket again. I found it on the train this morning and couldn't stop smiling the whole ride. Never stop doing that.",
    image: null,
    tags: ["Hopeful", "Romantic"],
    timestamp: new Date(2026, 5, 12, 17, 30),
  },
  {
    id: "e5",
    author: "You",
    text: "Sunday farmers market haul: wildflowers, fresh sourdough, those tiny strawberries you love, and a jar of lavender honey from the woman who always wears the big straw hat.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=480&q=80",
    tags: ["Playful", "Grateful"],
    timestamp: new Date(2026, 5, 11, 11, 15),
  },
  {
    id: "e6",
    author: "Together",
    text: "Spontaneous road trip to the coast. Drove with the windows down, took the wrong turn twice, and ended up at the most beautiful hidden cove. Some of the best things are unplanned.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=480&q=80",
    tags: ["Adventurous", "Dreamy"],
    timestamp: new Date(2026, 5, 10, 14, 0),
  },
];

function getRandomTags() {
  const count = Math.random() > 0.5 ? 2 : 1;
  const shuffled = [...MOOD_TAGS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Home() {
  const [entries, setEntries] = useState(INITIAL_ENTRIES);

  const handleNewEntry = useCallback((text, imageUrl) => {
    const newEntry = {
      id: `e${Date.now()}`,
      author: "You",
      text,
      image: imageUrl || null,
      tags: getRandomTags(),
      timestamp: new Date(),
    };
    setEntries((prev) => [newEntry, ...prev]);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FFF9F6" }}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-8">
              <JournalEditor onSubmit={handleNewEntry} />
            </div>
          </aside>
          <section className="flex-1 min-w-0">
            <Timeline entries={entries} />
          </section>
        </div>
      </main>
    </div>
  );
}
