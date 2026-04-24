/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { 
  Trophy, 
  Shield, 
  Users, 
  Target, 
  Instagram, 
  ChevronRight, 
  MessageSquare, 
  BookOpen, 
  Dumbbell, 
  ArrowRight,
  Star,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Logo = ({ showText }: { showText: boolean }) => (
  <div className="flex items-center gap-3">
    <img 
      src="/assets/LogoSemFundo.png" 
      alt="Esquadrão Águia Logo" 
      className="h-14 w-auto object-contain brightness-110"
    />
    <motion.div 
      initial={false}
      animate={{ 
        opacity: showText ? 1 : 0,
        x: showText ? 0 : -20,
        width: showText ? 'auto' : 0
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col border-l border-gold/30 pl-3 overflow-hidden whitespace-nowrap"
    >
      <span className="font-display font-black text-xs uppercase tracking-[0.2em] text-white">Esquadrão</span>
      <span className="font-display font-black text-lg uppercase tracking-[0.1em] text-gold leading-none italic">Águia</span>
    </motion.div>
  </div>
);

const Modal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative bg-dark-bg border border-gold/30 p-8 md:p-12 military-border max-w-lg w-full text-center"
      >
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold/20">
          <Trophy className="w-10 h-10 text-gold" />
        </div>
        <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 tracking-tighter">Parabéns, Nova Águia!</h3>
        <p className="text-white/60 mb-8 leading-relaxed italic">
          "O primeiro passo para o topo é o alistamento silencioso na tropa da disciplina. Sua jornada Pro começa agora."
        </p>
        <button 
          onClick={onClose}
          className="gold-gradient w-full py-4 text-black font-black uppercase tracking-widest text-xs"
        >
          Entendido, Tenente!
        </button>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      if (!isAtTop) setIsAtTop(true);
    } else {
      if (isAtTop) setIsAtTop(false);
    }
  });

  const navLinks = [
    { name: 'História', href: '#historia' },
    { name: 'Consultoria', href: '#consultoria' },
    { name: 'Comunidade', href: '#comunidade' },
    { name: 'Resultados', href: '#resultados' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-dark-bg/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <Logo showText={isAtTop} />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[11px] uppercase tracking-[0.15em] font-bold text-white/50 hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={onOpenModal}
              className="bg-gold text-black px-8 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-gold-light transition-all shadow-xl shadow-gold/10"
            >
              Aliste-se Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark-surface border-b border-white/10 px-4 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-display text-white/90"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onOpenModal}
            className="gold-gradient w-full py-4 rounded-sm text-dark-bg font-bold uppercase tracking-widest"
          >
            Aliste-se Now
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const SectionHeading = ({ subtitle, title, centered = false }: { subtitle: string, title: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-bold leading-tight"
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative bg-dark-bg overflow-hidden selection:bg-gold selection:text-black">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Decorative Glows */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-gold opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] bg-gold opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="/assets/TenenteBrenoPosando.jpeg" 
            alt="Tenente Breno Training" 
            className="w-full h-full object-cover filter contrast-125 grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-6 inline-block px-4 py-1.5 border border-gold/40 rounded-full bg-gold/5">
                <span className="text-gold text-[10px] uppercase tracking-widest font-black">IFBB Pro League Classic Physique</span>
              </div>
              <h1 className="text-7xl md:text-[100px] font-black uppercase tracking-tighter leading-[0.85] mb-8">
                A Força da <br />
                <span className="text-gold">Disciplina</span>
              </h1>
              <p className="max-w-md text-lg text-white/50 mb-10 leading-relaxed">
                Transformando a mentalidade militar em resultados de elite. Junte-se à Tropa e conquiste o físico de um campeão profissional.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gold text-black px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-gold-light transition-all shadow-2xl shadow-gold/20"
                >
                  Entrar para a Tropa
                </button>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="border border-white/20 text-white px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                  Garanta seu Ebook
                </button>
              </div>
            </motion.div>

            {/* Floating Hero Card */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="hidden lg:block relative"
            >
               <div className="bg-black/60 backdrop-blur-xl p-10 military-border border-gold/20 max-w-sm ml-auto">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-14 h-14 bg-gold flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Mr. Olympia Amador</p>
                      <p className="text-xl font-black">Overall Champion</p>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <p className="text-gold font-black text-3xl">1M+</p>
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Seguidores</p>
                    </div>
                    <div className="w-px h-12 bg-white/10" />
                    <div>
                      <p className="text-gold font-black text-3xl italic">MAX</p>
                      <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Titanium</p>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-0.5 h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ top: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute w-full h-full bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section Bar - Redesigned to match footer interface */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-y border-white/5 bg-black/40 backdrop-blur-md h-32">
        {[
          { label: 'Seguidores', value: '1M+' },
          { label: 'Atletas', value: '500+' },
          { label: 'Categoria', value: 'PRO' },
          { label: 'Unidade', value: 'Fortaleza' }
        ].map((stat, i) => (
          <div 
            key={i}
            className="border-r border-white/5 p-6 flex flex-col justify-center items-center group hover:bg-gold/5 transition-all cursor-crosshair"
          >
            <span className="text-[10px] text-gold font-black uppercase tracking-widest mb-1">{stat.label}</span>
            <span className="text-xl font-bold uppercase tracking-tighter">{stat.value}</span>
          </div>
        ))}
      </section>

      {/* History Section */}
      <section id="historia" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <SectionHeading 
                subtitle="O Legado" 
                title="Do Quartel para os Palcos Pro" 
              />
              <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                  Breno Freire, o <span className="text-gold font-bold">Tenente Breno</span>, não apenas treina; ele comanda. Ex-primeiro tenente do Exército Brasileiro, ele trouxe a disciplina férrea das forças armadas para o universo do fisiculturismo.
                </p>
                <div className="grid grid-cols-1 gap-6 pt-6">
                  <div className="military-border p-6 bg-dark-surface/50">
                    <h4 className="text-gold font-bold mb-2 uppercase tracking-tight">Carreira Militar</h4>
                    <p className="text-sm">Campeão de arremesso de peso nas Olimpíadas Militares e destaque físico absoluto em sua tropa.</p>
                  </div>
                  <div className="military-border p-6 bg-dark-surface/50">
                    <h4 className="text-gold font-bold mb-2 uppercase tracking-tight">Nascimento de um Pro</h4>
                    <p className="text-sm">Consagrou-se profissional após vitórias esmagadoras no Mr. Olympia Amador 2023 (Espanha/Portugal).</p>
                  </div>
                </div>
                <p className="italic border-l-2 border-gold pl-6 py-2 mt-8 text-white/90">
                  "Minha missão é mostrar que o shape de elite é construído com 10% de genética e 90% de ordem e progresso individual."
                </p>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 relative aspect-[4/5]"
            >
              <div className="absolute inset-0 bg-gold/10 -rotate-3 z-0" />
              <div className="absolute inset-0 border border-gold/40 rotate-3 z-0" />
              <img 
                src="/assets/Tenente Breno Profile.jpg" 
                alt="Tenente Breno Pose" 
                className="relative z-10 w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultancy Section */}
      <section id="consultoria" className="py-32 bg-dark-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading 
            subtitle="Esquadrão Águia" 
            title="Sua Próxima Batalha Começa Aqui" 
            centered 
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Treino Personalizado",
                desc: "Planilhas de treinamento periodizado com base no seu nível de condicionamento e objetivos específicos."
              },
              {
                icon: <ChevronRight className="w-8 h-8" />,
                title: "Diretriz Nutricional",
                desc: "Estratégias alimentares focadas em performance e estética, respeitando sua rotina e preferências."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Suporte 24/7",
                desc: "Acesso direto à plataforma para tirar dúvidas e realizar ajustes constantes conforme sua evolução."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-dark-bg border border-white/5 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-gold transition-all duration-500" />
                <div className="text-gold mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/60 mb-8 leading-relaxed">{feature.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-tighter cursor-pointer">
                  Saiba mais <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-8 md:p-12 military-border bg-gradient-to-r from-dark-bg to-dark-surface">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-2">Pronto para o Alistamento?</h3>
                <p className="text-white/50 italic">Vagas limitadas para acompanhamento individual direto com o Tenente.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="gold-gradient px-12 py-5 rounded-sm text-dark-bg font-extrabold text-sm uppercase tracking-widest hover:scale-105 transition-all"
              >
                Garantir Minha Vaga
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="comunidade" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <SectionHeading 
            subtitle="Confraria do Esquadrão" 
            title="Mais que Treino, Uma Irmandade" 
            centered 
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="bg-gold/10 p-4 rounded-sm border border-gold/20">
                <Users className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Encontros do Esquadrão</h4>
                <p className="text-white/60">Treinos presenciais exclusivos na Ironberg Fortaleza e em turnês pelo Brasil.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-gold/10 p-4 rounded-sm border border-gold/20">
                <MessageSquare className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Grupo de Divulgação</h4>
                <p className="text-white/60">Acesso a conteúdos exclusivos, estudos de caso e hacks de treinamento em tempo real.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-gold/10 p-4 rounded-sm border border-gold/20">
                <BookOpen className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">E-books e Guias</h4>
                <p className="text-white/60">Acesso antecipado ao e-book "Tropa Tenente Breno" e materiais de apoio teórico.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 h-[500px]">
             <div className="space-y-4">
                <img 
                  src="/assets/TenenteBrenoPosando.jpeg" 
                  className="rounded-sm w-full h-[60%] object-cover grayscale brightness-75 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-dark-surface p-6 h-[40%] flex flex-col justify-center border border-white/5">
                  <span className="text-4xl font-bold text-gold mb-1">98%</span>
                  <p className="text-[10px] uppercase tracking-widest font-bold">Taxa de Adesão</p>
                </div>
             </div>
             <div className="space-y-4 pt-8">
                <div className="bg-gold p-6 h-[30%] flex flex-col justify-center text-dark-bg font-bold">
                  <Users className="mb-2" />
                  <span className="text-xl leading-tight">Elite da Comunidade</span>
                </div>
                <img 
                  src="/assets/Tenente Breno Profile.jpg" 
                  className="rounded-sm w-full h-[70%] object-cover grayscale contrast-125"
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="resultados" className="py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            subtitle="QG de Evolução" 
            title="Resultados que Comandam Respeito" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex items-center justify-center">
                    <ArrowRight className="w-12 h-12 text-gold -rotate-45" />
                  </div>
                  <img 
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1541534741688-6078c6bfb5c5' : item === 2 ? '1583454110551-21f2fa2afe61' : '1581009146145-b5ef050c2e1e'}?auto=format&fit=crop&q=80&w=800`} 
                    alt={`Resultado ${item}`} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-dark-bg/80 backdrop-blur px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-gold border border-gold/20">
                    Semana {item * 4}
                  </div>
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight">Operação Evolução {item}</h4>
                <p className="text-white/40 text-sm">Hipertrofia e definição extrema com o método Esquadrão.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/30 font-bold mb-12">Aliados Estratégicos</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center gap-4">
               <img src="/assets/LogoMaxTitanium.png" alt="Max Titanium" className="h-12 w-auto object-contain" />
               <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Official Athlete</span>
            </div>
            <div className="flex flex-col items-center gap-4">
               <img src="/assets/logoIronberg.png" alt="Ironberg" className="h-12 w-auto object-contain" />
               <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Fortaleza Owner</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="flex items-center gap-1">
                 <Dumbbell className="w-8 h-8 text-gold" />
                 <span className="text-2xl font-black italic text-white">TROPA</span>
               </div>
               <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">Pre-Workout Line</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-surface py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <Logo />
              <p className="mt-8 text-white/50 max-w-sm leading-relaxed">
                Consultoria Fitness de Performance comandada pelo Atleta Pro Tenente Breno. Transformação física baseada em ciência e disciplina militar.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Links Rápidos</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li><a href="#" className="hover:text-gold transition-colors">História</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Planos de Consultoria</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">E-book Tropa</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Social Contato</h4>
              <div className="flex flex-col gap-4">
                <a href="https://instagram.com/tenentebreno" className="flex items-center gap-3 text-sm text-white/40 hover:text-gold transition-colors">
                  <Instagram className="w-5 h-5" /> @tenentebreno
                </a>
                <a href="https://tiktok.com/@tenentebreno" className="flex items-center gap-3 text-sm text-white/40 hover:text-gold transition-colors">
                  <Users className="w-5 h-5" /> @tenentebreno
                </a>
                <a href="#" className="flex items-center gap-3 text-sm text-gold font-bold">
                  <MessageSquare className="w-5 h-5" /> Fale com o Suporte
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">
              © 2024 Tenente Breno - Consultoria Esquadrão Águia. Todos os direitos reservados.
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/20 font-bold">
              <a href="#" className="hover:text-gold">Privacidade</a>
              <a href="#" className="hover:text-gold">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="gold-gradient w-full py-4 rounded-sm text-dark-bg font-extrabold uppercase tracking-widest shadow-2xl"
        >
          Quero me Alistar
        </button>
      </div>
    </div>
  );
}

