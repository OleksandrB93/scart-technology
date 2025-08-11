import InfoIconsItem from "./InfoIconItem";
import { iconsList } from "../configs/icons-info";

const InfoIconsList = () => {
  return (
    <ul className="flex gap-2 sm:gap-6 items-center justify-center mb-[46px]">
      {iconsList.map((item) => (
        <InfoIconsItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default InfoIconsList;
