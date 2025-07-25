import React from "react";

const KeyboardInstructions = ({ isVideo }) => (
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
    ESC برای بستن • ← → برای حرکت {isVideo && '• Space برای پخش/توقف • ↑ ↓ برای جستجو'}
  </div>
);

export default KeyboardInstructions;
