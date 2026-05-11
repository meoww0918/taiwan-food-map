import PageLayout from '../layouts/PageLayout.jsx';
import HeaderLink from '../components/HeaderLink.jsx';
import ComingSoon from '../components/ComingSoon.jsx';

export default function SurvivalTools() {
  return (
    <PageLayout>
      <HeaderLink />
      <ComingSoon
        heroSrc="/assets/survival-tools.png"
        heroAlt="生存工具"
        tagline="The phrasebook & emergency kit are being assembled."
      />
    </PageLayout>
  );
}
