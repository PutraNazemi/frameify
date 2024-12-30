let clickCount = 0;

export default function handler(req, res) {
    if (req.method === "POST") {
        clickCount++;
        res.status(200).json({ clickCount });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
