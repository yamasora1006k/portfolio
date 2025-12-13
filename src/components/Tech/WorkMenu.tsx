type Props = {
    worktype: string[]
    setWorksType: (worksType: string) => void
    selected_worktype: string
}
export default function WorkMenu({ worktype, setWorksType, selected_worktype }: Props) {

    return (
        <div>
            <nav style={{ fontSize: '1.5rem', marginBottom: '2rem', paddingBottom: '0.5rem', display: 'inline-block' }}>
                {worktype.map((wt: string) => {
                    return (
                        <a href={`#${wt}`} onClick={() => setWorksType(wt)} className={wt === selected_worktype ? "selectWorks" : "unselectWorks"}>{wt}</a>
                    )
                })}
            </nav>
        </div>
    )
}