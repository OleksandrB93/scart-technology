interface InfoIconsItemProps {
  item: {
    id: string;
    label: string;
    amount: string;
    icon: any;
  };
  key: string;
}

const InfoIconsItem = ({ item, key }: InfoIconsItemProps) => {
  const IconComponent = item.icon;

  return (
    <li className="flex gap-1 items-center" key={key}>
      <IconComponent />
      <span>{item.amount}</span>
    </li>
  );
};

export default InfoIconsItem;
