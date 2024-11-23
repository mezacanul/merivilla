import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({ multiples: true }); // Create a parser instance

    try {
      // Parse the request
      const [fields, files] = await form.parse(req);
      res.status(200).json({ fields, files });
    } catch (err) {
      res.status(500).json({ error: 'Error parsing form data', details: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}


// export default function handler(req, res) {
//     if (req.method === 'POST') {
//         // Parse JSON body sent in the request
//         const data = req.body; 
      
//         res.status(200).json({ message: 'POST received successfully', data, success: true });
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed', success: false });
//     }
//   }
  