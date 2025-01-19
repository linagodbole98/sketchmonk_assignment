import React from 'react';

const UpgradeCard: React.FC = () => {
  return (
    <div className="bg-emerald-800 rounded-lg p-6 m-4 relative overflow-hidden bottom-0">
      {/* Background curved lines */}
      <div className="absolute top-0 right-0 w-full h-full">
        <svg
          className="absolute top-0 right-0 opacity-20"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C30,50 70,50 100,0 L100,100 L0,100 Z"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>


      {/* Content */}
      <div className="relative z-10 pt-4">
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-orange-400 rounded-full py-4" />
        <p className="text-white text-xl font-medium my-4">
          Get detailed analytics for help you, upgrade pro
        </p>
        <button className="bg-white text-emerald-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default UpgradeCard;
