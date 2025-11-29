import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import { useActivityStore } from "../../store/activityStore";
import * as S from "./styles";

export default function Activity() {
  const { history } = useActivityStore();

  return (
    <>
      <Header />

      <S.Container>
        <S.Card>
          <h1>Activity</h1>
          <p>Your deposit & withdraw history</p>

          {history.length === 0 ? (
            <S.Empty>No activity yet...</S.Empty>
          ) : (
            <S.List>
              {history.map((item, i) => (
                <S.Item key={i} $type={item.type}>
                  <div className="left">
                    <strong>
                      {item.type === "deposit" ? "Deposit" : "Withdraw"}
                    </strong>
                    <span>{(item.amount).toFixed(4)} SOL</span>
                    <small>{new Date(item.timestamp).toLocaleString()}</small>
                  </div>

                  <a
                    href={`https://explorer.solana.com/tx/${item.signature}?cluster=mainnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View →
                  </a>
                </S.Item>
              ))}
            </S.List>
          )}
        </S.Card>
      </S.Container>

      <Footer />
    </>
  );
}
