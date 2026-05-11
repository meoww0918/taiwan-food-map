import PageLayout from '../layouts/PageLayout.jsx';
import HeaderLink from '../components/HeaderLink.jsx';
import ComingSoon from '../components/ComingSoon.jsx';

export default function StreetMap() {
  return (
    <PageLayout>
      <HeaderLink />
      <ComingSoon
        heroSrc="/assets/street-map.png"
        heroAlt="街道地圖"
        tagline="Hand-drawn streets are still being painted."
      />
    </PageLayout>
  );
}
