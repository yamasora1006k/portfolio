import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FadeInFromLeft } from "../shared/components";
import Theme_ico from "./Theme_ico";

export default function Aboutme() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <section style={{
                height: 'calc(100vh)',
                marginTop: 'calc(var(--nav-height) * -1)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
                color: '#fff',
                overflow: 'hidden',
                zIndex: 12,
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{ textAlign: 'center', zIndex: 1 }}
                >
                    <img src={`${import.meta.env.BASE_URL}img/logo/MIYANO_Studio_WH.svg`} alt="" style={{ width: 'min(90vw, 1000px)', objectFit: 'contain', objectPosition: 'center' }} />

                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', opacity: 0.7 }}>SCROLL</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            width: '1px',
                            height: '40px',
                            background: 'white',
                            opacity: 0.5
                        }}
                    />
                </motion.div>
            </section>

            <main className="container" style={{ flex: 1, paddingBottom: '4rem', paddingTop: '4rem' }}>

                <section id="aboutme" style={{ scrollMarginTop: 'var(--nav-height)', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                    <motion.div className="overview">
                        <FadeInFromLeft>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid currentColor', paddingBottom: '0.5rem', display: 'inline-block' }}>Overview</h2>
                        </FadeInFromLeft>
                        <FadeInFromLeft>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '2px solid rgba(255, 255, 255, 0.1)',
                                    flexShrink: 0,
                                    backgroundColor: '#333'
                                }}>
                                    <img
                                        src={`${import.meta.env.BASE_URL}img/myface.png`}
                                        alt="My Face"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center', transform: 'scale(2) translateX(24%) translateY(-8%)' }}
                                    />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>宮野柊太</h3>
                                    <p style={{ opacity: 0.8, margin: 0 }}>神山まるごと高専一期生</p>
                                </div>
                            </div>
                        </FadeInFromLeft>
                        <FadeInFromLeft>
                            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', opacity: 0.9 }}>
                                初めまして。私は徳島県にある田舎の高専に住まう学生です。<br />
                                経営経験と開発経験を持つ、経営と技術を組み合わせた人材を目指しています。<br />
                                本ポートフォリオサイトは、技術と活動に分けて個別に私の取り組みを紹介します。
                            </p>
                        </FadeInFromLeft>
                    </motion.div>

                    <div className="themes">
                        <FadeInFromLeft>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid currentColor', paddingBottom: '0.5rem', display: 'inline-block' }}>Main Themes</h2>
                        </FadeInFromLeft>
                        <FadeInFromLeft>
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'space-between' }}>
                                <Theme_ico id="tech" title="Tech" description="技術" onClick={() => { navigate('/tech') }} />
                                <Theme_ico id="act" title="Activity" description="活動" onClick={() => { navigate('/act') }} />
                            </div>
                        </FadeInFromLeft>
                    </div>

                </section>
            </main>
        </>
    )
}