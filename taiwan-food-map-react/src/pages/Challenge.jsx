import PageLayout from '../layouts/PageLayout.jsx';
import HeaderLink from '../components/HeaderLink.jsx';
import ComingSoon from '../components/ComingSoon.jsx';

export default function Challenge() {
  return (
    <PageLayout>
      <HeaderLink />
      <ComingSoon
        heroSrc={import.meta.env.BASE_URL + "assets/challenge.png"}
        heroAlt="挑戰"
        tagline="A new round of food challenges is brewing."
      />
    </PageLayout>
  );
}
