import React, { useState } from "react";

function PasswordInput({ className, ...inputProps }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="password-input-control">
      <input
        {...inputProps}
        className={className}
        type={isVisible ? "text" : "password"}
      />
      <button
        type="button"
        className="password-visibility-toggle"
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        onClick={() => setIsVisible((visible) => !visible)}
      >
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export default PasswordInput;
