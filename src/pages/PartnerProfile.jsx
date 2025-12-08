export default function PartnerProfile() {
  return (
    <div className="text-white max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 space-y-4">

        <div>
          <label className="text-gray-400">Name</label>
          <input
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="text-gray-400">Email</label>
          <input
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
            placeholder="Your Email"
          />
        </div>

        <button className="w-full p-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700">
          Update Profile
        </button>

      </div>
    </div>
  );
}
