const cloudinary = require('cloudinary').v2;

module.exports = async (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const BASE_FOLDER = 'mycloud';

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  try {
    const folders = await cloudinary.api.sub_folders(BASE_FOLDER);

    const tokens = folders.folders
      .map(f => f.name)
      .filter(name => name.toLowerCase().includes(q))
      .map(name => ({ id: name }));

    res.status(200).json({ tokens });
  } catch (err) {
    console.error('Token search error:', err);
    res.status(500).json({ error: 'Token search failed' });
  }
};
