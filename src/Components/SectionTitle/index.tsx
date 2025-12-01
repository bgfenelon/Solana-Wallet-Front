"use client"

import React from "react"
import { Check } from "lucide-react"
import { Wrapper, IconWrapper, Title } from "./styles"

interface SectionTitleProps {
  title: string
  icon?: "check" | string
}

export default function SectionTitle({ title, icon = "check" }: SectionTitleProps) {
  const iconMap: Record<string, React.ReactNode> = {
    check: <Check size={18} color="#a855f7" />,
  }

  const iconComponent = iconMap[icon] ?? iconMap["check"]

  return (
    <Wrapper>
      <IconWrapper>{iconComponent}</IconWrapper>
      <Title>{title}</Title>
    </Wrapper>
  )
}
