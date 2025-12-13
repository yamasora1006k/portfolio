import ActMenu from "./ActMenu";
import Acts from "./Acts";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Activity() {
    const acttype = ["All", "Activity", "Business"];
    const [selected_acttype, setSelected_acttype] = useState(acttype[0]);
    const setActType = (actType: string) => setSelected_acttype(actType);
    return (
        <motion.main className="container" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} style={{ flex: 1, paddingTop: '4rem', paddingBottom: '4rem' }}>
            <section id="about" style={{ marginBottom: '6rem', position: 'relative', height: '150px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'var(--bg-color)', zIndex: -1 }}>
                    <img src="" alt="" />
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>
                    Hello, I'm <span style={{ color: 'var(--text-secondary)' }}>a Activist.</span>
                </h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
                    ここでは私の活動を紹介します。<br />Developerとは異なり、こちらでは主に活動の内容に焦点を当てます。
                </p>
            </section>

            <section id="works">
                <ActMenu acttype={acttype} setActType={setActType} selected_acttype={selected_acttype} />
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <Acts acttype={selected_acttype} />
                </div>
            </section>
        </motion.main>
    )
}