import WorkMenu from "./WorkMenu";
import Works from "./Works";
import { useState } from "react";
import { motion } from "framer-motion";
import { Content } from "../shared/Contents";
import Detail from "../shared/Details";
import Main_head from "../shared/Main_head";
import { useNavigate } from "react-router-dom";

export default function Tech() {
    const navigate = useNavigate();
    const worktype = ["All", "Web", "Native", "Others"];
    const [selected_worktype, setWorksType] = useState(worktype[0]);
    const [detailWork, setDetailWork] = useState<Content | null>(null);

    return (
        <>
            <motion.main initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="container" style={{ flex: 1, paddingTop: '4rem', paddingBottom: '4rem' }}>
                <Main_head id="tech" next="活動頁" onArrowClick={() => { navigate("/act") }} description={<p>私が開発したものを紹介します。<br />クリックで詳細確認ができます。<br />Cmd+クリックで新しいタブでGitHubが開きます。</p>} />
                <section id="works" style={{ scrollMarginTop: 'var(--nav-height)' }}>
                    <WorkMenu worktype={worktype} setWorksType={setWorksType} selected_worktype={selected_worktype} />
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <Works worktype={selected_worktype} setDetailWork={setDetailWork} />
                    </div>
                </section>
            </motion.main>
            {
                detailWork && (
                    <section className="detail" onClick={() => setDetailWork(null)} style={{ scrollMarginTop: 'var(--nav-height)' }}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <Detail work={detailWork} />
                        </div>
                    </section>
                )
            }
        </>
    )
}
