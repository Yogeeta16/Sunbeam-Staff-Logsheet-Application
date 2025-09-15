import { API_DOWNLOAD_URL } from "./index";

// Utility to download or open files stored in server uploads (default: schedules folder).
// - filePath: relative path from DB/API
// - folder: server folder name (default = "schedules")
// - openInNewTab: true → open in new tab, false → trigger direct download
export const downloadOption = (filePath, folder = "schedules", openInNewTab = false) => {
  if (!filePath) return;

  const fileName = filePath.split(/[/\\]/).pop();
  const url = `${API_DOWNLOAD_URL}/uploads/${folder}/${fileName}`;

  if (openInNewTab) {
    window.open(url, "_blank"); // open in browser tab
  } else {
    const link = document.createElement("a"); // create temp link
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
