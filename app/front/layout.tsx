import { Navbar } from '../../components/front/Navbar'
import { Footer } from '../../components/front/Footer'

export default function FrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>{children}</main>
      <Footer />
    </>
  )
}
