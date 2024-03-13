import { useAppContext } from "@/contexts/app-context";
import { PokemonType } from "./pokemon-type";
import { useEffect, useState } from "react";
import { getId } from "@/lib/utils";
import { API_URL } from "@/api/url";
import { RefreshCcw } from "lucide-react";
import { Navigation } from "./navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const PokemonDetail = () => {
  const { data, setData } = useAppContext();
  const [dataPokemon, setDataPokemon] = useState<TPokemonItem>();
  const [dataSpecies, setDataSpecies] = useState<TPokemonSpecies>();
  const [dataEvolution, setDataEvolution] = useState<TPokemonEvolution>();
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (data?.id) {
      setLoading(true);
      const req1 = fetch(
        `${import.meta.env.VITE_URL}${API_URL.pokemon}/${data?.id}`
      );
      const req2 = fetch(
        `${import.meta.env.VITE_URL}${API_URL.pokemonSpecies}/${data?.id}`
      );
      Promise.all([req1, req2]).then(async (resSpecies) => {
        const res1: TPokemonItem = await resSpecies[0].json();
        const res2: TPokemonSpecies = await resSpecies[1].json();
        setDataSpecies(res2);
        setDataPokemon(res1);
        fetch(res2?.evolution_chain?.url).then(async (resEvolution) => {
          const res = await resEvolution.json();
          setDataEvolution(res);
          setLoading(false);
        });
      });
    }
  }, [data]);

  if (!isDesktop) {
    return (
      <div className="bg-white text-center p-3 relative">
        {/* <div className="absolute left-0 right-0 bottom-[70vh] z-10">
          <img
            className="pixel-rendering object-contain m-auto w-80 max-h-[25vh]"
            src={dataPokemon?.sprites?.front_default}
            alt={dataPokemon?.name}
          />
        </div> */}
        <div className="h-[70vh] max-w-[500px] mx-auto overflow-y-auto hide-scrollbar">
          {!loading ? (
            <>
              <span className="text-xs font-bold">#{dataPokemon?.id}</span>
              <h2 className="text-2xl font-bold capitalize">
                {dataPokemon?.name}
              </h2>
              <PokemonType dataType={dataPokemon?.types} />
              <h3 className="font-bold mt-4 px-1 pb-1">Pokedex Entry</h3>
              <p>
                {dataSpecies?.flavor_text_entries
                  ?.find((item) => item.language.name === "en")
                  ?.flavor_text.replace(/[\n\f]/g, " ")}
              </p>

              <div className="flex items-center justify-between gap-x-[10px]">
                <div className="flex-1">
                  <h3 className="font-bold mt-4 px-1 pb-1">Height</h3>
                  <span className="py-2 bg-background block rounded-[20px]">
                    {dataPokemon?.height! / 10}m
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mt-4 px-1 pb-1">Weight</h3>
                  <span className="py-2 bg-background block rounded-[20px]">
                    {dataPokemon?.weight! / 10}m
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-bold mt-4 px-1 pb-1 text-center">
                  Abilities
                </h3>
                <div className="flex items-center justify-between gap-x-[10px]">
                  {dataPokemon?.abilities?.map((item) => (
                    <span
                      key={item.ability.name}
                      className="flex-1 py-2 bg-background block rounded-[20px] capitalize"
                    >
                      {item.ability.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mt-4 px-1 pb-1 text-center">
                  Evolution
                </h3>
                <div className="flex items-center justify-center gap-x-1">
                  <img
                    src={`${import.meta.env.VITE_POKEMON_IMG}${getId(
                      dataEvolution?.chain?.species?.url
                    )}.png`}
                    alt={dataEvolution?.chain?.species.name}
                    className="evolution"
                    onClick={() => {
                      setData({
                        id: getId(dataEvolution?.chain?.species?.url),
                      });
                    }}
                  />

                  <span
                    key={
                      dataEvolution?.chain?.evolves_to[0]?.evolution_details[0]
                        ?.min_level
                    }
                    className="flex-1 py-2 bg-background block rounded-[20px] capitalize text-xs font-bold"
                  >
                    {dataEvolution?.chain?.evolves_to[0]?.evolution_details[0]
                      ?.min_level
                      ? "Lv." +
                        dataEvolution?.chain?.evolves_to[0]
                          ?.evolution_details[0]?.min_level
                      : "?"}
                  </span>
                  <img
                    src={`${import.meta.env.VITE_POKEMON_IMG}${getId(
                      dataEvolution?.chain?.evolves_to[0]?.species?.url
                    )}.png`}
                    alt={dataEvolution?.chain?.evolves_to[0]?.species?.name}
                    className="evolution"
                    onClick={() => {
                      setData({
                        id: getId(
                          dataEvolution?.chain?.evolves_to[0]?.species?.url
                        ),
                      });
                    }}
                  />

                  {dataEvolution?.chain?.evolves_to[0]?.evolves_to[0]
                    ?.species ? (
                    <>
                      <span
                        key={
                          dataEvolution?.chain?.evolves_to[0]?.evolves_to[0]
                            ?.evolution_details[0]?.min_level
                        }
                        className="flex-1 py-2 bg-background block rounded-[20px] capitalize text-xs font-bold"
                      >
                        {dataEvolution?.chain?.evolves_to[0]?.evolves_to[0]
                          ?.evolution_details[0]?.min_level
                          ? "Lv." +
                            dataEvolution?.chain?.evolves_to[0]?.evolves_to[0]
                              ?.evolution_details[0]?.min_level
                          : "?"}
                      </span>
                      <img
                        src={`${import.meta.env.VITE_POKEMON_IMG}${getId(
                          dataEvolution?.chain?.evolves_to[0]?.evolves_to[0]
                            ?.species?.url
                        )}.png`}
                        alt={
                          dataEvolution?.chain?.evolves_to[0]?.evolves_to[0]
                            ?.species?.name
                        }
                        className="evolution"
                        onClick={() => {
                          setData({
                            id: getId(
                              dataEvolution?.chain?.evolves_to[0]?.evolves_to[0]
                                ?.species?.url
                            ),
                          });
                        }}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <Navigation id={dataPokemon?.id} />
              </div>
            </>
          ) : (
            <div className="grid place-items-center h-full w-full">
              <RefreshCcw className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="lg:basis-1/3 relative">
      <div className="fixed bottom-3 lg:w-[320px] xl:w-[400px]">
        {data?.id ? (
          <div className="absolute left-0 right-0 -translate-y-1/2 z-10">
            <img
              className="pixel-rendering object-contain m-auto w-80 h-[22vh]"
              src={dataPokemon?.sprites?.front_default}
              alt={dataPokemon?.name}
            />
          </div>
        ) : (
          ""
        )}
        <div className="bg-white text-center p-3 pt-14 rounded-[20px] shadow-lg">
          {data?.id ? (
            <div className="h-[75vh] overflow-y-auto hide-scrollbar">
              {!loading ? (
                <>
                  <span className="text-xs font-bold">#{dataPokemon?.id}</span>
                  <h2 className="text-2xl font-bold capitalize">
                    {dataPokemon?.name}
                  </h2>
                  <PokemonType dataType={dataPokemon?.types} />
                  <h3 className="font-bold mt-4 px-1 pb-1">Pokedex Entry</h3>
                  <p>
                    {dataSpecies?.flavor_text_entries
                      ?.find((item) => item.language.name === "en")
                      ?.flavor_text.replace(/[\n\f]/g, " ")}
                  </p>

                  <div className="flex items-center justify-between gap-x-[10px]">
                    <div className="flex-1">
                      <h3 className="font-bold mt-4 px-1 pb-1">Height</h3>
                      <span className="py-2 bg-background block rounded-[20px]">
                        {dataPokemon?.height! / 10}m
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mt-4 px-1 pb-1">Weight</h3>
                      <span className="py-2 bg-background block rounded-[20px]">
                        {dataPokemon?.weight! / 10}m
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mt-4 px-1 pb-1 text-center">
                      Abilities
                    </h3>
                    <div className="flex items-center justify-between gap-x-[10px]">
                      {dataPokemon?.abilities?.map((item) => (
                        <span
                          key={item.ability.name}
                          className="flex-1 py-2 bg-background block rounded-[20px] capitalize"
                        >
                          {item.ability.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {dataEvolution?.chain?.evolves_to?.[0] ? (
                    <>
                      <h3 className="font-bold mt-4 px-1 pb-1 text-center">
                        Evolution
                      </h3>
                      <div className="flex items-center justify-between gap-x-1">
                        <img
                          src={`${import.meta.env.VITE_POKEMON_IMG}${getId(
                            dataEvolution?.chain?.species?.url
                          )}.png`}
                          alt={dataEvolution?.chain?.species.name}
                          className="evolution"
                          onClick={() => {
                            setData({
                              id: getId(dataEvolution?.chain?.species?.url),
                            });
                          }}
                        />

                        <span
                          key={
                            dataEvolution?.chain?.evolves_to[0]
                              ?.evolution_details[0]?.min_level
                          }
                          className="flex-1 py-2 bg-background block rounded-[20px] capitalize text-xs font-bold"
                        >
                          {dataEvolution?.chain?.evolves_to[0]
                            ?.evolution_details[0]?.min_level
                            ? "Lv." +
                              dataEvolution?.chain?.evolves_to[0]
                                ?.evolution_details[0]?.min_level
                            : "?"}
                        </span>
                        <img
                          src={`${import.meta.env.VITE_POKEMON_IMG}${getId(
                            dataEvolution?.chain?.evolves_to[0]?.species?.url
                          )}.png`}
                          alt={
                            dataEvolution?.chain?.evolves_to[0]?.species?.name
                          }
                          className="evolution"
                          onClick={() => {
                            setData({
                              id: getId(
                                dataEvolution?.chain?.evolves_to[0]?.species
                                  ?.url
                              ),
                            });
                          }}
                        />

                        {dataEvolution?.chain?.evolves_to[0]?.evolves_to[0]
                          ?.species ? (
                          <>
                            <span
                              key={
                                dataEvolution?.chain?.evolves_to[0]
                                  ?.evolves_to[0]?.evolution_details[0]
                                  ?.min_level
                              }
                              className="flex-1 py-2 bg-background block rounded-[20px] capitalize text-xs font-bold"
                            >
                              {dataEvolution?.chain?.evolves_to[0]
                                ?.evolves_to[0]?.evolution_details[0]?.min_level
                                ? "Lv." +
                                  dataEvolution?.chain?.evolves_to[0]
                                    ?.evolves_to[0]?.evolution_details[0]
                                    ?.min_level
                                : "?"}
                            </span>
                            <img
                              src={`${import.meta.env.VITE_POKEMON_IMG}${getId(
                                dataEvolution?.chain?.evolves_to[0]
                                  ?.evolves_to[0]?.species?.url
                              )}.png`}
                              alt={
                                dataEvolution?.chain?.evolves_to[0]
                                  ?.evolves_to[0]?.species?.name
                              }
                              className="evolution"
                              onClick={() => {
                                setData({
                                  id: getId(
                                    dataEvolution?.chain?.evolves_to[0]
                                      ?.evolves_to[0]?.species?.url
                                  ),
                                });
                              }}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <Navigation id={dataPokemon?.id} />
                </>
              ) : (
                <div className="grid place-items-center h-full w-full">
                  <RefreshCcw className="animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <div className="h-[75vh] grid place-items-center">
              Choose pokemon to display
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
