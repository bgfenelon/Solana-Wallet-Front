"use client"

import React from "react"
import { Circle, Square, Ban, Lock, Key, Check, CircleCheck, Code, Coins, Network, Radio } from "lucide-react"
import {
  Section,
  Card,
  Title,
  Description,
  CodeBlock,
  CodeLine,
  List,
  Container,
  Space
} from "./styles"
import SectionTitle from "../../Components/SectionTitle"
import { Footer } from "../../Components/Footer"
import Header from "../../Components/Header"

export default function CoreConcepts() {
  return (
    <>
    <Header buttons='false'/>
      <Section>
    <Space />

         <Container className="dark-purple">
          
          {/* Overview */}
          <Title>
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ZVjMTys6STYDB0t4fhhg5UozJDxBAq.png" />
            VEILFI DOCS
          </Title>

          <Description>
            The Shielded Cache for Solana
          </Description>
        </Container>


        <Container>
          {/* Overview */}
          <Title>
            <Lock size={20} color="#a855f7" />
            Overview
          </Title>

          <Description>
            Veilfi is a shielded wallet and privacy protocol for Solana, designed to bring true on-chain anonymity to SOL and SPL tokens. It allows users to deposit assets into a cryptographic pool, generate zero-knowledge proofs, and perform private transfers or withdrawals — without revealing the sender, receiver, or amount.

            <br />
            <br />
            Built on zkSNARKs, Merkle commitments, and nullifier sets, Veilfi provides Zcash-style privacy at Solana speed.
          </Description>
        </Container>

        <Container>
          <h2> <CircleCheck />Core Concepts</h2>
          {/* Shielded Notes */}
          <Card  >
            <Title>
              <Circle size={20} color="#a855f7" />
              Shielded Notes
            </Title>

            <Description>
              When you deposit into Veilfi, your assets are converted into shielded notes — encrypted commitments that represent value inside the privacy pool.
            </Description>

            <List>
              <CodeBlock>note = (asset_id, amount, recipient_pkd, rho, r, memo) <br />
                commitment = Poseidon(note)</CodeBlock>
            </List>
          </Card>

          {/* Shielded Notes */}
          <Card>
            <Title>
              <Square size={20} color="#a855f7" />
              Merkle Tree
            </Title>

            <Description>
              Every shielded note creates a new commitment built into the on-Chain Merkle tree. This allows users to later prove membership (ownership) of a note without revealing it.

            </Description>
          </Card>

          {/* Nullifiers */}
          <Card>
            <Title>
              <Ban size={20} color="#a855f7" />
              Nullifiers
            </Title>

            <Description>
              To prevent double-spends, every time a note is consumed (spent), a nullifier hash is published.
              Once a nullifier exists on-chain, that note can never be used again.
            </Description>
          </Card>

          {/* Zero-Knowledge Proofs */}
          <Card>
            <Title>
              <Lock size={20} color="#a855f7" />
              Zero-Knowledge Proofs
            </Title>

            <Description>
              When spending or withdrawing, the wallet generates a zk/SNARK proof that:
            </Description>

            <List>
              <li>The note exists in the Merkle tree</li>
              <li>The user owns it (knows the secret)</li>
              <li>It hasn't been spent yet</li>
              <li>Inputs = Outputs + Fee</li>
            </List>
          </Card>
        </Container>

        <Container className="flex">
          <Title><Code /> Protocol Design</Title>
          <Card>
            <Title>
              <Square size={20} color="#a855f7" />
              1. Deposit (T → z+i)
            </Title>

            <Description>
              Move assets from transparent wallet into the private pool
            </Description>
          </Card>

          <Card>
            <Title>
              <Square size={20} color="#a855f7" />
              2. Transfer (z → z+i)
            </Title>

            <Description>
              Move assets between private addresses while maintaining anonymity
            </Description>
          </Card>

          <Card>
            <Title>
              <Square size={20} color="#a855f7" />
              3. Withdraw (z → T+i)
            </Title>

            <Description>
              Exit the private pool to transparent address, hiding the original source
            </Description>
          </Card>

        </Container>

        <Container>


          <Title><Coins />Assets Supported</Title>

          {/* SOL */}
          <Card>
            <Title>
              <Lock size={20} color="#a855f7" />
              SOL
            </Title>

            <Description>
              Native SOL
            </Description>
          </Card>
          {/* Transfer */}
          <Card>
            <Title>
              <Lock size={20} color="#a855f7" />
              USDC
            </Title>

            <Description>
              native SPL token
            </Description>
          </Card>
          {/* VEIL */}
          <Card>
            <Title>
              <Lock size={20} color="#a855f7" />
              VEIL
            </Title>
            <Description>
              coming soon
            </Description>
          </Card>
        </Container>


        <Container>
          <Title>
            <Lock size={20} />
            Relayer Network
          </Title>
          <Description>
            Our relayer anonymity layer is built over a custom token layer. Between broadcast transactions on behalf of users and paid roles at the protocol end point,
            this enables full privacy even at IP propagation.
          </Description>
        </Container>


        <Container>

          <Title>
            <Key size={20} color="#a855f7" />
            Keys and Addresses
          </Title>
          <Description>
            <h3>Spending Key (sk)</h3>
            Used to prove ownership and spend notes <br />
            <code>derive_key_from_seed(user_seed)</code> <br /><br />

            <h3>Viewing Key (vk)</h3>
            Manually is used to scan blockchain without compromising privacy <br />
            <code>keccak_hash(spending_key)</code> <br /><br />

            <h3>Address (addr)</h3>
            Derived public key Merkle commitment <br />
            <code>pk_commit[G * vk]</code> <br /><br />

          </Description>
        </Container>

        <Container>
          {/* Overview */}
          <Title>
            <Network size={20} color="#a855f7" />
            Relayer Network
          </Title>

          <Description>
            Veilfi is a shielded wallet and privacy protocol for Solana, designed to bring true on-chain anonymity to SOL and SPL tokens. It allows users to deposit assets into a cryptographic pool, generate zero-knowledge proofs, and perform private transfers or withdrawals — without revealing the sender, receiver, or amount.

            <br />
            <br />
            Built on zkSNARKs, Merkle commitments, and nullifier sets, Veilfi provides Zcash-style privacy at Solana speed.
          </Description>
        </Container>

        <Container>

          <Title>
            <Key size={20} color="#a855f7" />
            Token Utility — VEILFI
          </Title>
          <Description>
          <div className="flex">
                      <Card>
            <Title>
              <Lock size={20} color="#a855f7" />
              Fee Token
            </Title>
            <Description>
              Pay relayers and protocol fees inside shielded pool
            </Description>
          </Card>          <Card>
            <Title>
              <Lock size={20} color="#a855f7" />
              Governance
            </Title>
            <Description>
              Vote on protocol parameters and upgrades
            </Description>
          </Card>         


            <Card>
            <Title>
              <Lock size={20} color="#a855f7" />
              Staking
            </Title>
            <Description>
              Optional relayer bonding in v2
            </Description>
          </Card>          <Card>
            <Title>
              <Lock size={20} color="#a855f7" />
              Burn Mechanism
            </Title>
            <Description>
              Portion of relayer fees burned for deflation
            </Description>
          </Card>
</div>

          </Description>
        </Container>


        <Container>

          <Title>
            <Radio size={20} color="#a855f7" />
            Token Utility — VEILFI
          </Title>
          <Description>
                      <Card>
            <Title>
              v0 - PoC / Devnet
            </Title>
            <Description>
              Deposit / Withdraw only (t↔z)
            </Description>
          </Card>          <Card>
            <Title>
              v1 - Mainnet Beta
            </Title>
            <Description>
              Full shielded transfers (z→z), Relayer prototype
            </Description>
          </Card>         


            <Card>
            <Title>
              v2 - Stable
            </Title>
            <Description>
              View Keys, Multi-Asset Pool, DAO Governance
            </Description>
          </Card>          <Card>
            <Title>
              v3 - Advanced
            </Title>
            <Description>
              Universal Plonk, Aggregated Proofs, Audit APIs
            </Description>
          </Card>

          </Description>
        </Container>
      </Section>
<Footer/>
    </>


  )
}
