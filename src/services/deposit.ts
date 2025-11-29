
export async function checkDeposits() {
  try {
    const res = await fetch("https://node-veilfi-jtae.onrender.com/deposit/check");
    const data = await res.json();
    return data.deposits || [];
  } catch (err) {
    console.error("Deposit check error:", err);
    return [];
  }
}
