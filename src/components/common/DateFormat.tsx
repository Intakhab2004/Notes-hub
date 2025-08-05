



export default function DateFormat({rawDate}: {rawDate: string | Date}){
    const date = typeof rawDate === "string" ? new Date(rawDate) : rawDate;

    const formatedDate =  date.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })

    return (
        <p className="text-[0.8rem] font-semibold text-black/70 dark:text-white/70">{formatedDate}</p>
    )
}