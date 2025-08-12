import { mainPanelList } from "../configs/main-panel";

const MainPanel = () => {
  return (
    <ul className="fixed bottom-0 left-0 right-0 grid grid-cols-5 gap-2 bg-black/40 backdrop-blur-sm py-2">
      {mainPanelList.map((item) => (
        <li
          key={item.id}
          className="flex flex-col items-center gap-1 cursor-pointer group relative"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out blur-sm group-hover:blur-none group-hover:scale-110"></div>
            <div className="relative transform transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">
              <item.icon />
            </div>
          </div>
          <span className="text-white/40 text-[12px] transition-all duration-300 ease-out group-hover:text-white group-hover:scale-105 font-medium">
            {item.label}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"></div>
        </li>
      ))}
    </ul>
  );
};

export default MainPanel;
