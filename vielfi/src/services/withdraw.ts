// 📁 IHM/src/services/withdraw.ts
// Serviço que envia requisição para o backend (DEV)

export async function withdrawSol(to: string, amount: number) {
  try {
    const res = await fetch("http://localhost:3001/withdraw/sol", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, amount }),
    });

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error withdrawSol:", error);
    return { success: false, error: "Error comunication." };
  }
}
