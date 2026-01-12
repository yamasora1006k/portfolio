import RotateThings from "../shared/RotateThings";
export default function Theme_ico({
    id,
    title,
    description,
    onClick,
}: {
    id: string;
    title: string;
    description: string;
    onClick?: () => void;
}) {

    return (
        <div onClick={onClick}
            style={{
                position: "relative",
                width: "400px",
                height: "250px", // Adjusted height for a card look
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)", // Glass effect base
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div
                ref={RotateThings({ id })}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                    opacity: 0.6, // Determine visibility of background object
                    pointerEvents: "none", // Allow clicks to pass through if needed
                }}
            />

            {/* Foreground Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                    pointerEvents: "none", // Prevent blocking interactions if we add buttons later
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}
            >
                <h3
                    style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        marginBottom: "0.5rem",
                        letterSpacing: "0.05em",
                        color: "#fff",
                    }}
                >
                    {title}
                </h3>
                <p
                    style={{
                        fontSize: "1rem",
                        opacity: 0.9,
                        color: "#eee",
                        maxWidth: "80%",
                        margin: "0 auto",
                    }}
                >
                    {description}
                </p>
            </div>
        </div>
    );
}
