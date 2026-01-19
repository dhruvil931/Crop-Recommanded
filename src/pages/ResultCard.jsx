import React from "react";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const {
    // recommendedCrop,
    // probability,
    // riskLevel,
    // explanations,
    // alternatives,
    confidence_percent,
    recommended_crop,
  } = result;
  const percentage = (confidence_percent * 100).toFixed(1);

  const getRiskColors = (level) => {
    switch (level) {
      case "Low":
        return "bg-green-100/80 text-green-800 border-green-200";
      case "Medium":
        return "bg-orange-100/80 text-orange-800 border-orange-200";
      case "High":
        return "bg-red-100/80 text-red-800 border-red-200";
      default:
        return "bg-gray-100/80 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 md:p-10 mt-8 shadow-xl border border-white/60 animate-[fadeIn_0.5s_ease-out] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
        <span className="w-8 h-0.5 bg-green-500 rounded-full"></span>
        Recommendation Result
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="relative">
          <span className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600 capitalize">
            {recommendedCrop}
          </span>
          <div className="absolute -bottom-2 left-0 w-full h-2 bg-green-200/50 rounded-full -skew-x-12"></div>
        </div>

        <div
          className={`px-5 py-3 rounded-2xl flex flex-col items-end border ${getRiskColors(
            riskLevel,
          )}`}
        >
          <span className="text-xs font-bold uppercase opacity-70 tracking-wider">
            Confidence Score
          </span>
          <span className="text-xl font-black">{percentage}%</span>
        </div>
      </div>

      <div className="bg-white/60 rounded-2xl p-6 mb-8 border border-white/80 shadow-sm">
        <h3 className="text-[#1b5e20] font-bold mb-4 flex items-center gap-2 text-lg">
          <span className="bg-green-100 p-1.5 rounded-lg">💡</span> Why this
          crop?
        </h3>
        <ul className="space-y-3">
          {explanations.map((exp, index) => (
            <li
              key={index}
              className="text-gray-700 leading-relaxed flex items-start gap-3"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
              <span>{exp}</span>
            </li>
          ))}
        </ul>
      </div>

      {alternatives && alternatives.length > 0 && (
        <div>
          <h3 className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-4">
            Alternative Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {alternatives.slice(1, 4).map((alt, idx) => (
              <div
                key={idx}
                className="bg-white/50 border border-white/80 p-5 rounded-2xl text-center hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all cursor-default group"
              >
                <div className="font-bold text-gray-800 text-lg capitalize mb-1 group-hover:text-green-700 transition-colors">
                  {alt.crop}
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div
                    className="bg-green-500 h-full rounded-full"
                    style={{ width: `${alt.probability * 100}%` }}
                  ></div>
                </div>
                <div className="text-gray-500 text-xs font-medium">
                  {(alt.probability * 100).toFixed(0)}% Match
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
