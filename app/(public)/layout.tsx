import Nav from '@/components/Nav';
import CursorTrail from '@/components/CursorTrail';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CursorTrail />
      <Nav />
      <main>{children}</main>
    </>
  );
}
