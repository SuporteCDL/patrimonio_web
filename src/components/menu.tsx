import { Routes, Route, Link } from "react-router-dom"
import Home from "@/pages/home"
import Ativos from "@/pages/ativos"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Localidades from "@/pages/localidades"
import Grupos from "@/pages/grupos"
import SubGrupos from "@/pages/subgrupos"
import Marcas from "@/pages/marcas"
import Usuarios from "@/pages/usuarios"
import CentroCusto from "@/pages/centrocusto"
import Header from "@/components/header"
import MovAtivos from "@/pages/movativos"
import ConfAtivos from "@/pages/confereativos"
import Logout from "@/pages/logout"

export default function Menu() {
  return (
      <div className="flex flex-col h-screen">
        <Header />

        <div className="w-full mb-1">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger asChild className="text-2xl lg:text-lg">
                <Link to="/home" className="px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md">
                  Home
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="text-2xl lg:text-lg">Cadastros</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild className="text-2xl lg:text-lg">
                  <Link to="/localidades">
                    Localidades <MenubarShortcut>⌘L</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild className="text-2xl lg:text-lg">
                  <Link to="/grupos">
                    Grupos <MenubarShortcut>⌘G</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild className="text-2xl lg:text-lg">
                  <Link to="/subgrupos">
                    Sub-Grupos <MenubarShortcut>⌘S</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild className="text-2xl lg:text-lg">
                  <Link to='/marcas'>
                    Marcas <MenubarShortcut>⌘M</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild className="text-2xl lg:text-lg">
                  <Link to='/centrocusto'>
                    Centro de Custo <MenubarShortcut>⌘C</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild className="text-2xl lg:text-lg">
                  <Link to='/ativos'>
                    Ativos <MenubarShortcut>⌘A</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild className="text-2xl lg:text-lg">
                  <Link to='/usuarios'>
                    Usuários <MenubarShortcut>⌘U</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger asChild className="text-2xl lg:text-lg">
                <Link to='conferencia'>Conferência</Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger asChild className="text-2xl lg:text-lg">
                <Link to='/sair'>Sair</Link>
              </MenubarTrigger>
            </MenubarMenu>

          </Menubar>
        </div>

        <div className="flex-1 overflow-auto w-full p-4">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/localidades" element={<Localidades />} />
            <Route path="/grupos" element={<Grupos />} />
            <Route path="/subgrupos" element={<SubGrupos />} />
            <Route path="/centrocusto" element={<CentroCusto />} />
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/ativos" element={<Ativos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/movativos" element={<MovAtivos />} />
            <Route path="/conferencia" element={<ConfAtivos />} />
            <Route path="/sair" element={<Logout />} />
          </Routes>
        </div>
        
        <div className="text-lg text-center">:: 2025 ::</div>
      </div>
  )
}