const Dashboard = () => {
    return (
      <div className="p-4">
        <h2 className="text-xl">Welcome to the Dashboard!</h2>
        <div className="mt-4">
          {Array.from({ length: 200 }, (_, index) => (
            <p key={index} className="text-sm">Line {index + 1}</p>
          ))}
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  