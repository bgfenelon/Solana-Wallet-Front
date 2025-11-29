// You may later replace this with a backend endpoint when available
export function getLocalWithdrawHistory() {
  const raw = localStorage.getItem("withdraw-history");
  return raw ? JSON.parse(raw) : [];
}

export function addWithdrawHistory(entry: any) {
  const raw = getLocalWithdrawHistory();
  raw.push(entry);
  localStorage.setItem("withdraw-history", JSON.stringify(raw));
}
