



import { Edit, Trash2, Building2, MapPin, Phone, Mail } from "lucide-react";

function PackageCard({ service, onEdit, onDelete }) {
  // console.log("🎴 PackageCard received service:", service);
  // console.log("🏢 PackageCard company details:", service?.companyDetails);
  
  if (!service) {
    return <h1 className="text-white text-xl">No Package</h1>;
  }

  const hasCompanyDetails = service.companyDetails && 
    typeof service.companyDetails === 'object' && 
    Object.keys(service.companyDetails).length > 0 && (
      service.companyDetails.name || 
      service.companyDetails.address || 
      service.companyDetails.phone || 
      service.companyDetails.email
    );
  
  // console.log("✅ hasCompanyDetails:", hasCompanyDetails);

  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-800 hover:border-[#f88310] transition-colors">
      {/* Image Section */}
      <div className="h-48 bg-gray-800 overflow-hidden">
        {service.images && service.images.length > 0 ? (
          <img
            src={service.images[0]}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{service.title}</h3>
          <span className="text-[#f88310] font-bold text-lg">
            ₹{service.price}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {service.description}
        </p>

        {/* Duration and People */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
            {service.duration}
          </span>
          {service.numberOfPeople && (
            <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
              {service.numberOfPeople}{" "}
              {service.numberOfPeople > 1 ? "People" : "Person"}
            </span>
          )}
        </div>

        {/* Company Name - Simple Display */}
        {service.companyName && (
          <p className="text-xs text-gray-500 mb-3">
            Created by <span className="text-[#f88310]">{service.companyName}</span>
          </p>
        )}

        {/* Company Details Section - Full Details */}
        {hasCompanyDetails && (
          <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1">
              <Building2 size={12} />
              Company Details
            </h4>
            <div className="space-y-1.5">
              {service.companyDetails.name && (
                <div className="flex items-start gap-2">
                  <Building2 size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{service.companyDetails.name}</span>
                </div>
              )}
              {service.companyDetails.address && (
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300 line-clamp-2">{service.companyDetails.address}</span>
                </div>
              )}
              {service.companyDetails.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-500 flex-shrink-0" />
                  <a 
                    href={`tel:${service.companyDetails.phone}`}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {service.companyDetails.phone}
                  </a>
                </div>
              )}
              {service.companyDetails.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-500 flex-shrink-0" />
                  <a 
                    href={`mailto:${service.companyDetails.email}`}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors truncate"
                  >
                    {service.companyDetails.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(service)}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Edit size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(service._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-900/50 hover:bg-red-900 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;