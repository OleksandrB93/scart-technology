import { mainPanelList } from "../configs/main-panel";

const MainPanel = () => {
  return (
    <ul className="fixed bottom-0 left-0 right-0 grid grid-cols-5 gap-2 bg-black/40 backdrop-blur-sm py-2">
      {mainPanelList.map((item) => (
        <li key={item.id} className="flex flex-col items-center gap-1">
          <item.icon />
          <span className="text-white/40 text-[12px]">{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default MainPanel;
