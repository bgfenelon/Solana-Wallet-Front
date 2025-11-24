import * as S from "./styles";

export function Footer() {
  return (
    <S.FooterWrapper>
      <S.Container>
        <S.Grid>
          {/* Brand */}
          <S.Brand>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ZVjMTys6STYDB0t4fhhg5UozJDxBAq.png"
                alt="Veilfi"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
              <span>Veilfi</span>
            </div>
            <p>Private currency for everyone</p>
          </S.Brand>

          {/* Product */}
          <S.Section>
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Security</a></li>
              <li><a href="#">Roadmap</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </S.Section>

          {/* Resources */}
          <S.Section>
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </S.Section>

          {/* Company */}
          <S.Section>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </S.Section>
        </S.Grid>

        {/* Bottom Bar */}
        <S.BottomBar>
          <p>© 2025 Veilfi. All rights reserved.</p>

          <div className="links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </S.BottomBar>
      </S.Container>
    </S.FooterWrapper>
  );
}
