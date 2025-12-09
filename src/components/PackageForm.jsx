


import { useState, useEffect } from "react";
import axios from "axios";

function PackageForm({ service, onSubmit, onCancel, companyDetails }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    numberOfPeople: "",
    itinerary: [{ day: "", details: "" }],
    inclusions: [""],
    exclusions: [""],
    images: [""],
  });

  // ✅ Load existing data if editing
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        description: service.description || "",
        price: service.price || "",
        duration: service.duration || "",
        numberOfPeople: service.numberOfPeople || "",
        itinerary: service.itinerary?.length
          ? service.itinerary
          : [{ day: "", details: "" }],
        inclusions: service.inclusions?.length ? service.inclusions : [""],
        exclusions: service.exclusions?.length ? service.exclusions : [""],
        images: service.images?.length ? service.images : [""],
      });
    }
  }, [service]);

  // ✅ Handle single field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle array-based fields (inclusions, exclusions, images)
  const handleArrayChange = (e, index, key) => {
    const updatedArray = [...formData[key]];
    updatedArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleAddField = (key) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  // ✅ Handle itinerary changes
  const handleItineraryChange = (e, index, field) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[index][field] = e.target.value;
    setFormData((prev) => ({ ...prev, itinerary: updatedItinerary }));
  };

  const handleAddItinerary = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: "", details: "" }],
    }));
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // clean + ensure correct types
      const cleanData = {
        ...formData,
        numberOfPeople: Number(formData.numberOfPeople),
        price: String(formData.price),
        itinerary: formData.itinerary.filter(
          (i) => i.day.trim() !== "" && i.details.trim() !== ""
        ),
        inclusions: formData.inclusions.filter((i) => i.trim() !== ""),
        exclusions: formData.exclusions.filter((i) => i.trim() !== ""),
        images: formData.images.filter((i) => i.trim() !== ""),
        // 🔵 ADD COMPANY DETAILS HERE
        companyDetails: companyDetails || {
          name: "",
          address: "",
          phone: "",
          email: ""
        }
      };

      console.log("📦 Data being sent:", cleanData);
    console.log("🏢 Company Details:", cleanData.companyDetails);


      let res;
      if (service) {
        // Update existing
        res = await axios.put(
          `http://localhost:3000/api/packages/${service._id}`,
          cleanData
        );
      } else {
        // Create new
        res = await axios.post("http://localhost:3000/api/packages", cleanData);
      }

      onSubmit(res.data);

      // Reset form only after creation
      if (!service) {
        setFormData({
          title: "",
          description: "",
          price: "",
          duration: "",
          numberOfPeople: "",
          itinerary: [{ day: "", details: "" }],
          inclusions: [""],
          exclusions: [""],
          images: [""],
        });
      }
    } catch (error) {
      console.error("❌ Error saving package:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#2563EB]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#2563EB]"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Duration (e.g. 3 Days / 2 Nights)
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of People
          </label>
          <input
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            required
            className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
          />
        </div>
      </div>

      {/* Itinerary Section */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Itinerary
        </label>
        {formData.itinerary.map((item, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <input
              type="text"
              placeholder="Day"
              value={item.day}
              onChange={(e) => handleItineraryChange(e, index, "day")}
              className="flex-1 bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Details"
              value={item.details}
              onChange={(e) => handleItineraryChange(e, index, "details")}
              className="flex-[2] bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItinerary}
          className="text-[#2563EB] text-sm font-medium hover:underline"
        >
          + Add Day
        </button>
      </div>

      {/* Inclusions / Exclusions / Images */}
      {["inclusions", "exclusions", "images"].map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
            {key}
          </label>
          {formData[key].map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Enter ${key.slice(0, -1)}`}
              value={item}
              onChange={(e) => handleArrayChange(e, index, key)}
              className="w-full mb-2 bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField(key)}
            className="text-[#2563EB] text-sm font-medium hover:underline"
          >
            + Add {key.slice(0, -1)}
          </button>
        </div>
      ))}

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          {service ? "Update Package" : "Create Package"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default PackageForm;