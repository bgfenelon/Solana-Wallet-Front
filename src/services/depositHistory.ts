export async function fetchDeposits() {
  try {
    const res = await fetch("https://node-veilfi-jtae.onrender.com/deposit/check");
    const data = await res.json();
    return data.deposits || [];
  } catch (err) {
    console.error("Error fetching deposits:", err);
    return [];
  }
}
