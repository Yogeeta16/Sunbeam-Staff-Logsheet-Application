// src/utils/cn.js -------------- Utility (for class merging)
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
