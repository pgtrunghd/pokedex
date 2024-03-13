import { typeColors } from "@/constants/enum";

type TPokemonType = {
  dataType: Type[] | undefined;
};

export const PokemonType = ({ dataType }: TPokemonType) => {
  return (
    <div className="flex items-center justify-center">
      {dataType?.map((item) => (
        <span
          key={item.type.name}
          className={`mt-3 mx-2 mb-2 px-2 py-1 ${
            (typeColors as any)[item.type.name]
          } capitalize rounded-[5px] text-sm font-semibold`}
        >
          {item.type.name}
        </span>
      ))}
    </div>
  );
};
