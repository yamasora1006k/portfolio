import { contents, Content } from "../shared/Contents";
import { FadeInFromRight } from "../shared/components";

export default function Works({ worktype, setDetailWork }: { worktype: string, setDetailWork: (work: Content | null) => void }) {
    let works;
    if (worktype === "All") {
        works = contents.filter((content) => content.location === "Tech");
    } else {
        works = contents.filter((content) => content.tag.includes(worktype) && content.location === "Tech");
    }


    return (
        works.map((work) => (
            <FadeInFromRight>
                <div style={{ position: 'relative', height: '150px' }} onClick={(e) => { if (e.metaKey || e.ctrlKey) window.open(work.url!, '_blank'); else setDetailWork(work); }}>
                    <div style={{ position: 'relative', paddingLeft: '2rem', paddingBottom: '1rem', border: '1px solid rgba(128,128,128,0.2)', borderRadius: '8px', zIndex: 2, height: '150px' }}>

                        <h4 style={{ marginBottom: '0.5rem', fontSize: '1.6rem' }}>{work.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            {work.description}
                        </p>

                    </div>
                    <div style={{
                        position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', justifyContent: 'right', zIndex: 0, overflow: 'hidden', borderRadius: '8px',
                    }}>
                        <img src={work.img} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: work.img_pos!, borderRadius: '8px', filter: `brightness(${work.img_brt})` }} />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to right, rgba(10,10,10, 1), rgba(10,10,10,0))",
                            }}
                        />
                    </div>
                </div>
            </FadeInFromRight>
        ))
    )
}