// Utility to download or open files stored in server uploads (default: schedules folder).
// - filePath: relative path from DB/API
// - folder: server folder name (default = "schedules")
// - openInNewTab: true → open in new tab, false → trigger direct download
export const downloadOption = (fileUrl, openInNewTab = false) => {
  if (!fileUrl) return;

  if (openInNewTab) {
    window.open(fileUrl, "_blank");
  } else {
    const link = document.createElement("a");
    link.href = fileUrl;
    const fileName = fileUrl.split('/').pop();
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
