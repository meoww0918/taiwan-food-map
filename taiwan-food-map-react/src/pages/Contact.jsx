import PageLayout from '../layouts/PageLayout.jsx';
import HeaderLink from '../components/HeaderLink.jsx';
import ComingSoon from '../components/ComingSoon.jsx';

export default function Contact() {
  return (
    <PageLayout>
      <HeaderLink />
      <ComingSoon
        heroSrc="/assets/contact.png"
        heroAlt="聯絡資訊"
        tagline="Drop us a line — the contact form is on its way."
      />
    </PageLayout>
  );
}
