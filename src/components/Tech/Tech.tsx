import WorkMenu from "./WorkMenu";
import Works from "./Works";
import { useState } from "react";
import { motion } from "framer-motion";
export default function Tech() {
    const worktype = ["All", "Web", "Native", "Others"];
    const [selected_worktype, setWorksType] = useState(worktype[0]);
    return (
        <motion.main initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="container" style={{ flex: 1, paddingTop: '4rem', paddingBottom: '4rem' }}>
            <section id="about" style={{ marginBottom: '6rem', position: 'relative', height: '150px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'var(--bg-color)', zIndex: -1 }}>
                    <img src="" alt="" />
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>
                    Hello, I'm <span style={{ color: 'var(--text-secondary)' }}>a Developer.</span>
                </h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
                    私が開発したものを紹介します。<br />
                    クリックで詳細確認ができます。<br />
                    Cmd+クリックで新しいタブでGitHubが開きます。
                </p>
            </section>

            <section id="works">
                <WorkMenu worktype={worktype} setWorksType={setWorksType} selected_worktype={selected_worktype} />
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <Works worktype={selected_worktype} />
                </div>
            </section>
        </motion.main>
    )
}
