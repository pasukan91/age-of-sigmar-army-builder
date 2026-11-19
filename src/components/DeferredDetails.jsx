import { useState } from "react";

// Native <details> hides its descendants but React still mounts them. Delay
// that work until the reader expands the section, and preserve it afterwards.
function DeferredDetails({ summary, children, defaultOpen = false, ...props }) {
  const [mounted, setMounted] = useState(defaultOpen);
  return (
    <details {...props} open={defaultOpen} onToggle={(event) => {
      if (event.currentTarget.open) setMounted(true);
    }}>
      <summary>{summary}</summary>
      {mounted && children}
    </details>
  );
}

export default DeferredDetails;
