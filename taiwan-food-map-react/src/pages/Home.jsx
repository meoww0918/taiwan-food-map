import { motion } from 'framer-motion';
import PageLayout from '../layouts/PageLayout.jsx';
import SectionCard from '../components/SectionCard.jsx';

const STD_CTA = { left: 0.035, top: 0.585, width: 0.345, height: 0.255 };
const NO_CTA = { left: 0, top: 0, width: 0, height: 0 };

const SPOTIFY_URL =
  'https://open.spotify.com/album/2KzchDDaH4IPe2OKY3rowy?si=k3n1w4fxTLmhR6EoYBVImg';
const APPLE_MUSIC_URL =
  'https://music.apple.com/us/search?term=Coco%20Cruise%20Lofi%20Travel%20House';

const APPLE_REGION = { left: 0.355, top: 0.69, width: 0.185, height: 0.17 };
const SPOTIFY_REGION = { left: 0.555, top: 0.69, width: 0.205, height: 0.17 };

const musicHotspots = [
  { label: 'Open in Apple Music', href: APPLE_MUSIC_URL, region: APPLE_REGION, external: true },
  { label: 'Open in Spotify', href: SPOTIFY_URL, region: SPOTIFY_REGION, external: true },
];

export default function Home() {
  return (
    <PageLayout bottomPadding="pb-36 lg:pb-32">
      <motion.img
        src={import.meta.env.BASE_URL + "assets/header.png"}
        className="w-full block -mt-[40px] lg:-mt-[60px] mb-1"
        alt="頁首"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        draggable={false}
      />

      <div className="px-2 sm:px-3 -mt-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
          {/* Hero — full width on desktop too. food-map is the only working content page so it leads. */}
          <div className="lg:col-span-2">
            <SectionCard
              to="/food-map"
              src={import.meta.env.BASE_URL + "assets/food-map.png"}
              alt="美食地圖"
              ctaRegion={STD_CTA}
              ctaLabel="Explore Food Map"
              ctaText="Explore Now →"
              index={0}
            />
          </div>

          <SectionCard
            to="/street-map"
            src={import.meta.env.BASE_URL + "assets/street-map.png"}
            alt="街道地圖"
            ctaRegion={STD_CTA}
            ctaLabel="Explore Street Map"
            ctaText="Explore Now →"
            index={1}
          />
          <SectionCard
            to="/challenge"
            src={import.meta.env.BASE_URL + "assets/challenge.png"}
            alt="挑戰"
            ctaRegion={STD_CTA}
            ctaLabel="Start Challenge"
            ctaText="Start →"
            index={2}
          />
          <SectionCard
            to="/survival-tools"
            src={import.meta.env.BASE_URL + "assets/survival-tools.png"}
            alt="生存工具"
            ctaRegion={STD_CTA}
            ctaLabel="Open Survival Tools"
            ctaText="Explore Now →"
            index={3}
          />
          <SectionCard
            to="/contact"
            src={import.meta.env.BASE_URL + "assets/contact.png"}
            alt="聯絡資訊"
            ctaRegion={STD_CTA}
            ctaLabel="Get in Touch"
            ctaText="Get in Touch →"
            index={4}
          />

          {/* Music — full width with Apple Music + Spotify deep-link hotspots */}
          <div className="lg:col-span-2">
            <SectionCard
              to="/music"
              src={import.meta.env.BASE_URL + "assets/music.png"}
              alt="音樂"
              ctaRegion={NO_CTA}
              hotspots={musicHotspots}
              index={5}
            />
          </div>
        </div>

        <motion.p
          className="text-center py-2 text-stone-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Try our music :D It's good
        </motion.p>
      </div>
    </PageLayout>
  );
}
