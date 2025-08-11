interface InfoIconsItemProps {
  item: {
    id: string;
    label: string;
    amount: string;
    icon: any;
  };
}

const InfoIconsItem = ({ item }: InfoIconsItemProps) => {
  const IconComponent = item.icon;

  return (
    <li className="flex gap-1 items-center">
      <IconComponent />
      <span>{item.amount}</span>
    </li>
  );
};

export default InfoIconsItem;
