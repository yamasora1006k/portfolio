import ActMenu from "./ActMenu";
import Acts from "./Acts";
import { useState } from "react";
import { motion } from "framer-motion";
import Main_head from "../shared/Main_head";
import { useNavigate } from "react-router-dom";
import Detail from "../shared/Details";
import { Content } from "../shared/Contents";

export default function Activity() {
    const navigate = useNavigate();
    const acttype = ["All", "Activity", "Business"];
    const [selected_acttype, setSelected_acttype] = useState(acttype[0]);
    const setActType = (actType: string) => setSelected_acttype(actType);
    const [detailWork, setDetailWork] = useState<Content | null>(null);
    return (
        <>
            <motion.main className="container" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} style={{ flex: 1, paddingTop: '4rem', paddingBottom: '4rem' }}>
                <Main_head id="act" next="開発頁" onArrowClick={() => { navigate("/tech") }} description={<p>ここでは私の活動を紹介します。<br />こちらでは主に活動の内容に焦点を当てます。</p>} />

                <section id="acts" style={{ scrollMarginTop: 'var(--nav-height)' }}>
                    <ActMenu acttype={acttype} setActType={setActType} selected_acttype={selected_acttype} />
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <Acts acttype={selected_acttype} setDetailWork={setDetailWork} />
                    </div>
                </section>
            </motion.main>
            {detailWork && (
                <section className="detail" onClick={() => setDetailWork(null)} style={{ scrollMarginTop: 'var(--nav-height)' }}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Detail work={detailWork} />
                    </div>
                </section>
            )}
        </>
    )
}