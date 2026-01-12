import type { JSX } from "react";
import { motion } from "framer-motion";
import RotateThings from "./RotateThings";
interface Props {
    id: string;
    onArrowClick?: () => void;
    description: JSX.Element;
    next: string;
}
export default function Main_head({ id, next, onArrowClick, description }: Props) {
    const imgId = id === "act" ? "Works" : "Dev";
    return (
        <motion.main initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <section id="about" style={{ marginBottom: '6rem', position: 'relative', height: '150px', scrollMarginTop: 'var(--nav-height)' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div>
                        <img src={`${import.meta.env.BASE_URL}img/logo/MIYANO_${imgId}_WH.svg`} alt="" style={{ height: 'calc(var(--nav-height) /3)', objectFit: 'contain' }} />
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
                            {description}
                        </p>
                    </div>
                    <div
                        ref={RotateThings({ id })}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 0,
                            opacity: 0.6,
                            pointerEvents: "none",
                        }}
                    />

                    {onArrowClick && <div className="anim-hover-16" style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'end', cursor: 'pointer' }} onClick={onArrowClick}>
                        <p style={{ fontSize: '1.5rem' }} >{next}<span>→</span></p>
                    </div>}
                </div>
            </section>
        </motion.main>
    )

}