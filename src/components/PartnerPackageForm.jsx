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

  // ✅ Load data on EDIT
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

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleArrayChange = (e, index, key) => {
    const arr = [...formData[key]];
    arr[index] = e.target.value;
    setFormData((p) => ({ ...p, [key]: arr }));
  };

  const handleAddField = (key) => {
    setFormData((p) => ({ ...p, [key]: [...p[key], ""] }));
  };

  const handleItineraryChange = (e, index, field) => {
    const itinerary = [...formData.itinerary];
    itinerary[index][field] = e.target.value;
    setFormData((p) => ({ ...p, itinerary }));
  };

  const handleAddItinerary = () => {
    setFormData((p) => ({
      ...p,
      itinerary: [...p.itinerary, { day: "", details: "" }],
    }));
  };

  /* ---------------- SUBMIT ---------------- */
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

    onSubmit(cleanData); // 🔥 parent handles API
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
      />

      {/* Description */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        rows="4"
        className="w-full bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
      />

      {/* Price / Duration / People */}
      <div className="grid grid-cols-3 gap-4">
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
        />
        <input
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
        />
        <input
          name="numberOfPeople"
          type="number"
          placeholder="People"
          value={formData.numberOfPeople}
          onChange={handleChange}
          required
          className="bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
        />
      </div>

      {/* Itinerary */}
      <div>
        {formData.itinerary.map((it, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input
              placeholder="Day"
              value={it.day}
              onChange={(e) => handleItineraryChange(e, i, "day")}
              className="flex-1 bg-[#1e1e1e] border border-gray-800 rounded-lg px-4 py-3 text-white"
            />
            <input
              placeholder="Details"
              value={it.details}
              onChange={(e) => handleItineraryChange(e, i, "details")}
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
          {formData[key].map((v, i) => (
            <input
              key={i}
              value={v}
              onChange={(e) => handleArrayChange(e, i, key)}
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
        <button type="submit" className="flex-1 bg-blue-600 py-3 rounded-lg">
          {service ? "Update Package" : "Create Package"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-700 py-3 rounded-lg">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default PartnerPackageForm;
