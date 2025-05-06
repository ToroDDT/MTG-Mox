import { useEffect, useState } from "react";

type ProfileComponentType = {
  commander: string;
};

function Profile({ commander }: ProfileComponentType) {
  const [name, setName] = useState<string | undefined>("Deltoro1999");

  useEffect(() => {
    fetch("http://localhost:8080/user")
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-purple-700 to-purple-900 shadow-lg p-6 ">
      <div className="text-m text-purple-300 mb-1">
        {name}
      </div>
      <div className="text-3xl font-bold text-white">
        {commander}
      </div>
    </div>
  );
}

export default Profile;
