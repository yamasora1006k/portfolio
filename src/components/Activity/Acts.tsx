import { contents } from "./Contents";
export default function Acts({ acttype }: { acttype: string }) {
    let act;
    if (acttype === "All") {
        act = contents;
    } else {
        act = contents.filter((content) => content.tag.includes(acttype));
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 240px))', gap: '16px' }}>
            {act.map((act) => (
                <div style={{ border: '1px solid rgba(128,128,128,0.2)', borderRadius: '8px', width: '240px', height: '300px', }}>
                    <div style={{ width: '100%', height: '60%', display: 'flex', justifyContent: 'start', alignItems: 'center', paddingRight: '16px', paddingLeft: '16px', paddingTop: '16px' }}>
                        <img src={act.img || ""} alt={act.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', filter: `brightness(${act.img_brt})` }} />
                    </div>
                    <div style={{ width: '100%', height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', paddingLeft: '16px', paddingRight: '16px', }}>
                        <h4 style={{ marginBottom: '4px', marginTop: '8px', fontSize: '1.6rem' }}>{act.title}</h4>
                        <p style={{ fontSize: '0.9rem', marginTop: 0, color: 'var(--text-secondary)' }}>
                            {act.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )

}