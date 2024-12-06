import Hero from "./components/Home/Hero"
import Servicios from "./components/Home/Servicios"
import QuienesSomos from "./components/Home/QuienesSomos"
import Testimoniales from "./components/Home/Testimoniales"
import Clients from "./components/Home/Clients"
import Contacto from "./components/Home/Contacto"

export default function Index() {
  return (
    <>
      <Hero />
      <Servicios />
      <QuienesSomos />
      <Testimoniales />
      <Clients />
      <Contacto />
    </>
  )
}