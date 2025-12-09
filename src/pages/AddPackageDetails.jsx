import { useState } from "react";
import axios from "axios";

export default function AddPackageDetails() {
  const [form, setForm] = useState({
    packageId: "",
    heroTitle: "",
    heroSubtitle: "",
    heroImage: "",
    itinerary: [{ dayNumber: 1, title: "", description: "", icon: "", color: "" }],
    highlights: [{ icon: "", text: "" }],
    attractions: [{ name: "", price: "", icon: "" }],
    hotel: {
      name: "",
      image: "",
      details: "",
      features: [""],
    },
    bestTime: {
      season: "",
      description: "",
    },
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const updateArrayField = (field, index, key, value) => {
    const updated = [...form[field]];
    updated[index][key] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayRow = (field, defaultObj) => {
    setForm({ ...form, [field]: [...form[field], defaultObj] });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://tripkiya-backend.onrender.com/api/package-details/add",
        form
      );
      alert("Package Details Added Successfully!");
    } catch (error) {
       alert("Error adding package details");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#1e1e1e] p-6 rounded-xl shadow-lg text-white mt-10 border border-gray-700">

      <h2 className="text-2xl font-bold mb-5 text-orange-400">Add Package Details</h2>

      {/* Package ID */}
      <label>Package ID</label>
      <input
        className="input"
        placeholder="Enter package ID"
        value={form.packageId}
        onChange={(e) => handleChange("packageId", e.target.value)}
      />

      {/* Hero Section */}
      <label>Hero Title</label>
      <input
        className="input"
        value={form.heroTitle}
        onChange={(e) => handleChange("heroTitle", e.target.value)}
      />

      <label>Hero Subtitle</label>
      <input
        className="input"
        value={form.heroSubtitle}
        onChange={(e) => handleChange("heroSubtitle", e.target.value)}
      />

      <label>Hero Image URL</label>
      <input
        className="input"
        value={form.heroImage}
        onChange={(e) => handleChange("heroImage", e.target.value)}
      />

      {/* Itinerary */}
      <h3 className="title">Itinerary</h3>
      {form.itinerary.map((item, index) => (
        <div key={index} className="box">
          <p className="subtitle">Day {index + 1}</p>

          <input
            className="input"
            placeholder="Title"
            value={item.title}
            onChange={(e) =>
              updateArrayField("itinerary", index, "title", e.target.value)
            }
          />

          <textarea
            className="input"
            placeholder="Description"
            value={item.description}
            onChange={(e) =>
              updateArrayField("itinerary", index, "description", e.target.value)
            }
          />

          <input
            className="input"
            placeholder="Icon URL"
            value={item.icon}
            onChange={(e) =>
              updateArrayField("itinerary", index, "icon", e.target.value)
            }
          />

          <input
            className="input"
            placeholder="Color"
            value={item.color}
            onChange={(e) =>
              updateArrayField("itinerary", index, "color", e.target.value)
            }
          />
        </div>
      ))}

      <button
        className="btnAdd"
        onClick={() =>
          addArrayRow("itinerary", {
            dayNumber: form.itinerary.length + 1,
            title: "",
            description: "",
            icon: "",
            color: "",
          })
        }
      >
        + Add Day
      </button>

      {/* Highlights */}
      <h3 className="title">Highlights</h3>
      {form.highlights.map((item, index) => (
        <div key={index} className="box">
          <input
            className="input"
            placeholder="Icon URL"
            value={item.icon}
            onChange={(e) =>
              updateArrayField("highlights", index, "icon", e.target.value)
            }
          />

          <input
            className="input"
            placeholder="Highlight text"
            value={item.text}
            onChange={(e) =>
              updateArrayField("highlights", index, "text", e.target.value)
            }
          />
        </div>
      ))}

      <button
        className="btnAdd"
        onClick={() => addArrayRow("highlights", { icon: "", text: "" })}
      >
        + Add Highlight
      </button>

      {/* Attractions */}
      <h3 className="title">Attractions</h3>
      {form.attractions.map((item, index) => (
        <div key={index} className="box">
          <input
            className="input"
            placeholder="Attraction Name"
            value={item.name}
            onChange={(e) =>
              updateArrayField("attractions", index, "name", e.target.value)
            }
          />

          <input
            className="input"
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
              updateArrayField("attractions", index, "price", e.target.value)
            }
          />

          <input
            className="input"
            placeholder="Icon URL"
            value={item.icon}
            onChange={(e) =>
              updateArrayField("attractions", index, "icon", e.target.value)
            }
          />
        </div>
      ))}

      <button
        className="btnAdd"
        onClick={() =>
          addArrayRow("attractions", { name: "", price: "", icon: "" })
        }
      >
        + Add Attraction
      </button>

      {/* Hotel */}
      <h3 className="title">Hotel Details</h3>
      <div className="box">
        <input
          className="input"
          placeholder="Hotel Name"
          value={form.hotel.name}
          onChange={(e) =>
            setForm({ ...form, hotel: { ...form.hotel, name: e.target.value } })
          }
        />

        <input
          className="input"
          placeholder="Hotel Image URL"
          value={form.hotel.image}
          onChange={(e) =>
            setForm({ ...form, hotel: { ...form.hotel, image: e.target.value } })
          }
        />

        <textarea
          className="input"
          placeholder="Hotel Details"
          value={form.hotel.details}
          onChange={(e) =>
            setForm({ ...form, hotel: { ...form.hotel, details: e.target.value } })
          }
        />

        <h4 className="subtitle">Features</h4>

        {form.hotel.features.map((feature, idx) => (
          <input
            key={idx}
            className="input"
            placeholder="Feature"
            value={feature}
            onChange={(e) => {
              const updated = [...form.hotel.features];
              updated[idx] = e.target.value;
              setForm({
                ...form,
                hotel: { ...form.hotel, features: updated },
              });
            }}
          />
        ))}
      </div>

      <button
        className="btnAdd"
        onClick={() =>
          setForm({
            ...form,
            hotel: { ...form.hotel, features: [...form.hotel.features, ""] },
          })
        }
      >
        + Add Feature
      </button>

      {/* Best Time */}
      <h3 className="title">Best Time To Visit</h3>
      <div className="box">
        <input
          className="input"
          placeholder="Season"
          value={form.bestTime.season}
          onChange={(e) =>
            setForm({
              ...form,
              bestTime: { ...form.bestTime, season: e.target.value },
            })
          }
        />

        <textarea
          className="input"
          placeholder="Description"
          value={form.bestTime.description}
          onChange={(e) =>
            setForm({
              ...form,
              bestTime: { ...form.bestTime, description: e.target.value },
            })
          }
        />
      </div>

      <button
        className="w-full py-3 bg-orange-500 rounded-lg hover:bg-orange-600 font-bold"
        onClick={handleSubmit}
      >
        Submit Package Details
      </button>

      {/* CSS Inside Same File */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          margin-bottom: 14px;
          border-radius: 8px;
          background: #242424;
          border: 1px solid #444;
        }
        .box {
          background: #111;
          padding: 14px;
          border-radius: 10px;
          margin-bottom: 16px;
          border: 1px solid #333;
        }
        .title {
          font-size: 22px;
          margin: 20px 0 10px;
          color: #ffb347;
          font-weight: bold;
        }
        .subtitle {
          color: #ffa35c;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .btnAdd {
          width: 100%;
          padding: 10px;
          background: #2563eb;
          margin-bottom: 20px;
          border-radius: 10px;
          color: white;
        }
      `}</style>
    </div>
  );
}
