const Topbar = () => {
    return (
      <div
        className="bg-black/50 text-white p-4 flex justify-end items-center fixed top-0 left-0 right-0 z-10 backdrop-blur-sm"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0) 70%)",
        }}
      >
        <button className="bg-blue-500 px-4 py-2 rounded">Logout</button>
      </div>
    );
  };
  
  export default Topbar;
  