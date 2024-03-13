import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useFetch } from "@/hooks/useFetch";
import { useAppContext } from "@/contexts/app-context";
import { PokemonType } from "./pokemon-type";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { PokemonDetail } from "./pokemon-detail";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type TProps = {
  id: number;
  name: string;
};

export const PokemonItem = ({ id, name }: TProps) => {
  const { data } = useFetch<TPokemonItem>(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
  const { setData } = useAppContext();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Card
        className="rounded-[20px] shadow-lg hover:shadow-xl border-none text-center cursor-pointer group transition-shadow"
        onClick={() =>
          setData({
            id: data?.id,
          })
        }
      >
        <CardHeader className="relative">
          <CardTitle>
            <img
              src={
                id >= 650
                  ? `${import.meta.env.VITE_POKEMON_IMG}${id}.png`
                  : `${import.meta.env.VITE_POKEMON_IMG_ANIMATE}${id}.gif`
              }
              alt=""
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform"
              style={{ imageRendering: "pixelated" }}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs font-bold">No {id}</p>
          <h3 className="text-lg font-bold m-[5px] capitalize">{name}</h3>
          <PokemonType dataType={data?.types} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Card
          className="rounded-[20px] shadow-lg hover:shadow-xl border-none text-center cursor-pointer group transition-shadow"
          onClick={() =>
            setData({
              id: data?.id,
            })
          }
        >
          <CardHeader className="relative">
            <CardTitle>
              <img
                src={
                  id >= 650
                    ? `${import.meta.env.VITE_POKEMON_IMG}${id}.png`
                    : `${import.meta.env.VITE_POKEMON_IMG_ANIMATE}${id}.gif`
                }
                alt=""
                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform"
                style={{ imageRendering: "pixelated" }}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs font-bold">No {id}</p>
            <h3 className="text-lg font-bold m-[5px] capitalize">{name}</h3>
            <PokemonType dataType={data?.types} />
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <PokemonDetail />
      </DrawerContent>
    </Drawer>
  );
};

PokemonItem.Skeleton = function SkeletonPokemon() {
  return <Skeleton className="w-full h-44 rounded-[20px] bg-skeleton" />;
};
