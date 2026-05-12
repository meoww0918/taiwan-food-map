import { motion } from 'framer-motion';
import PageLayout from '../layouts/PageLayout.jsx';
import SectionCard from '../components/SectionCard.jsx';

const STD_CTA = { left: 0.035, top: 0.585, width: 0.345, height: 0.255 };
const NO_CTA = { left: 0, top: 0, width: 0, height: 0 };

const SPOTIFY_URL =
  'https://open.spotify.com/playlist/3Jq6wWjY1lyJkQCI30VmLf?si=oDbiGWWbRzS45bo_neLhbw';
const APPLE_MUSIC_URL =
  'https://music.apple.com/us/search?term=Coco%20Cruise%20Lofi%20Travel%20House';

const APPLE_REGION = { left: 0.355, top: 0.69, width: 0.185, height: 0.17 };
const SPOTIFY_REGION = { left: 0.555, top: 0.69, width: 0.205, height: 0.17 };

const musicHotspots = [
  { label: 'Open in Apple Music', href: APPLE_MUSIC_URL, region: APPLE_REGION, external: true },
  { label: 'Open in Spotify', href: SPOTIFY_URL, region: SPOTIFY_REGION, external: true },
];

// region.left / region.top are the BOTTOM-CENTER anchor of each cutout
// (0..1 of card dimensions). Extracted from #FF2600 dots user painted at the
// bottom-centre of each food in food-map.png (882×484). SectionCard applies
// transform: translate(-50%, -100%) so the food "sits" on the anchor.
const FOOD_FLOATS = [
  {
    src: import.meta.env.BASE_URL + 'assets/beef-noodles.png',
    alt: '牛肉麵',
    region: { left: 0.543, top: 0.425, width: 0.26 },
    sway: { rotate: [-4, 4, -4], duration: 2.8, delay: 0 },
  },
  {
    src: import.meta.env.BASE_URL + 'assets/boba.png',
    alt: '珍珠奶茶',
    region: { left: 0.683, top: 0.389, width: 0.15 },
    sway: { rotate: [-5, 5, -5], duration: 2.6, delay: 0.3 },
  },
  {
    src: import.meta.env.BASE_URL + 'assets/dofu.png',
    alt: '臭豆腐',
    region: { left: 0.832, top: 0.408, width: 0.30 },
    sway: { rotate: [3, -3, 3], duration: 3.2, delay: 0.6 },
  },
  {
    src: import.meta.env.BASE_URL + 'assets/pork-rice.png',
    alt: '滷肉飯',
    region: { left: 0.586, top: 0.710, width: 0.24 },
    sway: { rotate: [-3, 3, -3], duration: 2.9, delay: 0.2 },
  },
  {
    src: import.meta.env.BASE_URL + 'assets/oyster.png',
    alt: '蚵仔煎',
    region: { left: 0.877, top: 0.680, width: 0.26 },
    sway: { rotate: [4, -4, 4], duration: 2.7, delay: 0.5 },
  },
  {
    src: import.meta.env.BASE_URL + 'assets/fried-chicken.png',
    alt: '雞排',
    region: { left: 0.475, top: 0.630, width: 0.19 },
    anchor: 'top',
    sway: { rotate: [4, -4, 4], duration: 3.0, delay: 0.4 },
  },
  {
    src: import.meta.env.BASE_URL + 'assets/mango-ice.png',
    alt: '芒果冰',
    region: { left: 0.665, top: 0.939, width: 0.24 },
    sway: { rotate: [-4, 4, -4], duration: 3.1, delay: 0.1 },
  },
  {
    src: import.meta.env.BASE_URL + 'assets/pineapple.png',
    alt: '鳳梨酥',
    region: { left: 0.887, top: 0.927, width: 0.20 },
    sway: { rotate: [3, -3, 3], duration: 2.5, delay: 0.7 },
  },
];

export default function Home() {
  return (
    <PageLayout bottomPadding="pb-36 lg:pb-32">
      <motion.img
        src={import.meta.env.BASE_URL + "assets/header.png"}
        className="w-full block -mt-[40px] lg:-mt-[100px] mb-1"
        alt="頁首"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        draggable={false}
      />

      <div className="px-2 sm:px-3 -mt-[15px] lg:-mt-[120px]">
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
              floatingFoods={FOOD_FLOATS}
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
