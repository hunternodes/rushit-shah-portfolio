import Spotlight from '@/components/Spotlight';
import Voice from '@/components/Voice';
import Gallery from '@/components/Gallery';
import Signals from '@/components/Signals';
import Frequencies from '@/components/Frequencies';
import Hail from '@/components/Hail';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Spotlight />
      <Voice />
      <Gallery />
      <Signals />
      <Frequencies />
      <Hail />
      <Footer />
    </>
  );
}
