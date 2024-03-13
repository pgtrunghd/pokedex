import "./App.css";
import { PokemonList } from "./components/pokemon-list";
import { useEffect } from "react";
import { AppContextProvider } from "./contexts/app-context";
import { PokemonDetail } from "./components/pokemon-detail";
import { useMediaQuery } from "./hooks/useMediaQuery";

function App() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  return (
    <AppContextProvider>
      <main className="bg-background bg-background-app bg-no-repeat bg-[left_-180px_top_-80px] min-h-screen">
        <div className="flex flex-col lg:flex-row gap-x-5 py-8 px-4 md:px-0 w-full md:w-[768px] lg:w-[1000px] xl:w-[1200px] mx-auto">
          <section className="lg:basis-2/3">
            {/* <Input placeholder="Search your Pokemon" /> */}
            <PokemonList />
          </section>

          {isDesktop ? <PokemonDetail /> : ""}
        </div>
      </main>
    </AppContextProvider>
  );
}

export default App;
