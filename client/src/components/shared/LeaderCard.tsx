type Props = {
  name: string;
  position: string;
  image: string;
  class?: string;
};

export function LeaderCard({ name, position, image, class: className }: Props) {
  return (
    <div className="flex  gap-2">
      <div className="flex flex-col items-center gap-2">
        <img src={image} className={className} alt={name} />

        <div className="flex flex-col justify-center items-center ">
          <h2 className="text-lg font-semibold text-center">{name}</h2>
          <h4 className="text-sm text-[#000000B0] text-center">{position}</h4>
        </div>
      </div>
    </div>
  );
}
