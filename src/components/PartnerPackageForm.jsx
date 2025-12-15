


import { useState, useEffect } from "react";

function PartnerPackageForm({ service, onSubmit, onCancel, companyDetails }) {
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

  // ✅ Handle array-based fields
  const handleArrayChange = (e, index, key) => {
    const updatedArray = [...formData[key]];
    updatedArray[index] = e.target.value;
    setFormData((prev) => ({ ...prev, [key]: updatedArray }));
  };

  const handleAddField = (key) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  // ✅ Handle itinerary
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

  // ✅ Submit (NO API CALL HERE)
  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = {
      ...formData,
      numberOfPeople: Number(formData.numberOfPeople),
      price: String(formData.price),
      itinerary: formData.itinerary.filter(
        (i) => i.day.trim() && i.details.trim()
      ),
      inclusions: formData.inclusions.filter((i) => i.trim()),
      exclusions: formData.exclusions.filter((i) => i.trim()),
      images: formData.images.filter((i) => i.trim()),
      companyDetails,
    };

    console.log("📦 Data being sent to parent:", cleanData);

    onSubmit(cleanData); // 🔥 ONLY send data to parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
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
          className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
        />
      </div>

      {/* Description */}
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
          className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
        />
      </div>

      {/* Price / Duration / People */}
      <div className="grid grid-cols-3 gap-4">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
        />
        <input
          type="number"
          name="numberOfPeople"
          placeholder="People"
          value={formData.numberOfPeople}
          onChange={handleChange}
          required
          className="bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
        />
      </div>

      {/* Itinerary */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Itinerary
        </label>
        {formData.itinerary.map((item, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <input
              placeholder="Day"
              value={item.day}
              onChange={(e) => handleItineraryChange(e, index, "day")}
              className="flex-1 bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
            />
            <input
              placeholder="Details"
              value={item.details}
              onChange={(e) => handleItineraryChange(e, index, "details")}
              className="flex-[2] bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddItinerary} className="text-blue-400">
          + Add Day
        </button>
      </div>

      {/* Inclusions / Exclusions / Images */}
      {["inclusions", "exclusions", "images"].map((key) => (
        <div key={key}>
          {formData[key].map((item, index) => (
            <input
              key={index}
              value={item}
              onChange={(e) => handleArrayChange(e, index, key)}
              className="w-full mb-2 bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
            />
          ))}
          <button type="button" onClick={() => handleAddField(key)} className="text-blue-400">
            + Add {key.slice(0, -1)}
          </button>
        </div>
      ))}

      {/* Buttons */}
      <div className="flex gap-4">
        <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg">
          {service ? "Update Package" : "Create Package"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-700 text-white py-3 rounded-lg">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default PartnerPackageForm;
