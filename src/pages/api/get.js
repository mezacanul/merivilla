export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'This is a GET response', success: true });
    } else {
        res.status(405).json({ message: 'Method Not Allowed', success: false });
    }
}
  