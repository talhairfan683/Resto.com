import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="font-sans antialiased flex flex-col w-full h-screen">
      {/* Header Section */}
      <Header className="w-full" />

      {/* Main Content Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar className="h-full" />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
