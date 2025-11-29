// import Link from 'next/link'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
import { PrimaryButton } from '../../styles'
import * as S from './styles'

export function Header() {
  return (
    <S.MainContainer>
    <S.Header className="">
     <div>
       <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <S.Logo href="/" className="flex items-center gap-2">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ZVjMTys6STYDB0t4fhhg5UozJDxBAq.png"
              alt="Veilfi"
              width={40}
              height={40}
              className="object-contain"
            />
          <span className="text-xl font-bold text-white">Veilfi</span>
        </S.Logo>
        
        <S.Links>
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#security" className="text-gray-300 hover:text-white transition-colors">
            Security
          </a>
          <a href="#docs" className="text-gray-300 hover:text-white transition-colors">
            Docs
          </a>
        </S.Links>

        <PrimaryButton className="btn-sm">
          Launch App →
        </PrimaryButton>
      </nav>
     </div>
    </S.Header>
    </S.MainContainer>
  )
}
