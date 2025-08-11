const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-[50px] pb-[90px] w-full bg-cover bg-center bg-no-repeat bg-fixed bg-bg-main container">
      {children}
    </div>
  );
};

export default MainWrapper;
