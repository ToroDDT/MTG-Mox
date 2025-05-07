type ProfileComponentType = {
  commander: string;
  name: string;
};

function Profile({ commander, name }: ProfileComponentType) {
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
