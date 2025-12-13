import { contents } from "./Contents";
export default function Works({ worktype }: { worktype: string }) {
    let work;
    if (worktype === "All") {
        work = contents;
    } else {
        work = contents.filter((content) => content.tag.includes(worktype));
    }

    return (
        work.map((work) => (
            <div style={{ position: 'relative', height: '150px' }}>
                <div style={{ position: 'relative', paddingLeft: '2rem', paddingBottom: '1rem', border: '1px solid rgba(128,128,128,0.2)', borderRadius: '8px', zIndex: 2, height: '150px' }}>

                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.6rem' }}>{work.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {work.description}
                    </p>

                </div>
                <div style={{
                    position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', justifyContent: 'right', zIndex: 0, overflow: 'hidden', borderRadius: '8px',
                }}>
                    <img src={work.img} alt={work.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', filter: `brightness(${work.img_brt})` }} />
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
        ))
    )
}