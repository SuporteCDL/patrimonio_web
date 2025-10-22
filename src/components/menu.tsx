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
              <MenubarTrigger asChild>
                <Link to="/home" className="px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-md">
                  Home
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Cadastros</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link to="/localidades">
                    Localidades <MenubarShortcut>⌘L</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to="/grupos">
                    Grupos <MenubarShortcut>⌘G</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to="/subgrupos">
                    Sub-Grupos <MenubarShortcut>⌘S</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to='/marcas'>
                    Marcas <MenubarShortcut>⌘M</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to='/centrocusto'>
                    Centro de Custo <MenubarShortcut>⌘C</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to='/ativos'>
                    Ativos <MenubarShortcut>⌘A</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to='/usuarios'>
                    Usuários <MenubarShortcut>⌘U</MenubarShortcut>
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Relatórios</MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>Ativos</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarSeparator />
                    <MenubarItem>Ativos por Centro de Custo</MenubarItem>
                    <MenubarItem>Ativos por Sub-Grupo</MenubarItem>
                    <MenubarItem>Ativos Conferidos</MenubarItem>
                    <MenubarItem>Ativos a Conferir</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Grupos</MenubarItem>
                <MenubarItem>Sub-Grupos</MenubarItem>
                <MenubarItem>Marcas</MenubarItem>
                <MenubarItem>Movimentações</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger asChild>
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
            <Route path="/confativos" element={<ConfAtivos />} />
            <Route path="/sair" element={<Logout />} />
          </Routes>
        </div>
        
        <div className="text-sm text-center">:: 2025 ::</div>
      </div>
  )
}