import fetch from 'node-fetch';

const handleClarifaiImagePost = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = imageUrl;

    const PAT = process.env.PAT;
    const USER_ID = process.env.USER_ID;
    const APP_ID = process.env.APP_ID;

    const response = await fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Key ${PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
          },
          inputs: [
            {
              data: {
                image: {
                  url: IMAGE_URL,
                },
              },
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      res.status(200).json(result);
    } else {
      throw new Error('Error processing image');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { handleClarifaiImagePost };
